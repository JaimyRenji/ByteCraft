import express from 'express';
const router = express.Router();
import {Expense , validate} from '../models/Expense.js';
import { addExpense, getExpenses, deleteExpense, updateExpense, getExpenseStats , getDailyStats} from '../controllers/expenseController.js';

router.get('/',getExpenses);

router.get('/stats/:userId', getExpenseStats);

router.get('/daily-stats/:userId', getDailyStats);

router.post('/' ,addExpense);

router.put('/:id' , updateExpense);

router.delete('/:id',deleteExpense);

export default router;