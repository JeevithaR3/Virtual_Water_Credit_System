const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let transportProviders = [];
let bookings = []; // Store confirmed bookings

// ✅ Register Transport Provider
app.post("/api/transport/register", (req, res) => {
    const { name, dob, aadhaar, phone, license } = req.body;

    if (transportProviders.some(p => p.aadhaar === aadhaar)) {
        return res.status(400).json({ message: "Aadhaar already registered!" });
    }

    transportProviders.push({ name, dob, aadhaar, phone, license });
    res.json({ message: "Registration successful!" });
});

// ✅ Get Transport Providers List
app.get("/api/transport/providers", (req, res) => {
    res.json(transportProviders);
});

// ✅ Book a Transport Provider
app.post("/api/transport/book", (req, res) => {
    const { aadhaar, buyerEmail } = req.body;
    const provider = transportProviders.find(p => p.aadhaar === aadhaar);

    if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
    }

    // Add booking with "Pending Confirmation" status
    bookings.push({
        providerAadhaar: aadhaar,
        providerName: provider.name,
        buyerEmail,
        status: "Pending Confirmation",
    });

    res.json({ message: "Booking request sent to provider!" });
});

// ✅ Get Bookings for a Transport Provider (For Dashboard)
app.get("/api/transport/status/:aadhaar", (req, res) => {
    const aadhaar = req.params.aadhaar;
    console.log("Fetching bookings for Aadhaar:", aadhaar);
    console.log("Current bookings:", bookings); // Debugging log

    const providerBookings = bookings.filter(b => b.providerAadhaar === aadhaar);

    res.json(providerBookings);
});


// ✅ Fix: Update Booking Status (Accept/Reject)
app.post("/api/transport/update-booking", (req, res) => {
    const { aadhaar, buyerEmail, status } = req.body;

    console.log("Received update request:", aadhaar, buyerEmail, status); // Debugging log

    let booking = bookings.find(b => b.providerAadhaar === aadhaar && b.buyerEmail === buyerEmail);

    if (!booking) {
        console.error("Booking not found:", aadhaar, buyerEmail);
        return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    console.log("Updated booking:", booking); // Debugging log

    res.json({ message: `Booking ${status.toLowerCase()} successfully!` });
});



// ✅ Start the Server
app.listen(5000, () => console.log("Server running on port 5000"));
