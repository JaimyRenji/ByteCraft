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
import React, { useEffect, useState } from "react";
import "./BudgetPlanning.css";

const BudgetPlanning = () => {
  const [budgets, setBudgets] = useState([]);
  const [month, setMonth] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id && month) {
      const saved = localStorage.getItem(`budgets_${user.id}_${month}`);
      if (saved) setBudgets(JSON.parse(saved));
    }
  }, [month]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return alert("Enter a category name");
    if (isNaN(newAmount) || newAmount === "") return alert("Enter a valid amount");

    // Prevent duplicates
    const exists = budgets.find((item) => item.category.toLowerCase() === newCategory.toLowerCase());
    if (exists) return alert("Category already exists");

    const newEntry = {
      category: newCategory.trim(),
      amount: parseFloat(newAmount),
    };

    setBudgets([...budgets, newEntry]);
    setNewCategory("");
    setNewAmount("");
  };

  const handleAmountChange = (index, value) => {
    const updated = [...budgets];
    updated[index].amount = parseFloat(value);
    setBudgets(updated);
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
        {[
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
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

          <form onSubmit={handleSubmit} className="budget-form">
            {budgets.map((item, index) => (
              <div key={index} className="budget-input">
                <label>{item.category}</label>
                <input
                  type="number"
                  value={item.amount}
                  min="0"
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
              </div>
            ))}
            <button type="submit" className="save-button">Save Budget</button>
          </form>

          <div className="current-budgets">
            <h3>Budget for {month}</h3>
            <ul>
              {budgets.map((item, index) => (
                <li key={index}>
                  {item.category}: ₹{item.amount}
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
