import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Expense.css';
import { useNavigate } from 'react-router-dom';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const userRes = await axios.get('http://localhost:5000/api/auth/me', config);
        const userId = userRes.data.user.userId;
        setUserId(userId);

        const expenseRes = await axios.get(`http://localhost:5000/api/expenses/user/${userId}`, config);

        setExpenses(expenseRes.data || {});
      } catch (err) {
        console.error("Login required or fetch failed:", err.message);
      }
    };

    fetchUserAndExpenses();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense({ ...expense });
    setEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, amount, category, date, notes } = selectedExpense;

      const updatedExpense = {
        userId,
        amount,
        category,
        date,
        notes
      };

      const res = await axios.put(`http://localhost:5000/api/expenses/${_id}`, updatedExpense);

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === _id ? res.data : exp))
      );
      setEditModal(false);
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const handleChange = (e) => {
    setSelectedExpense({
      ...selectedExpense,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="list-container">
      <h2>Expenses History</h2>
      {expenses.map((expense) => (
        <div className="expense-item" key={expense._id}>
          <p>₹{expense.amount} | {expense.category} | {new Date(expense.date).toLocaleDateString()}</p>
          <button onClick={() => handleEdit(expense)}>Edit</button>
          <button onClick={() => handleDelete(expense._id)} className="delete-btn">Delete</button>
        </div>
      ))}

      {editModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Expense</h3>
            <form onSubmit={handleUpdate}>
              <input name="amount" type="number" value={selectedExpense.amount} onChange={handleChange} required />
              <input name="category" value={selectedExpense.category} onChange={handleChange} required />
              <input name="date" type="date" value={selectedExpense.date?.slice(0, 10)} onChange={handleChange} required />
              <input name="notes" value={selectedExpense.notes} onChange={handleChange} />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;


