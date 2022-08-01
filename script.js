submitBtn = document.getElementById("sub");
let file;

function hello() {
    // console.log("Hello");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let confirmpwd = document.getElementById("confirm-password");
    let imageFile = document.getElementById("choosenFile");

    if (username.value.length != 0 && password.value.length != 0 && confirmpwd.value.length != 0 && validateImg(imageFile)) {
        console.log("Username: " + username.value);
        console.log("Password: " + password.value);
        console.log("Confirm Password: " + confirmpwd.value);
        console.log(file);
    }
};


function validateImg(event) {
    file = event.files[0];

    if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
        return false;
    }
    else {
        return true;
    }
}