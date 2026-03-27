const BASE_URL = "https://your-app-name.onrender.com";

async function loadProducts() {
  let res = await fetch(`${BASE_URL}/products`);
  let data = await res.json();

  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p._id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
      </tr>
    `;
  });
}

window.onload = loadProducts;