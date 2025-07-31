import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

User.find().then(users => {
  users.forEach(u => console.log(`Username: ${u.username} | ID: ${u._id}`));
  mongoose.connection.close();
});
