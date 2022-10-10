let loginBtn = document.getElementById("loginBtn");
let user = document.getElementById("username");
let pass = document.getElementById("password");

user.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    pass.focus();
  }
});
pass.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    loginBtn.click();
  }
});

loginBtn.addEventListener("click", () => {
  let uname = document.getElementById("username").value;
  let pwd = document.getElementById("password").value;
  if (uname.length === 0 || pwd.length === 0) {
    alert("Username or Password is Empty!");
  } else {
    fetch("http://localhost:5000/verifyAdmin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: uname,
        password: pwd,
      }),
    })
      .then((response) => {
        let code = response.status;

        if (code === 200) {
          window.location.href = "http://localhost:5000/adminPage";
        } else if (code === 500) {
          alert("Server Error");
        } else if (code === 404) {
          alert("Invalid Username or Password");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
});
