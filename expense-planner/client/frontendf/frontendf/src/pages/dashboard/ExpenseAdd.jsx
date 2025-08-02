import React, { useState, useEffect } from 'react';
import './ExpenseAdd.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddExpenseForm = () => {
  const [form, setForm] = useState({
    amount: 0,
    category: '',
    date: '',
    notes: ''
  });

  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const res = await axios.get('http://localhost:5000/api/auth/me', config);
        setUserId(res.data.user.userId); 
      } catch (err) {
        console.error('Login required or token invalid:', err.message);
        alert('Please login first.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

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
        userId,
        date: new Date(form.date)
      };

      await axios.post('http://localhost:5000/api/expenses', payload);

      setForm({
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




