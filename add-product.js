const BASE_URL = "https://your-backend-url.onrender.com"; 
// ⚠️ CHANGE THIS TO YOUR RENDER URL

async function addProduct() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("quantity").value;

  if (!name || !category || !stock) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        category: category,
        stock: stock
      })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("✅ Product Added Successfully");
      location.reload();
    } else {
      alert(data.message || "Error adding product");
    }

  } catch (error) {
    console.error("FRONTEND ERROR:", error);
    alert("Server not reachable");
  }
}