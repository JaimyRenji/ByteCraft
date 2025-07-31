import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import expenseRoutes from './routes/expenseRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import authRoutes from './routes/authRoutes.js'; // optional

dotenv.config();
console.log('URI:', process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Required to parse JSON body

app.use('/api/expenses', expenseRoutes);
app.use('/api/budget', budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});