const BASE_URL = "https://your-app-name.onrender.com";

async function loadDashboard() {
  let res = await fetch(`${BASE_URL}/dashboard-data`);
  let data = await res.json();

  document.getElementById("total").innerText = data.totalProducts;
  document.getElementById("low").innerText = data.lowStockItems;
  document.getElementById("today").innerText = data.itemsAddedToday;
}

window.onload = loadDashboard;