async function checkBookings() {
    const aadhaar = document.getElementById("aadhaar").value.trim();
    if (!aadhaar) {
        alert("Please enter Aadhaar number.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/transport/status/${aadhaar}`);
        const bookings = await response.json();

        const bookingsList = document.getElementById("bookingStatus");
        bookingsList.innerHTML = "";

        if (!Array.isArray(bookings) || bookings.length === 0) {
            bookingsList.innerHTML = "<p>No confirmed bookings.</p>";
            return;
        }

        let tableHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Buyer Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        bookings.forEach(booking => {
            tableHTML += `
                <tr>
                    <td>${booking.buyerEmail}</td>
                    <td id="status-${booking.buyerEmail}">${booking.status}</td>
                    <td>
                        <button onclick="updateBooking('${aadhaar}', '${booking.buyerEmail}', 'Accepted')">Accept</button>
                        <button onclick="updateBooking('${aadhaar}', '${booking.buyerEmail}', 'Rejected')">Reject</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += "</tbody></table>";
        bookingsList.innerHTML = tableHTML;
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

// ✅ Function to Accept/Reject Booking
async function updateBooking(aadhaar, buyerEmail, status) {
    try {
        console.log("Sending update request:", aadhaar, buyerEmail, status); // Debugging log

        const response = await fetch("http://localhost:5000/api/transport/update-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aadhaar, buyerEmail, status }),
        });

        const result = await response.json();
        console.log("Server response:", result); // Debugging log
        alert(result.message); // Show success message

        // Update status in UI
        document.getElementById(`status-${buyerEmail}`).textContent = status;
    } catch (error) {
        console.error("Error updating booking:", error);
        alert("Booking confirmed!");
    }
}



window.onload = checkBookings;
