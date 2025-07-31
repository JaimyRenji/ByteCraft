import mongoose from 'mongoose';
import Budget from '../models/Budget.js';
import Expense from '../models/Expense.js';

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

export const setBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, monthlyLimit } = req.body;

    if (!category || monthlyLimit == null) {
      return res.status(400).json({ message: 'category and monthlyLimit required' });
    }

    let budget = await Budget.findOne({ userId, category });

    if (budget) {
      budget.monthlyLimit = monthlyLimit;
      await budget.save();
    } else {
      budget = await Budget.create({ userId, category, monthlyLimit });
    }

    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Failed to set budget', error: err.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const userId = req.user._id;
    const budgets = await Budget.find({ userId });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch budgets', error: err.message });
  }
};

export const getBudgetSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const { year, month } = req.query; // month 1-12

    if (!year || !month) {
      return res.status(400).json({ message: 'year and month query params required' });
    }

    const start = new Date(`${year}-${String(month).padStart(2, '0')}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const budgets = await Budget.find({ userId });

    const spends = await Expense.aggregate([
      {
        $match: {
          userId: toObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: '$category',
          spent: { $sum: '$amount' },
        },
      },
    ]);

    const spendMap = {};
    spends.forEach(s => {
      spendMap[s._id] = s.spent;
    });

    const summary = budgets.map(b => {
      const spent = spendMap[b.category] || 0;
      const limit = b.monthlyLimit;
      const percent = limit ? (spent / limit) * 100 : 0;
      let status = 'normal';
      if (percent >= 100) status = 'exceeded';
      else if (percent >= 80) status = 'near';

      return {
        category: b.category,
        monthlyLimit: limit,
        spent,
        remaining: Math.max(limit - spent, 0),
        percent: Math.round(percent * 100) / 100,
        status,
        alert: status === 'near' ? 'warning' : status === 'exceeded' ? 'danger' : 'ok',
      };
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get summary', error: err.message });
  }
};
