import React, { useState } from 'react';
import './ExpenseAdd.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddExpenseForm = () => {
  const [form, setForm] = useState({
    userId: '',
    amount: 0,
    category: '',
    date: '',
    notes: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        date: new Date(form.date)
      };

      console.log(payload);

      await axios.post('http://localhost:5000/api/expenses', payload);

      setForm({
        userId: '',
        amount: 0,
        category: '',
        date: '',
        notes: ''
      });

      navigate('/history');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
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
        min="0"
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




