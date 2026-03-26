// Check if user is logged in
window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
        alert("Please login first!");
        window.location.href = "login.html";
    }
};

// Logout function
const logoutBtn = document.querySelector("li:last-child");

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "login.html";
});


// Example: Dynamic data update (optional)
document.addEventListener("DOMContentLoaded", function () {
    // You can change values dynamically
    document.querySelectorAll(".card p")[0].innerText = 120;
    document.querySelectorAll(".card p")[1].innerText = 15;
    document.querySelectorAll(".card p")[2].innerText = 20;
    document.querySelectorAll(".card p")[3].innerText = 18;
});