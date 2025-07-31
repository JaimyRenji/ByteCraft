import {Budget , validate} from '../models/Budget.js';
import {Expense } from '../models/Expense.js';
export const addBudget = async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }  
    const budget = new Budget({
        userId : req.body.userId,
        category : req.body.category,
        monthlyLimit : req.body.monthlyLimit   
    });
    const result = await budget.save();
    console.log(result);

    res.send(budget)
};


export const getbudgets = async (req, res) => {
    const budgets = await Budget
    .find()
    console.log(budgets)
    res.send(budgets);
}

export const updateBudget = async (req, res) => {
    const {error} = validate(req.body)

    if(error){
        return res.status(400).send(error.details[0].message);
    }  
    const budget =  await Budget.findByIdAndUpdate(req.params.id,{
        $set : {
            userId : req.body.userId,
            category : req.body.category,
            monthlyLimit : req.body.monthlyLimit  
        }
    },{new : true});
    if (!budget) 
        return res.status(404).send('The budget with the given ID was not found');
    
    res.send(budget);
};

export const deletebudget = async (req, res) => {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) return res.status(404).send('The budget with the given ID was not found');

    res.send(budget);
};

