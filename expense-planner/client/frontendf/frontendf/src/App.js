import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing/Landing';
import { Login } from './pages/login/Login';
import BudgetPlanning from './pages/dashboard/BudgetPlanning';
import Dashboard from './pages/dashboard/Dashboard';
import ExpenseList from './pages/dashboard/Expense';
import AddExpenseForm from './pages/dashboard/ExpenseAdd';
function App() {
  // ✅ Define dummy data here
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
          <Route path="/auth" element={<Login />} />
          <Route path="/budget" element={<BudgetPlanning />} />
          <Route path="/dash" element={<Dashboard data={dummyData} />} />
          <Route path="/history" element={<ExpenseList />} />
          <Route path="/expense" element={<AddExpenseForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
