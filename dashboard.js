const BASE_URL = "https://bakestock-backend.onrender.com";

async function loadDashboard() {
    try {
        console.log("Connecting to API...");
        const res = await fetch(`${BASE_URL}/products`);
        
        if (!res.ok) throw new Error("Backend response was not OK");
        
        const products = await res.json();
        console.log("Data received:", products);

        // 1. Calculate Stats
        const total = products.length;
        
        // Ensure stock is treated as a number for the comparison
        const lowStock = products.filter(p => Number(p.stock) < 10).length; 
        
        // Filter items added today
        const todayStr = new Date().toDateString();
        const addedToday = products.filter(p => {
            if (!p.createdAt) return false;
            return new Date(p.createdAt).toDateString() === todayStr;
        }).length;

        // 2. Update the Cards (Ensure these IDs exist in your HTML)
        document.getElementById("total").innerText = total;
        document.getElementById("low").innerText = lowStock;
        document.getElementById("today").innerText = addedToday;

        // 3. Update the Recent Table (Show last 5 items added)
        const tableBody = document.getElementById("recentTableBody");
        
        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No products found.</td></tr>';
            return;
        }

        tableBody.innerHTML = ""; // Clear the "Syncing..." message

        // Clone the array, reverse it (newest first), and take the top 5
        const recentProducts = [...products].reverse().slice(0, 5);

        recentProducts.forEach(p => {
            const row = `
                <tr>
                    <td>${p.name}</td>
                    <td>${p.category}</td>
                    <td><strong>${p.stock}</strong></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        console.error("Dashboard Load Error:", err);
        // If there's an error, let the user know on the UI
        document.getElementById("status").innerText = "Offline ❌";
        document.getElementById("status").style.color = "red";
    }
}

// Call the function when the page is fully loaded
window.onload = loadDashboard;