let register = document.getElementById("register");
let voting = document.getElementById("voting");

register.addEventListener("click", () => {
  window.location.href = "http://localhost:5000/register";
});

voting.addEventListener("click", () => {
  window.location.href = "http://localhost:5000/adminVoting";
});
