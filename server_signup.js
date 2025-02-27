const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./userModel'); // Import user model

const app = express();
const PORT = 5500;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, phone, password, confirmPassword } = req.body;

        if (!username || !email || !phone || !password || !confirmPassword) {
            return res.status(400).send('All fields are required.');
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        if (phone.length !== 10) {
            return res.status(400).send('Phone number must be 10 digits.');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already registered.');
        }

        const newUser = new User({ username, email, phone, password });
        await newUser.save();

        return res.status(200).send('Signup successful! You can now log in.');
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login Route (✅ FIXED)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required.');
        }

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).send('Invalid email or password!');
        }

        return res.status(200).send('Login successful!');
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
