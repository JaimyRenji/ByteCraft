import {Budget , validate} from '../models/Budget.js';
import {Expense } from '../models/Expense.js';
export const addBudget = async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }  
    const budget = new budget({
        userId : req.body.userId,
        category : req.body.category,
        monthlyLimit : req.body.monthlyLimit   
    });
    const result = await budget.save();
    console.log(result);

    res.send(budget)
};


export const getbudgets = async (req, res) => {
    const { userId, category } = req.body;
    const budgets = await Budget
    .find({userId});
    console.log(budgets);
    const expenses = await Expense.find({ userId, category}).sort({ date: -1 });
    let expe = 0;
    for(let i = 0;i<expenses.length;i++)
    {
        expe += expenses[i].amount;
    }
    console.log(budgets[0].monthlyLimit);
    let minorwarning = 0.2 * budgets[0].monthlyLimit;
    let balance = budgets[0].monthlyLimit-expe;
    if(balance <= 0)
    {
        res.status(200).json({
            success: true,
            alert: `You've exceeded your budget for ${category}!`,
        });
    }    
    else if(balance <  minorwarning)
    {
        res.status(200).json({
            success: true,
            alert: `You've exceeded your 80% of budget for ${category}!`,
          });
    }
    else
    {
        res.send(balance);
    }
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

