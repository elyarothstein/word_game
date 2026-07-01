const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const START_DATE = "2026-06-29";
const HOME_TIME = new Date("2026-07-15T18:00:00-04:00");
const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const KEY_PRIORITY = { absent: 1, present: 2, correct: 3 };
const COMPLETED_KEY = "roadHomeWordleCompletedVertical";
const CUSTOM_WORDS_KEY = "roadHomeWordleCustomWordsVertical";
const GAME_PASSWORD = "paps";

const levels = [
  { date: "2026-06-29", city: "Chicago", photo: "aviva_images/level-1.jpg", answer: "COOKY", position: [50, 8] },
  { date: "2026-06-30", city: "Chicago Skyline", photo: "aviva_images/level-2.jpg", answer: "SMILE", position: [50, 13.25] },
  { date: "2026-07-01", city: "Chicago Clouds", photo: "aviva_images/level-3.jpg", answer: "CLOUD", position: [50, 18.5] },
  { date: "2026-07-02", city: "Sky Road", photo: "aviva_images/level-4.jpg", answer: "BRAVE", position: [50, 23.75] },
  { date: "2026-07-03", city: "Cloud Stop", photo: "aviva_images/level-5.jpg", answer: "HAPPY", position: [50, 29] },
  { date: "2026-07-04", city: "Blue Sky", photo: "aviva_images/level-6.jpg", answer: "SPARK", position: [50, 34.25] },
  { date: "2026-07-05", city: "Airplane Trail", photo: "aviva_images/level-7.jpg", answer: "PLANE", position: [50, 39.5] },
  { date: "2026-07-06", city: "Cloud Path", photo: "aviva_images/level-8.jpg", answer: "DREAM", position: [50, 44.75] },
  { date: "2026-07-07", city: "Birds Above", photo: "aviva_images/level-9.jpg", answer: "BIRDS", position: [50, 50] },
  { date: "2026-07-08", city: "High Sky", photo: "aviva_images/level-10.jpg", answer: "SUNNY", position: [50, 55.25] },
  { date: "2026-07-09", city: "Cloud Bridge", photo: "aviva_images/level-11.jpg", answer: "MAGIC", position: [50, 60.5] },
  { date: "2026-07-10", city: "Almost There", photo: "aviva_images/level-12.jpg", answer: "LAUGH", position: [50, 65.75] },
  { date: "2026-07-11", city: "Baltimore Sky", photo: "aviva_images/level-13.jpg", answer: "PHONE", position: [50, 71] },
  { date: "2026-07-12", city: "Inner Harbor", photo: "aviva_images/level-14.jpg", answer: "BOATS", position: [50, 76.25] },
  { date: "2026-07-13", city: "Harbor Walk", photo: "aviva_images/level-15.jpg", answer: "SALAD", position: [50, 81.5] },
  { date: "2026-07-14", city: "Baltimore Buildings", photo: "aviva_images/level-16.jpg", answer: "HOMES", position: [50, 86.75] },
  { date: "2026-07-15", city: "Baltimore", photo: "aviva_images/level-17.jpg", answer: "SHELF", position: [50, 92] }
];

let activeLevelIndex = null;
let answer = "";
let currentRow = 0;
let currentGuess = "";
let gameOver = false;

const routeMap = document.querySelector("#routeMap");
const passwordShell = document.querySelector("#passwordShell");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordMessage = document.querySelector("#passwordMessage");
const appShell = document.querySelector("#appShell");
const roadSvg = document.querySelector("#roadSvg");
const todayLine = document.querySelector("#todayLine");
const gameModal = document.querySelector("#gameModal");
const rewardModal = document.querySelector("#rewardModal");
const modalDate = document.querySelector("#modalDate");
const modalTitle = document.querySelector("#modalTitle");
const board = document.querySelector("#board");
const keyboard = document.querySelector("#keyboard");
const message = document.querySelector("#message");
const setupPanel = document.querySelector("#setupPanel");
const secretWordInput = document.querySelector("#secretWord");
const startButton = document.querySelector("#startButton");
const closeGameButton = document.querySelector("#closeGameButton");
const closeRewardButton = document.querySelector("#closeRewardButton");
const rewardImage = document.querySelector("#rewardImage");
const rewardCountdown = document.querySelector("#rewardCountdown");

function buildApp() {
  buildBoard();
  buildKeyboard();
  buildRoad();
  buildLevels();
  updateCountdownText();
  setInterval(updateCountdownText, 60000);
}

function unlockGame() {
  passwordShell.classList.add("hidden");
  appShell.classList.remove("locked");
  appShell.setAttribute("aria-hidden", "false");
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value.trim().toLowerCase() === GAME_PASSWORD) {
    unlockGame();
    return;
  }

  passwordMessage.textContent = "Try again.";
  passwordInput.value = "";
  passwordInput.focus();
});

passwordInput.focus();

function buildRoad() {
  roadSvg.innerHTML = "";
  const pathData = levels.map((level, index) => {
    const command = index === 0 ? "M" : "L";
    return `${command} ${level.position[0]} ${level.position[1]}`;
  }).join(" ");

  const road = document.createElementNS("http://www.w3.org/2000/svg", "path");
  road.setAttribute("d", pathData);
  road.setAttribute("fill", "none");
  road.setAttribute("stroke", "var(--road)");
  road.setAttribute("stroke-width", "10");
  road.setAttribute("stroke-linecap", "round");
  road.setAttribute("stroke-linejoin", "round");
  roadSvg.append(road);

  const centerLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  centerLine.setAttribute("d", pathData);
  centerLine.setAttribute("fill", "none");
  centerLine.setAttribute("stroke", "var(--road-line)");
  centerLine.setAttribute("stroke-width", "1.8");
  centerLine.setAttribute("stroke-linecap", "round");
  centerLine.setAttribute("stroke-dasharray", "2.5 3.5");
  roadSvg.append(centerLine);
}

function buildLevels() {
  routeMap.querySelectorAll(".level-stop").forEach((button) => button.remove());
  const completed = getCompletedLevels();
  const todayText = todayKey();

  levels.forEach((level, index) => {
    const button = document.createElement("button");
    const isCompleted = completed.includes(index);
    const isUnlocked = level.date <= todayText;
    const isToday = level.date === todayText;

    button.type = "button";
    button.className = "level-stop";
    button.style.left = `${level.position[0]}%`;
    button.style.top = `${level.position[1]}%`;
    button.setAttribute("aria-label", `${level.city}, ${formatShortDate(level.date)}`);

    if (isCompleted) {
      button.classList.add("completed");
      button.style.backgroundImage = `url("${level.photo}")`;
      button.innerHTML = `<span class="level-countdown">${getCountdownText()}</span>`;
      button.addEventListener("click", () => showReward(index));
    } else if (isUnlocked) {
      button.classList.add("unlocked");
      if (isToday) {
        button.classList.add("today");
      }
      button.innerHTML = `<span class="level-number">${index + 1}</span><span class="level-date">${formatShortDate(level.date)}</span>`;
      button.addEventListener("click", () => openLevel(index));
    } else {
      button.disabled = true;
      button.innerHTML = `<span class="level-number">Lock</span><span class="level-date">${formatShortDate(level.date)}</span>`;
    }

    routeMap.append(button);
  });
}

function openLevel(index) {
  activeLevelIndex = index;
  const level = levels[index];
  const customWords = getCustomWords();
  answer = cleanLetters(level.answer || customWords[level.date] || "");
  currentRow = 0;
  currentGuess = "";
  gameOver = false;

  modalDate.textContent = `${formatLongDate(level.date)} - ${level.city}`;
  modalTitle.textContent = `Level ${index + 1}`;
  resetBoard();
  resetKeyboard();
  setMessage("Guess the five-letter word.");
  gameModal.classList.add("open");
  gameModal.setAttribute("aria-hidden", "false");

  if (answer.length === WORD_LENGTH) {
    setupPanel.classList.add("hidden");
  } else {
    setupPanel.classList.remove("hidden");
    setMessage("Set this day's secret word first.");
    secretWordInput.value = "";
    secretWordInput.focus();
  }
}

function startGame() {
  const proposedAnswer = cleanLetters(secretWordInput.value);

  if (proposedAnswer.length !== WORD_LENGTH) {
    setMessage("Use exactly five letters for the secret word.");
    secretWordInput.focus();
    return;
  }

  const level = levels[activeLevelIndex];
  const customWords = getCustomWords();
  customWords[level.date] = proposedAnswer;
  saveCustomWords(customWords);
  answer = proposedAnswer;
  setupPanel.classList.add("hidden");
  secretWordInput.value = "";
  setMessage("Guess the five-letter word.");
}

function completeLevel() {
  const completed = getCompletedLevels();

  if (!completed.includes(activeLevelIndex)) {
    completed.push(activeLevelIndex);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  }

  buildLevels();
  showReward(activeLevelIndex);
}

function showReward(index) {
  const level = levels[index];
  rewardImage.src = level.photo;
  rewardCountdown.textContent = getCountdownText();
  rewardModal.classList.add("open");
  rewardModal.setAttribute("aria-hidden", "false");
}

function closeGame() {
  gameModal.classList.remove("open");
  gameModal.setAttribute("aria-hidden", "true");
}

function closeReward() {
  rewardModal.classList.remove("open");
  rewardModal.setAttribute("aria-hidden", "true");
}

function buildBoard() {
  board.innerHTML = "";

  for (let rowIndex = 0; rowIndex < MAX_GUESSES; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.row = rowIndex;

    for (let tileIndex = 0; tileIndex < WORD_LENGTH; tileIndex += 1) {
      const tile = document.createElement("div");
      tile.className = "tile";
      row.append(tile);
    }

    board.append(row);
  }
}

function buildKeyboard() {
  keyboard.innerHTML = "";

  KEY_ROWS.forEach((letters, rowIndex) => {
    const row = document.createElement("div");
    row.className = "key-row";

    if (rowIndex === 2) {
      row.append(createKey("Enter", "ENTER", true));
    }

    letters.split("").forEach((letter) => row.append(createKey(letter, letter, false)));

    if (rowIndex === 2) {
      row.append(createKey("Delete", "DEL", true));
    }

    keyboard.append(row);
  });
}

function createKey(label, value, isWide) {
  const key = document.createElement("button");
  key.type = "button";
  key.className = isWide ? "key wide" : "key";
  key.textContent = label;
  key.dataset.key = value;
  key.setAttribute("aria-label", label);
  key.addEventListener("click", () => handleInput(value));
  return key;
}

function handleInput(value) {
  if (!answer || gameOver || !gameModal.classList.contains("open")) {
    return;
  }

  if (value === "ENTER") {
    submitGuess();
    return;
  }

  if (value === "DEL" || value === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
    drawCurrentGuess();
    return;
  }

  if (/^[A-Z]$/.test(value) && currentGuess.length < WORD_LENGTH) {
    currentGuess += value;
    drawCurrentGuess();
  }
}

function drawCurrentGuess() {
  const row = getCurrentRow();

  [...row.children].forEach((tile, index) => {
    tile.textContent = currentGuess[index] || "";
    tile.classList.toggle("filled", Boolean(currentGuess[index]));
  });
}

function submitGuess() {
  if (currentGuess.length !== WORD_LENGTH) {
    setMessage("Finish all five letters before checking.");
    return;
  }

  if (!isValidGuess(currentGuess)) {
    setMessage("That is not in the word list. Try a real word.");
    return;
  }

  const result = scoreGuess(currentGuess, answer);
  const row = getCurrentRow();

  result.forEach((state, index) => {
    row.children[index].classList.add(state);
    updateKeyState(currentGuess[index], state);
  });

  if (currentGuess === answer) {
    setMessage("You got it!");
    gameOver = true;
    setTimeout(() => {
      closeGame();
      completeLevel();
    }, 650);
    return;
  }

  currentRow += 1;
  currentGuess = "";

  if (currentRow >= MAX_GUESSES) {
    setMessage(`Game over. The word was ${answer}.`);
    gameOver = true;
    return;
  }

  setMessage("Keep going.");
}

function isValidGuess(guess) {
  if (guess === answer) {
    return true;
  }

  if (!window.VALID_FIVE_LETTER_WORDS) {
    return true;
  }

  return window.VALID_FIVE_LETTER_WORDS.has(guess);
}

function scoreGuess(guess, secret) {
  const result = Array(WORD_LENGTH).fill("absent");
  const remaining = {};

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    if (guess[index] === secret[index]) {
      result[index] = "correct";
    } else {
      remaining[secret[index]] = (remaining[secret[index]] || 0) + 1;
    }
  }

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    const letter = guess[index];

    if (result[index] === "correct") {
      continue;
    }

    if (remaining[letter] > 0) {
      result[index] = "present";
      remaining[letter] -= 1;
    }
  }

  return result;
}

function updateKeyState(letter, state) {
  const key = document.querySelector(`[data-key="${letter}"]`);
  const currentState = ["correct", "present", "absent"].find((name) => key.classList.contains(name));

  if (!currentState || KEY_PRIORITY[state] > KEY_PRIORITY[currentState]) {
    key.classList.remove("correct", "present", "absent");
    key.classList.add(state);
  }
}

function resetBoard() {
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.textContent = "";
    tile.className = "tile";
  });
}

function resetKeyboard() {
  document.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("correct", "present", "absent");
  });
}

function getCurrentRow() {
  return document.querySelector(`[data-row="${currentRow}"]`);
}

function getCompletedLevels() {
  return JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");
}

function getCustomWords() {
  return JSON.parse(localStorage.getItem(CUSTOM_WORDS_KEY) || "{}");
}

function saveCustomWords(words) {
  localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(words));
}

function todayKey() {
  const params = new URLSearchParams(window.location.search);
  return params.get("testDate") || formatDateKey(new Date());
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatShortDate(dateText) {
  return createLocalDate(dateText).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatLongDate(dateText) {
  return createLocalDate(dateText).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
}

function createLocalDate(dateText) {
  const [year, month, day] = dateText.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getCountdownParts() {
  const now = new Date();
  const remainingMs = Math.max(0, HOME_TIME.getTime() - now.getTime());
  const totalHours = Math.floor(remainingMs / 3600000);
  return {
    days: Math.floor(totalHours / 24),
    hours: totalHours % 24
  };
}

function getCountdownText() {
  const { days, hours } = getCountdownParts();
  const dayText = days === 1 ? "day" : "days";
  const hourText = hours === 1 ? "hour" : "hours";
  return `${days} ${dayText} and ${hours} ${hourText} until home`;
}

function updateCountdownText() {
  const today = todayKey();
  const availableCount = levels.filter((level) => level.date <= today).length;
  todayLine.textContent = `${availableCount} of ${levels.length} stops unlocked. ${getCountdownText()}.`;
  document.querySelectorAll(".level-stop.completed .level-countdown").forEach((label) => {
    label.textContent = getCountdownText();
  });
}

function cleanLetters(value) {
  return value.toUpperCase().replace(/[^A-Z]/g, "");
}

function setMessage(text) {
  message.textContent = text;
}

startButton.addEventListener("click", startGame);
closeGameButton.addEventListener("click", closeGame);
closeRewardButton.addEventListener("click", closeReward);

secretWordInput.addEventListener("input", () => {
  secretWordInput.value = cleanLetters(secretWordInput.value);
});

secretWordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startGame();
  }
});

document.addEventListener("keydown", (event) => {
  if (document.activeElement === secretWordInput) {
    return;
  }

  if (event.key === "Escape") {
    closeGame();
    closeReward();
  } else if (event.key === "Enter") {
    handleInput("ENTER");
  } else if (event.key === "Backspace") {
    handleInput("BACKSPACE");
  } else {
    handleInput(event.key.toUpperCase());
  }
});

buildApp();
