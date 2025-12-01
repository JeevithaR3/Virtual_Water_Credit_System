document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const providerData = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        aadhaar: document.getElementById("aadhaar").value,
        license: document.getElementById("license").value,
        phone: document.getElementById("phone").value
    };

    try {
        const response = await fetch("http://localhost:5000/api/transport/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(providerData)
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert("Registration failed!");
    }
});