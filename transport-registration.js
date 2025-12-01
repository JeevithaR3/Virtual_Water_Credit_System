document.getElementById("transportForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const providerData = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        aadhaar: document.getElementById("aadhaar").value,
        phone: document.getElementById("phone").value,
        license: document.getElementById("license").value
    };

    try {
        const response = await fetch("http://localhost:5000/api/transport/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(providerData),
        });

        const result = await response.json();
        alert(result.message);
        if (response.ok) window.location.href = "view-transport.html";
    } catch (error) {
        alert("Registration failed!");
        console.error("Error:", error);
    }
});
