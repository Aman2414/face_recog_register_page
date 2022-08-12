let submitBtn = document.getElementById('sub');
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmpwd = document.getElementById("confirm-password");
let selectedImage = document.getElementById("choosenFile");
let file;
let imageData;

function validateImg(event) {
    if (event.files.length == 0) {
        alert("File is Not Selected");
    }
    else {
        file = event.files[0];
        if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
            alert("File is Not Image");
        }
        else {
            return true;
        }
    }
    return false;
}

function validate() {
    console.log("Validating");
    if (username.value.length == 0) {
        alert("Username is Empty!");
        return false;
    }
    else if (password.value.length == 0) {
        alert("Password is Empty!");
        return false;
    }
    else if (confirmpwd.value.length == 0) {
        alert("Confirm Password is Empty!");
        return false;
    }
    else if (!validateConfirmPwd()) {
        alert("InValid Confirm Pwd");
        return false;
    }
    else if (!validateImg(selectedImage)) {
        return false;
    }
    else {
        return true;
    }
}


function validateConfirmPwd() {
    return password.value == confirmpwd.value ? true : false;
}

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Submit Called");
    username = document.getElementById("username");
    password = document.getElementById("password");
    confirmpwd = document.getElementById("confirm-password");
    selectedImage = document.getElementById("choosenFile");

    if (validate()) {
        alert("Data is Valid So Uploading to mongodb");
        uploadData();
    }

});

function uploadData() {
    var reader = new FileReader();
    console.log("Uploading Data");
    console.log(selectedImage.files[0]);
    reader.readAsDataURL(selectedImage.files[0]);
    reader.onload = function () {
        imageData = reader.result;
        fetch("/registerUser", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                data: imageData,
            })
        }).then(function () {
            console.log("User Registered Successfully");
        }).catch(function (err) {
            console.log("Error !", err)
        });
    };

    reader.onerror = function (err) {
        console.log("Cannot Read the file", err);
    }
}
