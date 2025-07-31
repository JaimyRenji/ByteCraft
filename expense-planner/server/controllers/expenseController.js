import {Expense , validate} from '../models/Expense.js';
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


export const getExpenses = async (req, res) => {
    try {
      const { userId, category } = req.body;
      const expenses = await Expense.find({ userId, category}).sort({ date: -1 });
      let expe = 0;
      console.log(expenses[0].amount);
      for(let i = 0;i<expenses.length;i++)
      {
          expe += expenses[i].amount;
      }
      res.status(200).json(expe);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expenses', error: error.message });
}
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