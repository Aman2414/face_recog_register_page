let trump_btn = document.querySelector(".trump-vbtn");
let joe_btn = document.querySelector(".joe-vbtn");

trump_btn.addEventListener("click", async () => {
  addVote("trump");
});

joe_btn.addEventListener("click", async () => {
  addVote("joe");
});

function addVote(name) {
  console.log("AddVote Called");
  let url = `http://localhost:5000/addvote/${name}`;
  fetch(url, {
    method: "POST",
  })
    .then((response) => {
      let code = response.status;
      if (code === 500) {
        alert("Server Error Please Try Again!");
      } else if (code === 404) {
        alert(`There is no candidate named ${name}`);
      } else if (code === 502) {
        alert("Server Error in Updating total votes");
      } else if (code === 403) {
        alert("You have already Voted");
        window.location.href = "http://localhost:5000";
      } else if (code === 200) {
        alert("You have Successfully Voted");
        window.location.href = "http://localhost:5000/login";
      }
    })
    .catch((err) => {
      alert("Unable to add Vote Fetch Api Error", err);
    });
}
