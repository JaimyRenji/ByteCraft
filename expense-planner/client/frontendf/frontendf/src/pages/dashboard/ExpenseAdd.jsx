import React, { useState } from 'react';
import './ExpenseAdd.css';
import { useNavigate } from 'react-router-dom';

const AddExpenseForm = () => {
  const [form, setForm] = useState({
    userId: '',
    amount: '',
    category: '',
    date: '',
    notes: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      ...form,
      _id: Date.now().toString(), // Fake ID
    };

    // ✅ Save to localStorage
    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    existingExpenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(existingExpenses));

    // ✅ Clear form
    setForm({
      userId: '',
      amount: '',
      category: '',
      date: '',
      notes: ''
    });

    // ✅ Navigate to history page
    navigate('/history');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Expense</h2>
      <input
        name="userId"
        placeholder="User ID"
        value={form.userId}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
