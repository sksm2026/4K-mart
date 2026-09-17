const items = [
    { id: 1, name: "Chicken 1 kg", category: "Meat", price: 12000, unit: "1 kg" },
    { id: 2, name: "Chicken wings", category: "Meat", price: 8500, unit: "500 g" },
    { id: 3, name: "Chicken breast", category: "Meat", price: 9500, unit: "500 g" },
    { id: 4, name: "Chicken thigh", category: "Meat", price: 9000, unit: "500 g" },
    { id: 5, name: "Pork 1 kg", category: "Meat", price: 18000, unit: "1 kg" },
    { id: 6, name: "Pork belly", category: "Meat", price: 19500, unit: "1 kg" },
    { id: 7, name: "Beef 1 kg", category: "Meat", price: 24000, unit: "1 kg" },
    { id: 8, name: "Beef steak", category: "Meat", price: 15000, unit: "500 g" },
    { id: 9, name: "Rohu / ငါးမြစ်ချင်း", category: "Fish", price: 14000, unit: "1 kg" },
    { id: 10, name: "Katla / ငါးသိုင်း", category: "Fish", price: 15500, unit: "1 kg" },
    { id: 11, name: "Featherback / ငါးဖယ်", category: "Fish", price: 16000, unit: "500 g" },
    { id: 12, name: "Pangush 1 kg", category: "Fish", price: 11000, unit: "1 kg" },
    { id: 13, name: "Pangush cut pieces", category: "Fish", price: 12500, unit: "1 kg" },
    { id: 14, name: "Ngathalaut / ငါးသလောက်", category: "Fish", price: 28000, unit: "1 kg" },
    { id: 15, name: "Ngathalaut steak", category: "Fish", price: 16000, unit: "500 g" },
    { id: 16, name: "Prawn 500 g", category: "Fish", price: 18500, unit: "500 g" },
    { id: 17, name: "Cola 500 ml", category: "Drinks", price: 1500, unit: "500 ml" },
    { id: 18, name: "Drinking Water 1L", category: "Drinks", price: 800, unit: "1 Liter" }
];

let cart = [];

function displayProducts(productsToRender) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = productsToRender.map(item => `
        <div class="card">
            <div>
                <div class="card-timer">⏱️ 10 MINS</div>
                <div class="card-title">${item.name}</div>
                <div class="card-weight">${item.unit}</div>
            </div>
            <div class="card-footer">
                <div class="price">${item.price.toLocaleString()} MMK</div>
                <button class="add-btn" onclick="addToCart(${item.id})">ADD</button>
            </div>
        </div>
    `).join("");
}

function filterCategory(category, btn) {
    document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");

    if (category === "all") {
        displayProducts(items);
    } else {
        displayProducts(items.filter(i => i.category === category));
    }
}

function filterProducts() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    displayProducts(items.filter(i => i.name.toLowerCase().includes(q)));
}

function addToCart(id) {
    const found = items.find(i => i.id === id);
    cart.push(found);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cartCount").innerText = cart.length;
    const body = document.getElementById("cartItems");

    if (cart.length === 0) {
        body.innerHTML = "<p style='color:#888;'>Your cart is empty.</p>";
        document.getElementById("cartTotal").innerText = "0";
        return;
    }

    body.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:13px;">
            <span>${item.name}</span>
            <strong>${item.price.toLocaleString()} MMK</strong>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cartTotal").innerText = total.toLocaleString();
}

function toggleCart() {
    const modal = document.getElementById("cartModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("Order placed successfully! (Blinkit Prototype)");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Initial display
displayProducts(items);
