const state = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  moves: 0,
  timeLeft: 180,
  timer: null,
  gameStarted: false,
  currentPlayer: 0,
  playerNames: ["Гравець 1", "Гравець 2"],
  currentRound: 1,
  totalRounds: 1,
  gameResults: [],
  difficulty: "easy",
  rows: 4,
  cols: 4,
};

const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");
const currentPlayerDisplay = document.getElementById("current-player");
const currentRoundDisplay = document.getElementById("current-round");
const startBtn = document.getElementById("start-game-btn");
const restartBtn = document.getElementById("restart-btn");
const resetSettingsBtn = document.getElementById("reset-settings-btn");
const difficultySelect = document.getElementById("difficulty");
const playersCountSelect = document.getElementById("players-count");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const player2InputContainer = document.getElementById("player2-input");
const rowsInput = document.getElementById("rows");
const colsInput = document.getElementById("cols");
const roundsInput = document.getElementById("rounds");
const statsPanel = document.getElementById("stats");
const resultsPanel = document.getElementById("results");
const winnerDisplay = document.getElementById("winner");
const resultsBody = document.getElementById("results-body");
const playerInputsContainer = document.getElementById(
  "player-inputs-container"
);

const cardImages = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🙁",
  "😋",
  "🥸",
  "😃",
  "😇,",
  "😤",
];

function initGame() {
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", resetGame);
  resetSettingsBtn.addEventListener("click", resetSettings);
  playersCountSelect.addEventListener("change", updatePlayerInputs);

  updatePlayerInputs();
}

function updatePlayerInputs() {
  const playersCount = parseInt(playersCountSelect.value);
  player2InputContainer.style.display = playersCount === 2 ? "block" : "none";
}

function resetSettings() {
  difficultySelect.value = "easy";
  playersCountSelect.value = "1";
  player1Input.value = "Гравець 1";
  player2Input.value = "Гравець 2";
  rowsInput.value = "4";
  colsInput.value = "4";
  roundsInput.value = "1";
  updatePlayerInputs();
}

function startGame() {
  state.difficulty = difficultySelect.value;
  state.rows = parseInt(rowsInput.value);
  state.cols = parseInt(colsInput.value);
  state.totalRounds = parseInt(roundsInput.value);
  state.currentRound = 1;
  state.gameResults = [];

  if (state.rows * state.cols < 4 || state.rows < 2 || state.cols < 2) {
    alert("Мінімальний розмір поля - 2x2 (4 карти)");
    return;
  }

  const pairsNeeded = Math.floor((state.rows * state.cols) / 2);
  if (pairsNeeded > cardImages.length) {
    alert("Недостатньо унікальних карток для обраного розміру поля");
    return;
  }

  state.playerNames = [player1Input.value || "Гравець 1"];
  if (parseInt(playersCountSelect.value) === 2) {
    state.playerNames.push(player2Input.value || "Гравець 2");
  }

  document.querySelector(".settings-panel").style.display = "none";
  statsPanel.style.display = "block";
  resultsPanel.style.display = "none";

  startRound();
}

function startRound() {
  if (state.timer) clearInterval(state.timer);

  state.timeLeft = {
    easy: 180,
    normal: 120,
    hard: 60,
  }[state.difficulty];

  state.moves = 0;
  state.flippedCards = [];
  state.matchedCards = [];
  state.currentPlayer = 0;
  state.gameStarted = true;

  const pairsNeeded = Math.floor((state.rows * state.cols) / 2);
  const usedImages = cardImages.slice(0, pairsNeeded);
  const cardValues = [...usedImages, ...usedImages].sort(
    () => Math.random() - 0.5
  );

  state.cards = cardValues;

  renderBoard();
  updateStats();

  restartBtn.disabled = false;

  state.timer = setInterval(updateTimer, 1000);
}

function renderBoard() {
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns = `repeat(${state.cols}, 1fr)`;

  state.cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    if (
      state.flippedCards.includes(index) ||
      state.matchedCards.includes(index)
    ) {
      cardElement.textContent = card;
      cardElement.classList.add("flipped");
    }

    if (state.matchedCards.includes(index)) {
      cardElement.classList.add("matched");
    }

    cardElement.addEventListener("click", () => handleCardClick(index));
    gameBoard.appendChild(cardElement);
  });
}

function handleCardClick(index) {
  if (
    !state.gameStarted ||
    state.matchedCards.includes(index) ||
    state.flippedCards.includes(index) ||
    state.flippedCards.length >= 2
  ) {
    return;
  }

  state.flippedCards.push(index);
  renderBoard();

  if (state.flippedCards.length === 2) {
    state.moves++;

    if (
      state.cards[state.flippedCards[0]] === state.cards[state.flippedCards[1]]
    ) {
      state.matchedCards.push(...state.flippedCards);
      state.flippedCards = [];

      if (state.matchedCards.length === state.cards.length) {
        endRound();
      } else if (state.playerNames.length > 1) {
        state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
      }
    } else {
      setTimeout(() => {
        state.flippedCards = [];
        renderBoard();

        if (state.playerNames.length > 1) {
          state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
        }
      }, 1000);
    }

    updateStats();
  }
}

function updateTimer() {
  state.timeLeft--;
  updateStats();

  if (state.timeLeft <= 0) {
    endRound();
  }
}

function updateStats() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timerDisplay.textContent = `Час: ${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  movesDisplay.textContent = `Ходи: ${state.moves}`;
  currentRoundDisplay.textContent = `Раунд: ${state.currentRound} з ${state.totalRounds}`;

  if (state.playerNames.length > 1) {
    currentPlayerDisplay.textContent = `Поточний гравець: ${
      state.playerNames[state.currentPlayer]
    }`;
    currentPlayerDisplay.style.display = "block";
  } else {
    currentPlayerDisplay.style.display = "none";
  }
}

function endRound() {
  clearInterval(state.timer);
  state.gameStarted = false;

  const roundResult = {
    round: state.currentRound,
    moves: state.moves,
    time: state.timeLeft,
    winner: null,
  };

  if (state.playerNames.length === 1) {
    roundResult.winner = state.playerNames[0];
  } else {
    roundResult.winner = state.playerNames[state.currentPlayer];
  }

  state.gameResults.push(roundResult);

  if (state.currentRound >= state.totalRounds) {
    endGame();
  } else {
    state.currentRound++;
    setTimeout(startRound, 2000);
  }
}

function endGame() {
  statsPanel.style.display = "none";
  resultsPanel.style.display = "block";

  if (state.playerNames.length === 1) {
    winnerDisplay.textContent = `Гру завершено! Ваш результат: ${state.gameResults[0].moves} ходів.`;
  } else {
    const wins = {};
    state.playerNames.forEach((name) => (wins[name] = 0));

    state.gameResults.forEach((result) => {
      wins[result.winner]++;
    });

    let maxWins = 0;
    let overallWinner = "";

    for (const [name, count] of Object.entries(wins)) {
      if (count > maxWins) {
        maxWins = count;
        overallWinner = name;
      }
    }

    winnerDisplay.textContent = `Переможець: ${overallWinner} (${maxWins} з ${state.totalRounds} раундів)`;
  }

  resultsBody.innerHTML = "";
  state.gameResults.forEach((result) => {
    const row = document.createElement("tr");

    const timeMinutes = Math.floor(
      ({
        easy: 180,
        normal: 120,
        hard: 60,
      }[state.difficulty] -
        result.time) /
        60
    );
    const timeSeconds =
      ({
        easy: 180,
        normal: 120,
        hard: 60,
      }[state.difficulty] -
        result.time) %
      60;
    const timeStr = `${timeMinutes.toString().padStart(2, "0")}:${timeSeconds
      .toString()
      .padStart(2, "0")}`;

    row.innerHTML = `
                <td>${result.round}</td>
                <td>${result.winner}</td>
                <td>${result.moves}</td>
                <td>${timeStr}</td>
            `;

    resultsBody.appendChild(row);
  });

  document.querySelector(".settings-panel").style.display = "block";
}

function resetGame() {
  if (confirm("Скинути поточну гру та почати спочатку?")) {
    if (state.timer) clearInterval(state.timer);
    startRound();
  }
}

window.onload = initGame;
