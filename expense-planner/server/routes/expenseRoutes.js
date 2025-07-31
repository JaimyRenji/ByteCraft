import express from 'express';
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} from '../controllers/expenseController.js';

const router = express.Router();

router.get('/', getExpenses);
router.post('/add', addExpense);
router.put('/:id', updateExpense);  
router.delete('/:id', deleteExpense);  

export default router;
