document.getElementById("addBtn").addEventListener("click", addProduct);

const BASE_URL = "https://bakestock-backend.onrender.com"; // change this

async function addProduct() {
  console.log("Button clicked"); // 🔥 check this

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("quantity").value;

  if (!name || !category || !stock) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        category,
        stock
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Product Added");
      location.reload();
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}