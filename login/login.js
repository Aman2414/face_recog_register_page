let submitBtn = document.getElementById("loginBtn");
let nameInput = document.getElementById("username");
let pwdInput = document.getElementById("password");

pwdInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    submit();
  }
});

nameInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    pwdInput.focus();
  }
});

submitBtn.addEventListener("click", () => {
  submit();
});

function submit() {
  let uName = document.getElementById("username").value;
  let pwd = document.getElementById("password").value;

  if (uName.length == 0 && pwd.length == 0) {
    alert("Username or Password is Empty");
  } else {
    fetch("http://localhost:5000/verifyLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: uName,
        password: pwd,
      }),
    })
      .then((response) => {
        let code = response.status;
        if (code === 404) {
          alert("Error in fetching username and password details");
        } else if (code === 406) {
          alert("You have already Voted");
        } else if (code === 200) {
          // alert("Login Successfull Redirecting to Face Verify");
          window.location.href = "http://localhost:5000/faceVerify";
        } else if (code === 403) {
          alert("Invalid Username or Password");
        }
      })
      .catch((err) => {
        alert("Error " + err);
      });
  }
}
