const { log } = console;

const btnContainer = document.querySelector("div.container.pick");
const btnRock = document.querySelector(".button.rock");
const btnPaper = document.querySelector(".button.paper");
const btnScissors = document.querySelector(".button.scissors");
const btnNewgame = document.querySelector(".button.newgame");

const messageEl = document.querySelector(".msg");

const compScore = document.querySelector("#comp-score");
const playerScore = document.querySelector("#player-score");

const playerContainer = document.querySelector(".container.player");
const compContainer = document.querySelector(".container.computer");
const mainContainer = document.querySelector("div.container.main");
const body = document.querySelector("body");
const newgame = document.querySelector(".container.newgame");

const values = [
  `<img class="rock" src="./images/rock.png" alt="">`,
  `<img class="paper" src="./images/paper.png" alt="">`,
  `<img class="scissors" src="./images/scissors.png" alt="">`,
];
Object.freeze(values);

btnRock.addEventListener("click", showRock);
btnPaper.addEventListener("click", showPaper);
btnScissors.addEventListener("click", showScissors);

btnNewgame.addEventListener("click", () => {
  window.location.reload();
});

const perfomance = performance.now();
playerScore.innerHTML = +0;
compScore.innerHTML = +0;

function showRock() {
  const playerPick = 0;
  renderGame(playerPick);
}

function showPaper() {
  const playerPick = 1;
  renderGame(playerPick);
}

function showScissors() {
  const playerPick = 2;
  renderGame(playerPick);
}

function compChoice() {
  const random = Math.floor(Math.random() * 3);
  return Math.trunc((perfomance + random) % 3);
}

function showMsg(msg) {
  console.time("Buttons hidden");
  btnContainer.style.display = "none";
  messageEl.innerHTML = msg;
  setTimeout(() => {
    messageEl.innerHTML = "Choose Rock, Paper or Scissors to start!";
    btnContainer.style.display = "flex";
    console.timeEnd("Buttons hidden");
  }, 3000);
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

function updateScore(bool) {
  if (bool === undefined) return;
  bool ? playerScore.innerHTML++ : compScore.innerHTML++;
}

function renderGame(playerPick) {
  const random = compChoice();
  const result = gameRules(playerPick, random);
  playerContainer.innerHTML = values[playerPick];
  compContainer.innerHTML = values[random];
  updateScore(result);
  gameOver();
}

function gameOver() {
  const player = +playerScore.innerHTML;
  const computer = +compScore.innerHTML;
  if (player === 5) {
    mainContainer.style.display = "none";
    document.querySelector(".newgame-h1").innerHTML = "Game over. You won!";
    body.style.justifyContent = "center";
    newgame.style.display = "flex";
  } else if (computer === 5) {
    mainContainer.style.display = "none";
    document.querySelector(".newgame-h1").innerHTML = "Game over. You won!";
    body.style.justifyContent = "center";
    newgame.style.display = "flex";
  }
}
