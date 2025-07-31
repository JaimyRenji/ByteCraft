import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  category:
  { type: String,
     required: true
  },
  monthlyLimit:
  { type: Number, 
    required: true 
  }
});

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
