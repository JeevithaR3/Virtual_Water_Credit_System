const API_URL = "http://localhost:5000/api";
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("listings")) loadListings();
    if (document.getElementById("cart-list")) updateCartUI();
});

// ✅ Fetch Listings for Buy Water Page
async function loadListings() {
    try {
        const response = await fetch(`${API_URL}/waterlistings`);
        if (!response.ok) throw new Error("Failed to fetch listings");
        
        const listings = await response.json();
        displayListings(listings);
    } catch (error) {
        console.error("❌ Error fetching listings:", error);
    }
}

// ✅ Submit Listing (Sell Water Page)
async function submitListing(event) {
    event.preventDefault(); // Prevent default form submission
    
    const sellerName = document.getElementById("sellerName").value;
    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);
    const location = document.getElementById("location").value;
    const contact = document.getElementById("contact").value;
    
    const listingData = { sellerName, quantity, price, location, contact };

    try {
        const response = await fetch(`${API_URL}/waterlistings`, { // Fixed API URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listingData)
        });
        
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to save listing");
        
        alert("✅ Listing submitted successfully!");
        document.getElementById("listing-form").reset(); // Reset form after submission
        loadListings(); // Refresh listings
    } catch (error) {
        console.error("❌ Error submitting listing:", error);
        alert("❌ Failed to submit listing.");
    }
}

// ✅ Display Listings on Buy Water Page
function displayListings(listings) {
    const listingsContainer = document.getElementById("listings");
    listingsContainer.innerHTML = "";

    listings.forEach(listing => {
        const { sellerName, quantity, price, location, contact } = listing;
        
        const div = document.createElement("div");
        div.className = "listing";
        div.innerHTML = `
            <strong>${sellerName}</strong> - ${quantity}L @ ₹${price} <br> 
            Location: ${location} <br>
            <button class="buy-btn" onclick='buyWater(${JSON.stringify(listing)})'>Buy</button>
            <button class="enquiry-btn" onclick='enquireWater(${JSON.stringify({ sellerName, contact, location })})'>Enquiry</button>
            <button class="cart-btn" onclick='addToCart(${JSON.stringify(listing)})'>Add to Cart</button>
        `;
        listingsContainer.appendChild(div);
    });
}

// ✅ Apply Filters
function applyFilter() {
    const filter = document.getElementById("filter").value;
    fetch(`${API_URL}/waterlistings`) // Fixed API URL
        .then(response => response.json())
        .then(data => {
            let filteredListings = [...data];
            if (filter === "price") filteredListings.sort((a, b) => a.price - b.price);
            displayListings(filteredListings);
        })
        .catch(error => console.error("❌ Error applying filter:", error));
}

// ✅ Buy Water - Redirect to Order Confirmation
function buyWater(listing) {
    const order = {
        ...listing,
        paymentMethod: "Cash on Delivery",
        orderId: generateOrderId(),
    };
    localStorage.setItem("order", JSON.stringify(order)); // Save order details
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart after buying
    window.location.href = "order-confirmation.html"; // Redirect to confirmation
}

// ✅ Generate a Unique Order ID
function generateOrderId() {
    return "ORD" + Math.floor(Math.random() * 1000000);
}

// ✅ Enquiry Redirect
function enquireWater({ sellerName, contact, location }) {
    if (!sellerName || !location) {
        alert("Seller details are missing! Please try again.");
        return;
    }
    window.location.href = `enquiry.html?seller=${encodeURIComponent(sellerName)}&contact=${encodeURIComponent(contact || 'N/A')}&location=${encodeURIComponent(location)}`;
}

// ✅ Add Water to Cart
function addToCart(listing) {
    const exists = cart.some(item => 
        item.sellerName === listing.sellerName && 
        item.quantity === listing.quantity && 
        item.price === listing.price && 
        item.location === listing.location
    );

    if (!exists) {
        cart.push(listing);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${listing.quantity}L from ${listing.sellerName} added to cart!`);
    } else {
        alert("This item is already in your cart.");
    }

    updateCartUI();
}

// ✅ Display Cart Items in the Cart Section
function updateCartUI() {
    const cartList = document.getElementById("cart-list");
    if (!cartList) return;

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<li>Your cart is empty.</li>";
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.sellerName} - ${item.quantity}L @ ₹${item.price}
            <button class="remove-cart-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(li);
    });
}

// ✅ Remove an Item from the Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// ✅ Proceed to Checkout
function checkoutCart() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before proceeding.");
        return;
    }

    const order = {
        items: cart,
        paymentMethod: "Cash on Delivery",
        orderId: generateOrderId(),
    };

    localStorage.setItem("order", JSON.stringify(order)); // Save order details
    localStorage.setItem("cart", JSON.stringify([])); // Clear cart after checkout
    window.location.href = "order-confirmation.html"; // Redirect to confirmation page
}
