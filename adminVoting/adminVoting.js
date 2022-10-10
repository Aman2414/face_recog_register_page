let totalVotes = document.getElementById("totalVotes");
let pbarTrump = document.getElementById("pbarTrump");
let pbarJoe = document.getElementById("pbarJoe");
let trumpVotes;
let joeVotes;

fetch("http://localhost:5000/totalVotes/trump", {
  method: "GET",
})
  .then(async (response) => {
    let code = response.status;

    if (code === 403) {
      window.location.href = "http://localhost:5000/admin";
    } else if (code === 200) {
      let result = await response.json();
      trumpVotes = result.votes;
    } else if (code === 500) {
      alert("Server Error in getting votes");
    } else if (code === 404) {
      alert("Votes not found");
    }
  })
  .catch((err) => {
    if (err) {
      alert("Error Trump", err);
    }
  });

fetch("http://localhost:5000/totalVotes/joe", {
  method: "GET",
})
  .then(async (response) => {
    let code = response.status;
    if (code === 403) {
      window.location.href = "http://localhost:5000/admin";
    } else if (code === 200) {
      let result = await response.json();
      joeVotes = result.votes;
      setVotes();
    } else if (code === 500) {
      alert("Server Error in getting votes");
    } else if (code === 404) {
      alert("Votes not found");
    }
  })
  .catch((err) => {
    if (err) {
      console.log("Joe Error ", err);
    }
  });

function setVotes() {
  let tVotes = parseInt(trumpVotes) + parseInt(joeVotes);
  console.log("Total Votes ", tVotes);
  let trumVotes = parseInt((trumpVotes * 100) / tVotes);
  let jVotes = parseInt((joeVotes * 100) / tVotes);
  console.log("Trump Votes % ", trumVotes);
  console.log("Joe Votes % ", jVotes);
  pbarTrump.style.width = `${trumVotes}%`;
  pbarJoe.style.width = `${jVotes}%`;

  pbarTrump.innerText = `${trumVotes}%`;
  pbarJoe.innerText = `${jVotes}%`;
}
