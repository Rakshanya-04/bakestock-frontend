const BASE_URL = "https://your-app-name.onrender.com";

let products = [];

async function loadProducts() {
  let res = await fetch(`${BASE_URL}/products`);
  products = await res.json();

  let select = document.getElementById("productSelect");
  select.innerHTML = "";

  products.forEach(p => {
    let option = document.createElement("option");
    option.value = p._id;
    option.text = `${p.name} (Stock: ${p.stock})`;
    select.appendChild(option);
  });
}

async function updateStock() {
  let id = document.getElementById("productSelect").value;
  let qty = document.getElementById("quantity").value;

  await fetch(`${BASE_URL}/update-stock/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock: qty })
  });

  alert("Stock Updated!");
  loadProducts();
}

window.onload = loadProducts;