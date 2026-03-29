// --- CONFIGURATION ---
const BASE_URL = "https://bakestock-backend.onrender.com";
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("productTableBody");

// --- EVENT LISTENERS ---

// 1. Run fetch when page loads
window.onload = fetchProducts;

// 2. Add product on button click
addBtn.addEventListener("click", addProduct);


// --- FUNCTIONS ---

// 📦 FETCH AND DISPLAY PRODUCTS
async function fetchProducts() {
  try {
    console.log("Fetching products...");
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();

    // Clear the "Loading..." text
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No products in inventory.</td></tr>';
      return;
    }

    // Loop through the MongoDB data and create table rows
    data.forEach(product => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td><strong>${product.stock}</strong></td>
      `;
      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error("Fetch error:", err);
    tableBody.innerHTML = '<tr><td colspan="3" style="color:red; text-align:center;">Error loading data from server.</td></tr>';
  }
}

// ➕ ADD NEW PRODUCT
async function addProduct() {
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value.trim();
  const stock = document.getElementById("quantity").value.trim();

  // Basic Validation
  if (!name || !category || !stock) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // Disable button to prevent double-clicks
  addBtn.disabled = true;
  addBtn.innerText = "Adding...";

  try {
    const res = await fetch(`${BASE_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        category,
        stock: parseInt(stock)
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ " + data.message);
      
      // Refresh the page to show the new item in the list
      location.reload(); 
    } else {
      alert("❌ Error: " + data.message);
      addBtn.disabled = false;
      addBtn.innerText = "Add Product";
    }

  } catch (err) {
    console.error("Add Error:", err);
    alert("❌ Server is not responding. Check your Render logs.");
    addBtn.disabled = false;
    addBtn.innerText = "Add Product";
  }
}