import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  userId: 
  { type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  amount: {
    type: Number, 
    required: true 
  },
  category: 
  { type: String,
    required: true
  },
  date: {
    type: Date,
    required: true 
  },
  notes:{ 
    type: String 
  }
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
