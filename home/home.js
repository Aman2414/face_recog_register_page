let votersLogin = document.getElementById("votersLogin");
let adminLogin = document.getElementById("adminLogin");

votersLogin.addEventListener("click", () => {
  window.location.href = "http://localhost:5000/login";
});

adminLogin.addEventListener("click", () => {
  window.location.href = "http://localhost:5000/admin";
});
