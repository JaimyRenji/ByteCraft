import Joi from 'joi';
import mongoose from 'mongoose';
const expenseSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    amount : {
        type: Number, 
        required: true
    },
    category : {
        type: String, 
        required: true
    },
    date : {
        type: Date, 
        required: true
    },
    notes : {
        type: String 
    },

});
export const Expense = mongoose.model('Expense' , expenseSchema);
function validateExpense(expense){
    const schema =Joi.object({
        userId : Joi.string().required(),
        amount : Joi.number().required(),
        category : Joi.string().required(),
        date: Joi.string().required(),
        notes : Joi.string()

    });
    return schema.validate(expense)
}
export const validate = validateExpense;
