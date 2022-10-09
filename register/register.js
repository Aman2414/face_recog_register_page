let registerBtn = document.getElementById("registerBtn");
let selectedImage = document.getElementById("choosenFile");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmpwd = document.getElementById("confirm-password");
let imageData = document.getElementById("imgData");
let file;

username.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    password.focus();
  }
});

password.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    confirmpwd.focus();
  }
});

confirmpwd.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    selectedImage.click();
  }
});

selectedImage.addEventListener("input", async () => {
  if (validateImg()) {
    var reader = new FileReader();
    console.log(selectedImage.files[0]);
    reader.readAsDataURL(selectedImage.files[0]);

    reader.onload = function () {
      imageData.value = reader.result;
    };

    reader.onerror = function (err) {
      alert("Unable to read file.Plz select again");
    };
  }
});

registerBtn.addEventListener("click", () => {
  register();
});

function register() {
  if (validate()) {
    let uName = username.value;
    let pwd = password.value;
    let iData = imageData.value;

    fetch("http://localhost:5000/registerUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: uName,
        password: pwd,
        imgData: iData,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          alert("Registered Successfully");
        }
      })
      .catch((err) => {
        alert("Error " + err);
      });
  }
}

function validateImg() {
  if (selectedImage.files.length == 0) {
    alert("File is Not Selected");
    return false;
  } else {
    file = selectedImage.files[0];
    if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg"
    ) {
      alert("File is Not Image");
      return false;
    }
  }
  return true;
}

function validate() {
  if (password.value !== confirmpwd.value) {
    alert("Password and Confirm Password does not match");
    return false;
  } else if (username.value.length == 0) {
    alert("Username is Empty!");
    return false;
  } else if (password.value.length == 0) {
    alert("Password is Empty!");
    return false;
  } else if (confirmpwd.value.length == 0) {
    alert("Confirm pwd is empty!");
    return false;
  } else if (!validateImg()) {
    return false;
  } else {
    return true;
  }
}
