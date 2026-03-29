const BASE_URL = "https://bakestock-backend.onrender.com";

const productSelect = document.getElementById("productSelect");
const newStockInput = document.getElementById("newStock");
const updateBtn = document.getElementById("updateBtn");

// 1. Load products into dropdown when page opens
window.onload = loadProductDropdown;

async function loadProductDropdown() {
    try {
        const res = await fetch(`${BASE_URL}/products`);
        const products = await res.json();

        productSelect.innerHTML = '<option value="">-- Choose a Product --</option>';

        products.forEach(p => {
            const option = document.createElement("option");
            option.value = p._id; // Store the MongoDB ID as the value
            option.textContent = `${p.name} (Current: ${p.stock})`;
            productSelect.appendChild(option);
        });
    } catch (err) {
        console.error("Error loading products:", err);
        productSelect.innerHTML = '<option value="">Error loading products</option>';
    }
}

// 2. Handle the Update click
updateBtn.addEventListener("click", async () => {
    const productId = productSelect.value;
    const stockValue = newStockInput.value;

    if (!productId || !stockValue) {
        alert("Please select a product and enter a new stock value.");
        return;
    }

    updateBtn.disabled = true;
    updateBtn.innerText = "Updating...";

    try {
        const res = await fetch(`${BASE_URL}/update-stock/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stock: parseInt(stockValue) })
        });

        if (res.ok) {
            alert("✅ Stock updated successfully!");
            newStockInput.value = "";
            loadProductDropdown(); // Refresh the list to show new numbers
        } else {
            alert("Update failed. Try again.");
        }
    } catch (err) {
        console.error("Update error:", err);
        alert("Server error.");
    } finally {
        updateBtn.disabled = false;
        updateBtn.innerText = "Update Inventory";
    }
});