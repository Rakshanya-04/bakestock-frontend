let products = [];

// Load products into dropdown
async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/products");
        products = await res.json();

        let select = document.getElementById("productSelect");
        select.innerHTML = "";

        products.forEach(product => {
            let option = document.createElement("option");
            option.value = product._id;   // 🔥 important
            option.text = `${product.name} (Stock: ${product.stock})`;
            select.appendChild(option);
        });
    } catch (err) {
        console.error(err);
    }
}

// Update stock
async function updateStock() {
    let id = document.getElementById("productSelect").value;
    let quantity = document.getElementById("quantity").value;
    let message = document.getElementById("message");

    if (quantity === "" || quantity < 0) {
        message.style.color = "red";
        message.innerText = "Enter valid quantity!";
        return;
    }

    try {
        await fetch(`http://localhost:5000/update-stock/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ stock: parseInt(quantity) })
        });

        message.style.color = "green";
        message.innerText = "Stock updated successfully!";

        loadProducts(); // refresh dropdown
    } catch (err) {
        console.error(err);
        message.style.color = "red";
        message.innerText = "Error updating stock!";
    }
}

window.onload = loadProducts;