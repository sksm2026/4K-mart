script.js
JavaScript
const products = [
    { id: 1, name: "Fresh Chicken", category: "Meat", price: 12000, unit: "1 kg" },
    { id: 2, name: "Pork Belly", category: "Meat", price: 18000, unit: "1 kg" },
    { id: 3, name: "Rohu Fish", category: "Fish", price: 15000, unit: "1 kg" },
    { id: 4, name: "Fresh Tomatoes", category: "Vegetables", price: 3000, unit: "1 kg" },
    { id: 5, name: "Onions", category: "Vegetables", price: 4500, unit: "1 kg" },
    { id: 6, name: "Fresh Bananas", category: "Fruits", price: 2500, unit: "1 comb" },
    { id: 7, name: "Cooking Oil", category: "Grocery", price: 9000, unit: "1 liter" },
    { id: 8, name: "Premium Rice", category: "Grocery", price: 85000, unit: "1 bag" }
];

let cart = [];

function displayProducts(items) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p style="color:#777; font-size:12px;">Category: ${p.category}</p>
            <div class="price">${p.price.toLocaleString()} MMK / ${p.unit}</div>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join("");
}

function filterCategory(category) {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function filterProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cartCount").innerText = cart.length;
    const cartItems = document.getElementById("cartItems");
    
    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty.";
        document.getElementById("cartTotal").innerText = "0";
        return;
    }

    cartItems.innerHTML = cart.map((item, idx) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <span>${item.name}</span>
            <span>${item.price.toLocaleString()} MMK</span>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cartTotal").innerText = total.toLocaleString();
}

function toggleCart() {
    const modal = document.getElementById("cartModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for testing the 4K Mart prototype! Real checkout requires backend integration.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Initial render
displayProducts(products);
