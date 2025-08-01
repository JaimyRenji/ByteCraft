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

  const loadBudgets = async (id) => {
    try {
      const budgetRes = await axios.get(`http://localhost:5000/api/budget/${id}`, config);
      setUserBudgets(budgetRes.data || []);
    } catch (error) {
      console.error("Error loading budgets:", error);
    }
  };

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















