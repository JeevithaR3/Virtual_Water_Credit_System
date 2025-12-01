const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./Virtual_Water_Credit_System/userModel");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Check if email already exists
        if (await User.findOne({ email })) {
            return res.status(400).send("User already exists");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send("Error signing up");
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid credentials");
        }

        res.status(200).send("Login successful");
    } catch (error) {
        res.status(500).send("Error logging in");
    }
});

module.exports = router;
