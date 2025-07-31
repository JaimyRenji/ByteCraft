import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './landing/Landing';
import { Login } from './login/Login';
import { Register } from './login/Register';
import BudgetPlanning from './pages/dashboard/BudgetPlanning';
import Dashboard from './pages/dashboard/Dashboard';
import ExpenseList from './pages/dashboard/Expense';
import AddExpenseForm from './pages/dashboard/ExpenseAdd';
function App() {
  const dummyData = {
    spendByCategory: {
      Food: 1000,
      Transport: 500,
      Entertainment: 300,
    },
    dailySpend: [
      { date: '2025-07-01', amount: 300 },
      { date: '2025-07-02', amount: 450 },
      { date: '2025-07-03', amount: 250 },
    ],
    categoryBudgets: {
      Food: { spent: 1000, budget: 1200 },
      Transport: { spent: 500, budget: 600 },
      Entertainment: { spent: 300, budget: 300 },
    },
    income: 5000,
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/budget" element={<BudgetPlanning />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<ExpenseList />} />
          <Route path="/expense" element={<AddExpenseForm />} /> 
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
