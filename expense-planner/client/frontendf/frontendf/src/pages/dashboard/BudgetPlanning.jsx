/*import React, { useEffect, useState } from "react";
import "./BudgetPlanning.css";

const BudgetPlanning = () => {
  const [budgets, setBudgets] = useState({
    Food: 0,
    Transport: 0,
    Housing: 0,
    Entertainment: 0,
    Shopping: 0,
    Utilities: 0,
    Healthcare: 0,
    Other: 0,
  });

  const [month, setMonth] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id && month) {
      const saved = localStorage.getItem(`budgets_${user.id}_${month}`);
      if (saved) setBudgets(JSON.parse(saved));
    }
  }, [month]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgets((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id && month) {
      localStorage.setItem(`budgets_${user.id}_${month}`, JSON.stringify(budgets));
      alert(`Budget for ${month} saved!`);
    } else {
      alert("Select a month and login first.");
    }
  };

  return (
    <div className="budget-planning-container">
      <h2>Set Your Monthly Budget</h2>

      <label>Select Month: </label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">-- Select --</option>
        {["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
      </select>

      {month && (
        <>
          <form onSubmit={handleSubmit} className="budget-form">
            {Object.keys(budgets).map((category) => (
              <div key={category} className="budget-input">
                <label htmlFor={category}>{category}</label>
                <input
                  type="number"
                  id={category}
                  name={category}
                  value={budgets[category]}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </div>
            ))}
            <button type="submit" className="save-button">Save Budget</button>
          </form>

          <div className="current-budgets">
            <h3>Budget for {month}</h3>
            <ul>
              {Object.entries(budgets).map(([category, amount]) => (
                <li key={category}>
                  {category}: ₹{amount}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetPlanning;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BudgetPlanning.css";

const BudgetPlanning = () => {
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [userBudgets, setUserBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch the user ID and budgets on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", config);
        const id = res.data.user.userId;
        setUserId(id);

        await loadBudgets(id);
      } catch (error) {
        console.error("Failed to fetch user or budgets:", error);
        alert("Please login to access this feature.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Load user's budget data
  const loadBudgets = async (id) => {
    try {
      const budgetRes = await axios.get(`http://localhost:5000/api/budget/${id}`, config);
      setUserBudgets(budgetRes.data || []);
    } catch (error) {
      console.error("Error loading budgets:", error);
    }
  };

  // Add a new category if not duplicate
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.trim()) return alert("Enter a category name");
    if (!newAmount || isNaN(newAmount)) return alert("Enter a valid amount");

    const exists = userBudgets.some(
      (item) => item.category.toLowerCase() === newCategory.trim().toLowerCase()
    );
    if (exists) return alert("This category already exists.");

    try {
      await axios.post(
        "http://localhost:5000/api/budget/",
        {
          userId,
          category: newCategory.trim(),
          monthlyLimit: parseFloat(newAmount),
        },
        config
      );

      await loadBudgets(userId);
      setNewCategory("");
      setNewAmount("");
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add budget category.");
    }
  };

  const totalBudget = userBudgets.reduce((sum, item) => sum + (item.monthlyLimit || 0), 0);

  return (
    <div className="budget-planning-container">
      <h2>Add a Budget Category</h2>

      <form onSubmit={handleAddCategory} className="add-category-form">
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>

      <div className="current-budgets">
        <h3>Your Current Budget</h3>
        {loading ? (
          <p>Loading...</p>
        ) : userBudgets.length === 0 ? (
          <p>No budget categories added yet.</p>
        ) : (
          <>
            <ul>
              {userBudgets.map((item) => (
                <li key={item._id}>
                  {console.log(item)}
                  {item.category}: ₹{item.monthlyLimit}
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: "1rem" }}>Total Budget: ₹{totalBudget}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default BudgetPlanning;















