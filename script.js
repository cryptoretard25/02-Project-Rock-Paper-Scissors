const { log } = console;

const btnContainer = document.querySelector("div.container.pick");
const btnNewgame = document.querySelector(".button.newgame");
const compScore = document.querySelector("#comp-score");
const playerScore = document.querySelector("#player-score");
const images = document.querySelectorAll("img.image");

playerScore.textContent = +0;
compScore.textContent = +0;

btnContainer.addEventListener("click", showItem);
btnNewgame.addEventListener("click", () => {
  window.location.reload();
});

function showItem(e) {
  if (e.target.classList.contains("rock")) {
    const pick = 0;
    renderGame(pick);
  }
  if (e.target.classList.contains("paper")) {
    const pick = 1;
    renderGame(pick);
  }
  if (e.target.classList.contains("scissors")) {
    const pick = 2;
    renderGame(pick);
  }
}

function updateScore(bool) {
  if (bool === undefined) return;
  bool ? playerScore.textContent++ : compScore.textContent++;
}

function renderGame(pick) {
  const random = (function () {
    const perfomance = performance.now();
    const random = Math.floor(Math.random() * 3);
    return Math.trunc((perfomance + random) % 3);
  })();

  const playerContainer = document.querySelector("div.container.player");
  const compContainer = document.querySelector("div.container.computer");

  playerContainer.innerHTML = images[pick].outerHTML;
  playerContainer.style.display = "flex";

  compContainer.innerHTML = images[random].outerHTML;
  compContainer.style.display = "flex";

  updateScore(gameRules(pick, random));
  gameOver();
}

function gameRules(player, comp) {
  const values = ["Rock", "Paper", "Scissors"];
  if (player === comp) {
    showMsg(`Draw! Both players thrown ${values[player]}`);
    return;
  }
  if (
    (player === 0 && comp === 2) ||
    (player === 1 && comp === 0) ||
    (player === 2 && comp === 1)
  ) {
    showMsg(`You win! ${values[player]} beats ${values[comp]}`);
    return true;
  } else {
    showMsg(`You lose! ${values[comp]} beats ${values[player]}`);
    return false;
  }
}

function gameOver() {
  const newgame = document.querySelector(".container.newgame");
  const mainContainer = document.querySelector("div.container.main");
  const body = document.body;
  const player = +playerScore.textContent;
  const computer = +compScore.textContent;
  if (player === 5) {
    mainContainer.style.display = "none";
    document.querySelector(".newgame-h1").textContent = "Game over! You won!";
    body.style.justifyContent = "center";
    newgame.style.display = "flex";
  } else if (computer === 5) {
    mainContainer.style.display = "none";
    document.querySelector(".newgame-h1").textContent =
      "Game over! Computer wins.";
    body.style.justifyContent = "center";
    newgame.style.display = "flex";
  }
}

function showMsg(msg) {
  const messageEl = document.querySelector(".msg");
  console.time("Buttons hidden");
  btnContainer.style.display = "none";
  messageEl.style.color = "red";
  messageEl.textContent = msg;
  setTimeout(() => {
    messageEl.style.color = "black";
    messageEl.textContent = "Choose Rock, Paper or Scissors to start!";
    btnContainer.style.display = "flex";
    console.timeEnd("Buttons hidden");
  }, 3000);
}
