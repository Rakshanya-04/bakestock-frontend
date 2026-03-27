const BASE_URL = "https://your-app-name.onrender.com";

async function addProduct() {
  let name = document.getElementById("name").value;
  let category = document.getElementById("category").value;
  let stock = document.getElementById("stock").value;

  await fetch(`${BASE_URL}/add-product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category, stock })
  });

  alert("Product Added!");
}