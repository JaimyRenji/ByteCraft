import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  try {
    const { userId, amount, category, date, notes } = req.body;

    const newExpense = new Expense({ userId, amount, category, date, notes });
    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { amount, category, date, notes } = req.body;
    const { id } = req.params;

    const updated = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, notes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense', details: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense', details: err.message });
  }
};
