import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Expense.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const userId = "688b0bfbcab5132"; // Replace this dynamically in real projects

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses", {
          params: { userId }
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err.message);
      }
    };
    fetchExpenses();
  }, []);

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  // Edit handler
  const handleEdit = (expense) => {
    setSelectedExpense({ ...expense }); // clone to avoid direct state mutation
    setEditModal(true);
  };

  // Submit updated data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id , userId, amount, category, date, notes } = selectedExpense;
      const res = await axios.put(`http://localhost:5000/api/expenses/${_id}`, {
        userId,
        amount,
        category,
        date,
        notes
      });

      setExpenses((prev) =>
        prev.map((exp) => (exp._id === _id ? res.data : exp))
      );
      setEditModal(false);
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  // Input change handler
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
          <p>₹{expense.amount} | {expense.category} | {expense.date}</p>
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
              <input name="date" type="date" value={selectedExpense.date} onChange={handleChange} required />
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

