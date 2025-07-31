import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import expenseRoutes from './routes/expenseRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from "./routes/dashboardRoutes.js";

console.log("JWT_SECRET:", process.env.JWT_SECRET);

dotenv.config();
console.log('URI:', process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api/expenses', expenseRoutes);
app.use('/api/budget', budgetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});