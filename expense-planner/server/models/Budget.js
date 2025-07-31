import Joi from 'joi';
import mongoose from 'mongoose';
const budgetSchema = new mongoose.Schema({
  userId:     
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true 
    },
  category: { 
    type: String, 
    required: true 
  },
  monthlyLimit: { type: Number, required: true }
});

function validateBudget(budget){
  const schema =Joi.object({
    userId : Joi.string().required(),
    category : Joi.string().required(),
    monthlyLimit : Joi.number().required(),
  });
  return schema.validate(budget);
}
export const Budget = mongoose.model('Budget' , budgetSchema);
export const validate = validateBudget;