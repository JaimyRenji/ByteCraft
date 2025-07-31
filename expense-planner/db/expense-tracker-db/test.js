// test.js
const mongoose = require('mongoose');
require('./db'); // connect to MongoDB

const User = require('./models/User');
const Expense = require('./models/Expense');
const Budget = require('./models/Budget');

async function runTest() {
  try {
    // Step 1: Create a test user
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "123456" // NOTE: hash this in production
    });

    console.log("✅ User created:", user);

    // Step 2: Add an expense
    const expense = await Expense.create({
      userId: user._id,
      amount: 250,
      category: "Food",
      date: new Date(),
      notes: "Lunch at Subway"
    });

    console.log("✅ Expense added:", expense);

    // Step 3: Add a budget
    const budget = await Budget.create({
      userId: user._id,
      category: "Food",
      monthlyLimit: 1000
    });

    console.log("✅ Budget added:", budget);

    // Done: Close connection
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
}

runTest();
