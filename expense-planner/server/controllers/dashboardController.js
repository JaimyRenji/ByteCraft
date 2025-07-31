import { Expense } from "../models/Expense.js";
import { Budget } from "../models/Budget.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch expenses and budgets for the logged-in user
    const expenses = await Expense.find({ userId });
    const budgets = await Budget.find({ userId });

    // Aggregate spend by category
    const spendByCategory = {};
    const dailySpendMap = {};

    expenses.forEach(({ category, amount, date }) => {
      spendByCategory[category] = (spendByCategory[category] || 0) + amount;

      const dateStr = date.toISOString().split("T")[0];
      dailySpendMap[dateStr] = (dailySpendMap[dateStr] || 0) + amount;
    });

    // Format daily spend as array
    const dailySpend = Object.entries(dailySpendMap).map(([date, amount]) => ({
      date,
      amount,
    }));

    // Prepare category budgets with spent amounts
    const categoryBudgets = {};
    budgets.forEach(({ category, monthlyLimit }) => {
      const spent = spendByCategory[category] || 0;
      categoryBudgets[category] = { budget: monthlyLimit, spent };
    });

    // For demo, income is zero, or you can fetch from user model if you track it
    const income = 0;

    res.json({ income, spendByCategory, dailySpend, categoryBudgets });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
