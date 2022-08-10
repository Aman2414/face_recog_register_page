var faceimagesData = "https://firebasestorage.googleapis.com/v0/b/face-recog-e3890.appspot.com/o/"
var getImage = "https://firebasestorage.googleapis.com/v0/b/face-recog-e3890.appspot.com/o/{pass image name here to get image}?alt=media"
let submitBtn = document.getElementById('sub');
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmpwd = document.getElementById("confirm-password");
let selectedImage = document.getElementById("choosenFile");
let file;

const firebaseConfig = {
    apiKey: "AIzaSyAI4Az3-LbN5Yp98ATvYw6xIp37IRZfm-Q",
    authDomain: "face-recog-e3890.firebaseapp.com",
    databaseURL: "https://face-recog-e3890-default-rtdb.firebaseio.com",
    projectId: "face-recog-e3890",
    storageBucket: "face-recog-e3890.appspot.com",
    messagingSenderId: "1032044332746",
    appId: "1:1032044332746:web:ae6c3a60584aba2b941633",
    measurementId: "G-J73S9ZE3TP"
};

firebase.initializeApp(firebaseConfig);

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

function uploadChoosenFile() {
    let username = document.getElementById("username");
    const ref = firebase.storage().ref();
    const file = document.querySelector("#choosenFile").files[0];
    const name = username.value + '';
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            alert("Data Uploaded");
        })
        .catch(console.error);
}

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Submit Called");
    username = document.getElementById("username");
    password = document.getElementById("password");
    confirmpwd = document.getElementById("confirm-password");
    selectedImage = document.getElementById("choosenFile");

    if (validate()) {
        //upload image in firebase
        uploadChoosenFile();
        alert("Uploading User Details in MongoDB");
        // uploading image link and user data in mongodb
        uploadUserDetails(
            `http://localhost:5000/addUser/${username.value}/${password.value}`
        );
    }
});

function uploadUserDetails(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
}