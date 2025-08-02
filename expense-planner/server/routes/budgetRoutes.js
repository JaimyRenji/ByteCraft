import express from 'express';
const router = express.Router();
import { Budget , validate} from '../models/Budget.js';
import { addBudget, deletebudget, getbudgets, updateBudget } from '../controllers/budgetController.js';
router.get('/:userId',getbudgets);


router.post('/' ,addBudget);

router.put('/:id' , updateBudget);


router.delete('/:id',deletebudget);

export default router;

