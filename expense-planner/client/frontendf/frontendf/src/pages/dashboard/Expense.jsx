import React, { useEffect, useState } from 'react';
import './Expense.css';

const mockData = [
  {
    _id: '1',
    amount: 120,
    category: 'Food',
    date: '2025-07-31',
    notes: 'Lunch'
  },
  {
    _id: '2',
    amount: 300,
    category: 'Transport',
    date: '2025-07-30',
    notes: 'Cab fare'
  }
];

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    // Simulate fetch
    setExpenses(mockData);
  }, []);

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(exp => exp._id !== id));
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setExpenses(prev =>
      prev.map(exp =>
        exp._id === selectedExpense._id ? selectedExpense : exp
      )
    );
    setEditModal(false);
  };

  const handleChange = (e) => {
    setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
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
