const BASE_URL = "https://bakestock-backend.onrender.com";

// Load products as soon as the page opens
window.onload = fetchAllProducts;

// 📦 FUNCTION: FETCH ALL PRODUCTS
async function fetchAllProducts() {
    const tableBody = document.getElementById("productTableBody");
    
    try {
        const res = await fetch(`${BASE_URL}/products`);
        const products = await res.json();

        tableBody.innerHTML = ""; // Clear loading message

        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No products found. Click "Add Product" to start.</td></tr>';
            return;
        }

        products.forEach(p => {
            const row = `
                <tr>
                    <td>${p.name}</td>
                    <td>${p.category}</td>
                    <td><strong>${p.stock}</strong></td>
                    <td>
                        <button class="delete-btn" onclick="deleteProduct('${p._id}')">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error("Error:", err);
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:red;">Failed to connect to server.</td></tr>';
    }
}

// ❌ FUNCTION: DELETE PRODUCT
async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const res = await fetch(`${BASE_URL}/delete-product/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (res.ok) {
            alert("🗑️ Product deleted successfully");
            fetchAllProducts(); // Refresh the list without reloading the whole page
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error("Delete Error:", err);
        alert("Server error while deleting.");
    }
}