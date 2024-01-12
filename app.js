require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DATABASE_URL, { family: 4 });

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express and Mongoose project!');
});

// Create a new user
app.get('/create-user', async (req, res) => {
  try {
    const newUser = new User({
      username: 'moein',
      email: 'moein.alkozay@example.com',
      password: '12345678',
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by username
app.get('/user/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
