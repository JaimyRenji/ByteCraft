import {Expense , validate} from '../models/Expense.js';
import mongoose from 'mongoose';
export const addExpense = async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }  
    const expense = new Expense({
        userId : req.body.userId,
        amount : req.body.amount,
        category : req.body.category,
        date : req.body.date,
        notes : req.body.notes
    });
    const result = await expense.save();
    console.log(result);

    res.send(expense)
};

export const getDailyStats = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const dailySpending = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // assuming userId is a string
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            total: { $sum: "$amount" }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json({ dailySpending });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

export const getExpenseStats = async (req, res) => {
  const userId = req.params.userId;
  console.log("User ID param:", userId);
  console.log("Type of userId:", typeof userId);
  try {
    const spendByCategory = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);
    console.log(spendByCategory);

    const formatted = {};
    spendByCategory.forEach(item => {
      formatted[item._id] = item.total;
    });

    res.json({ spendByCategory: formatted });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const getExpenses = async (req, res) => {
    const expenses = await Expense
    .find()
    console.log(expenses)
    res.send(expenses);
}

export const updateExpense = async (req, res) => {
    const {error} = validate(req.body)

    if(error){
        return res.status(400).send(error.details[0].message);
    }  
    const expense =  await Expense.findByIdAndUpdate(req.params.id,{
        $set : {
            amount : req.body.amount,
            category : req.body.category,
            date : req.body.date,
            notes : req.body.notes
        }
    },{new : true});
    if (!expense) 
        return res.status(404).send('The expense with the given ID was not found');
    
    res.send(expense);
};

export const deleteExpense = async (req, res) => {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).send('The expense with the given ID was not found');

    res.send(expense);
};