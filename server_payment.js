const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Configure Razorpay
const razorpay = new Razorpay({
    key_id: "rzp_test_GIJIsabAbLDsvo",  // Your Razorpay Key ID
    key_secret: "0cK9xjdmmNyaa5zjFdh1tyDr"  // Your Razorpay Secret Key
});

// ✅ Create Order API
app.post("/api/payment/order", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: "INR",
            payment_capture: 1 // Auto capture payment
        });

        res.json(order);
    } catch (error) {
        console.error("❌ Order Creation Error:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});

// ✅ Verify Payment API
app.post("/api/payment/verify", async (req, res) => {
    try {
        const { razorpay_payment_id } = req.body;

        if (!razorpay_payment_id) {
            return res.status(400).json({ error: "Payment verification failed" });
        }

        res.json({ message: "Payment verified successfully!" });
    } catch (error) {
        console.error("❌ Payment Verification Error:", error);
        res.status(500).json({ error: "Payment verification failed." });
    }
});

// ✅ Start Server on Port 5500
app.listen(5500, () => console.log("🚀 Razorpay Server running on port 5500"));
