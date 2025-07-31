import express from 'express';
import {
  setBudget,
  getBudgets,
  getBudgetSummary
} from '../controllers/budgetController.js';

const router = express.Router();

router.post('/set', setBudget);

router.get('/', getBudgets);

router.get('/summary', getBudgetSummary);

export default router;
