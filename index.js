const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files (Fix for Issue 4)
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/signupDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Database connection error:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
}));

app.set('view engine', 'ejs'); // Fix for Issue 3

app.post('/signup', async (req, res) => {
    try {
        const { username, email, phone, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        const newUser = new User({ username, email, phone, password });
        await newUser.save();

        res.send('Signup successful!');
    } catch (error) {
        console.error('Error saving user:', error);

        if (error.code === 11000) {
            res.status(400).send('Email already registered.');
        } else {
            res.status(500).send('An error occurred during signup.');
        }
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid password.');
        }

        res.send('Login successful!');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred during login.');
    }
});


// Fix for Issue 3: Render login.ejs instead of sending index.html
app.get('/login', (req, res) => {
    res.render('login');
});

const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
