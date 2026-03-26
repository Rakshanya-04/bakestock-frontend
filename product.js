async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/products");
        const products = await response.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        products.forEach(product => {
            let row = `
                <tr>
                    <td>${product._id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.stock}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

window.onload = loadProducts;