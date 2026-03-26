let products = [];
let id = 1;

// Add product
function addProduct() {
    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let quantity = document.getElementById("quantity").value;

    if (name === "" || category === "" || quantity === "") {
        alert("Fill all fields");
        return;
    }

    let product = {
        id: id++,
        name: name,
        category: category,
        quantity: quantity
    };

    products.push(product);
    displayProducts();

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
}

// Display products
function displayProducts() {
    let list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach((p, index) => {
        list.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
                <td>
                    <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Delete product
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}