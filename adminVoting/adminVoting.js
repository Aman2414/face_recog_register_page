let totalVotesTrump = document.getElementById("totalVotesTrump");
let totalVotesJoe = document.getElementById("totalVotesJoe");
let pbarTrump = document.getElementById("pbarTrump");
let pbarJoe = document.getElementById("pbarJoe");
let clearVotes = document.getElementById("clear-votes");
let trumpVotes;
let joeVotes;

clearVotes.addEventListener("click", () => {
  fetch("http://localhost:5000/clearVotes", {
    method: "GET",
  })
    .then((response) => {
      let code = response.status;
      if (code === 403) {
        window.location.href = "http://localhost:5000/admin";
      } else if (code === 200) {
        pbarTrump.style.width = `0%`;
        pbarJoe.style.width = `0%`;
        totalVotesTrump.innerText = "";
        totalVotesJoe.innerText = "";
      } else if (code === 500) {
        alert("Error Clearing Votes of Trump");
      } else if (code === 501) {
        alert("Error Clearing Votes of Joe");
      }
    })
    .catch((err) => {
      if (err) {
        alert("Error in making fetch request for clearing votes", err);
      }
    });
});

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
      alert("Error in getting Candidate Trump details", err);
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

  if (trumVotes !== 0) {
    pbarTrump.innerText = `${trumVotes}%`;
    totalVotesTrump.innerText = `Votes Got: ${trumpVotes}/${tVotes}`;
  }
  if (jVotes !== 0) {
    pbarJoe.innerText = `${jVotes}%`;
    totalVotesJoe.innerText = `Votes Got: ${jVotes}/${tVotes}`;
  }
}
