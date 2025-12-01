async function loadProviders() {
    try {
        const response = await fetch("http://localhost:5000/api/transport/providers");
        const providers = await response.json();

        const providersList = document.getElementById("providersList");
        providersList.innerHTML = "";

        if (providers.length === 0) {
            providersList.innerHTML = "<p>No transport providers available.</p>";
            return;
        }

        providers.forEach(provider => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>Name:</strong> ${provider.name}</p>
                <p><strong>Phone:</strong> ${provider.phone}</p>
                <p><strong>Aadhaar:</strong> ${provider.aadhaar}</p>
                <button onclick="confirmBooking('${provider.aadhaar}')">✅ Confirm Booking</button>
                <hr>
            `;
            providersList.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading providers:", error);
    }
}

async function confirmBooking(aadhaar) {
    const buyerEmail = prompt("Enter Buyer Email:");
    if (!buyerEmail) return alert("Booking canceled.");

    try {
        const response = await fetch("http://localhost:5000/api/transport/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aadhaar, buyerEmail }),
        });

        const result = await response.json();
        alert(result.message);
        loadProviders();
    } catch (error) {
        console.error("Error confirming booking:", error);
    }
}

window.onload = loadProviders;
