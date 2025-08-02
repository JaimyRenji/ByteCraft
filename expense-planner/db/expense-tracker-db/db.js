const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin123@cluster0.fdx46rg.mongodb.net/expense_tracker_db?retryWrites=true&w=majority')
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
