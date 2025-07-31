import express from 'express';
const router = express.Router();
import {Expense , validate} from '../models/Expense.js';
import { addExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/expenseController.js';

router.get('/',getExpenses);

router.post('/' ,addExpense);

router.put('/:id' , updateExpense);

router.delete('/:id',deleteExpense);

export default router;