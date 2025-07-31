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
  const [budgets, setBudgets] = useState([]);
  const [month, setMonth] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const userId = "688b0bfbcab5132c46abfaf2"; // Example static user ID

  // Fetch existing budgets on component mount
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/budget", {
        });
        setBudgets(data);
      } catch (err) {
        console.error("Error fetching budgets:", err);
        alert("Failed to load budgets.");
      }
    };

    fetchBudgets();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!month) return alert("Please select a month");
    if (!newCategory.trim()) return alert("Enter a category name");
    if (isNaN(newAmount) || newAmount === "") return alert("Enter a valid amount");

    const exists = budgets.find(
      (item) => item.category.toLowerCase() === newCategory.toLowerCase()
    );
    if (exists) return alert("Category already exists");

    try {
      const { data } = await axios.post("http://localhost:5000/api/budget/", {
        userId,
        category: newCategory.trim(),
        monthlyLimit: parseFloat(newAmount),
      });

      setBudgets([...budgets, data]);
      setNewCategory("");
      setNewAmount("");
    } catch (err) {
      console.error("Error adding budget:", err);
      alert("Failed to add category");
    }
  };

  const handleAmountChange = (index, value) => {
    const updated = [...budgets];
    updated[index].monthlyLimit = parseFloat(value);
    setBudgets(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Promise.all(
        budgets.map((budget) =>
          axios.put(`http://localhost:5000/api/budgets/${budget._id}`, {
            userId,
            category: budget.category,
            monthlyLimit: budget.monthlyLimit,
            month,
          })
        )
      );
      alert("Budgets saved successfully!");
    } catch (err) {
      console.error("Error saving budgets:", err);
      alert("Failed to save budgets.");
    }
  };

  return (
    <div className="budget-planning-container">
      <h2>Set Your Monthly Budget</h2>

      <label>Select Month: </label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">-- Select --</option>
        {[
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {month && (
        <>
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
              value={newAmount}
              min="0"
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <button type="submit">Add Category</button>
          </form>

          {budgets.length > 0 && (
            <form onSubmit={handleSubmit} className="budget-form">
              {budgets.map((item, index) => (
                <div key={item._id || index} className="budget-input">
                  <label>{item.category}</label>
                  <input
                    type="number"
                    value={item.monthlyLimit}
                    min="0"
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
                </div>
              ))}
              <button type="submit" className="save-button">Save Budget</button>
            </form>
          )}

          <div className="current-budgets">
            <h3>Budget for {month}</h3>
            <ul>
              {budgets.map((item, index) => (
                <li key={item._id || index}>
                  {item.category}: ₹{item.monthlyLimit}
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





