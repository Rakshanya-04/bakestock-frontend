const BASE_URL = "https://your-app-name.onrender.com"; // 🔥 replace

async function addProduct() {
    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let stock = document.getElementById("stock").value;
    let msg = document.getElementById("msg");

    if (!name || !category || !stock) {
        msg.innerText = "All fields required!";
        msg.style.color = "red";
        return;
    }

    try {
        let res = await fetch(`${BASE_URL}/add-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, category, stock })
        });

        let data = await res.json();

        if (res.ok) {
            msg.innerText = "✅ Product Added Successfully!";
            msg.style.color = "green";

            // clear fields
            document.getElementById("name").value = "";
            document.getElementById("category").value = "";
            document.getElementById("stock").value = "";

        } else {
            msg.innerText = data.message;
            msg.style.color = "red";
        }

    } catch (err) {
        console.error(err);
        msg.innerText = "❌ Server error";
    }
}