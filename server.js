const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Virtual_Water_Credit_System", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Water Listing Schema (Collection: waterlistings)
const ListingSchema = new mongoose.Schema({
    sellerName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    contact: { type: String, required: true, match: /^[0-9]{10}$/ }
});
const Listing = mongoose.model("waterlistings", ListingSchema);

// ✅ Define Transport Provider Schema (Collection: transportproviders)
const TransportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    aadhaar: { type: String, required: true },
    license: { type: String, required: true }
});
const TransportProvider = mongoose.model("transportproviders", TransportSchema);

// ✅ POST: Save Water Listing
app.post("/api/waterlistings", async (req, res) => {
    try {
        const { sellerName, quantity, price, location, contact } = req.body;
        if (!sellerName || quantity === undefined || price === undefined || !location || !contact) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const newListing = new Listing({ sellerName, quantity, price, location, contact });
        await newListing.save();
        res.status(201).json({ message: "Listing saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving listing:", error);
        res.status(500).json({ error: "Failed to save listing.", details: error.message });
    }
});

// ✅ GET: Fetch Water Listings
app.get("/api/waterlistings", async (req, res) => {
    try {
        const listings = await Listing.find().sort({ price: 1 });
        res.json(listings);
    } catch (error) {
        console.error("❌ Error fetching listings:", error);
        res.status(500).json({ error: "Failed to fetch listings.", details: error.message });
    }
});

// ✅ POST: Register Transport Provider
app.post("/api/transport/register", async (req, res) => {
    try {
        const { name, dob, aadhaar, license } = req.body;
        if (!name || !dob || !aadhaar || !license) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const newProvider = new TransportProvider({ name, dob, aadhaar, license });
        await newProvider.save();
        res.status(201).json({ message: "Transport provider registered successfully!" });
    } catch (error) {
        console.error("❌ Error registering transport provider:", error);
        res.status(500).json({ error: "Failed to register transport provider.", details: error.message });
    }
});

// ✅ GET: View Transport Providers
app.get("/api/transport/providers", async (req, res) => {
    try {
        const providers = await TransportProvider.find();
        res.json(providers);
    } catch (error) {
        console.error("❌ Error fetching transport providers:", error);
        res.status(500).json({ error: "Failed to fetch transport providers.", details: error.message });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
