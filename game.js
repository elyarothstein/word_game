const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const START_DATE = "2026-06-29";
const HOME_TIME = new Date("2026-07-15T18:00:00-04:00");
const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const KEY_PRIORITY = { absent: 1, present: 2, correct: 3 };
const OLD_COMPLETED_KEY = "roadHomeWordleCompletedVertical";
const COMPLETED_KEY = "roadHomeWordleFullyCompletedWithStrands";
const CUSTOM_WORDS_KEY = "roadHomeWordleCustomWordsVertical";
const SAVED_GUESSES_KEY = "roadHomeWordleSavedGuesses";
const WORDLE_COMPLETED_KEY = "roadHomeWordleWordleCompleted";
const STRANDS_PROGRESS_KEY = "roadHomeWordleStrandsProgress";
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

const strandsPuzzles = [
  { theme: "Cookie time", grid: ["COOKIE", "SUGARX", "FLOURX", "SWEETX", "DOUGHX", "TREATS"], words: ["COOKIE", "SUGAR", "FLOUR", "SWEET", "DOUGH"] },
  { theme: "Happy faces", grid: ["SMILEX", "LAUGHS", "GRINXX", "JOYFUL", "CHEERY", "GIGGLE"], words: ["SMILE", "LAUGH", "GRIN", "JOYFUL", "CHEERY", "GIGGLE"] },
  { theme: "Up in the sky", grid: ["CLOUDS", "SUNNYX", "BIRDSX", "PLANEY", "BREEZE", "SKYWAY"], words: ["CLOUDS", "SUNNY", "BIRDS", "PLANE", "BREEZE"] },
  { theme: "Camp courage", grid: ["BRAVEX", "TRAILX", "CABINX", "FIREXX", "SONGSX", "BUNKXX"], words: ["BRAVE", "TRAIL", "CABIN", "FIRE", "SONGS", "BUNK"] },
  { theme: "Sweet day", grid: ["HAPPYX", "CANDYX", "CAKEXX", "PARTYX", "GAMESX", "GIFTSX"], words: ["HAPPY", "CANDY", "CAKE", "PARTY", "GAMES", "GIFTS"] },
  { theme: "Fourth of July", grid: ["SPARKS", "STARSX", "FLAGSX", "REDXXX", "WHITEX", "BLUELY"], words: ["SPARKS", "STARS", "FLAGS", "RED", "WHITE", "BLUE"] },
  { theme: "Flying home", grid: ["PLANES", "WINGSX", "CLOUDS", "TICKET", "SEATXX", "PILOTX"], words: ["PLANES", "WINGS", "CLOUDS", "TICKET", "SEAT", "PILOT"] },
  { theme: "Dream night", grid: ["DREAMS", "STARSX", "MOONXX", "SLEEPX", "PILLOW", "QUIETX"], words: ["DREAMS", "STARS", "MOON", "SLEEP", "PILLOW", "QUIET"] },
  { theme: "Bird watching", grid: ["BIRDSX", "NESTXX", "WINGSX", "SONGXX", "FEATHR", "FLYING"], words: ["BIRDS", "NEST", "WINGS", "SONG", "FLYING"] },
  { theme: "Sunny weather", grid: ["SUNNYX", "LIGHTX", "WARMXX", "SHADEX", "BEACHX", "WATERX"], words: ["SUNNY", "LIGHT", "WARM", "SHADE", "BEACH", "WATER"] },
  { theme: "Magic show", grid: ["MAGICX", "WANDXX", "TRICKX", "STAGEX", "RABBIT", "SPARKS"], words: ["MAGIC", "WAND", "TRICK", "STAGE", "RABBIT", "SPARKS"] },
  { theme: "Laugh break", grid: ["LAUGHS", "JOKESX", "FUNNYX", "SILLYX", "GIGGLE", "SMILEX"], words: ["LAUGHS", "JOKES", "FUNNY", "SILLY", "GIGGLE", "SMILE"] },
  { theme: "Call home", grid: ["PHONEX", "CALLXX", "HELLOX", "VOICEY", "TEXTXX", "FAMILY"], words: ["PHONE", "CALL", "HELLO", "VOICE", "TEXT", "FAMILY"] },
  { theme: "Inner Harbor", grid: ["BOATSX", "WATERX", "DOCKXX", "SAILXX", "HARBOR", "WAVESX"], words: ["BOATS", "WATER", "DOCK", "SAIL", "HARBOR", "WAVES"] },
  { theme: "Lunch favorites", grid: ["SALADX", "PASTAX", "FRUITX", "BREADX", "JUICEX", "SNACKS"], words: ["SALAD", "PASTA", "FRUIT", "BREAD", "JUICE", "SNACKS"] },
  { theme: "Home things", grid: ["HOMESX", "ROOMXX", "COUCHX", "TABLEX", "LIGHTX", "DOORXX"], words: ["HOMES", "ROOM", "COUCH", "TABLE", "LIGHT", "DOOR"] },
  { theme: "Almost unpacked", grid: ["SHELFX", "BAGXXX", "SHOESX", "BOOKSX", "CLOTHS", "HUGSXX"], words: ["SHELF", "BAG", "SHOES", "BOOKS", "HUGS"] }
];

let activeLevelIndex = null;
let answer = "";
let currentRow = 0;
let currentGuess = "";
let gameOver = false;
let strandsSelection = [];

const routeMap = document.querySelector("#routeMap");
const passwordShell = document.querySelector("#passwordShell");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordMessage = document.querySelector("#passwordMessage");
const appShell = document.querySelector("#appShell");
const roadSvg = document.querySelector("#roadSvg");
const todayLine = document.querySelector("#todayLine");
const gameModal = document.querySelector("#gameModal");
const strandsModal = document.querySelector("#strandsModal");
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
const closeStrandsButton = document.querySelector("#closeStrandsButton");
const closeRewardButton = document.querySelector("#closeRewardButton");
const rewardImage = document.querySelector("#rewardImage");
const rewardCountdown = document.querySelector("#rewardCountdown");
const strandsDate = document.querySelector("#strandsDate");
const strandsTheme = document.querySelector("#strandsTheme");
const strandsCount = document.querySelector("#strandsCount");
const strandsMessage = document.querySelector("#strandsMessage");
const strandsGrid = document.querySelector("#strandsGrid");
const strandsSelectionText = document.querySelector("#strandsSelection");
const clearStrandsButton = document.querySelector("#clearStrandsButton");
const submitStrandsButton = document.querySelector("#submitStrandsButton");
const foundWords = document.querySelector("#foundWords");

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
  const wordleCompleted = getWordleCompletedLevels();
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
      if (wordleCompleted.includes(index)) {
        button.classList.add("strands-ready");
      }
      if (isToday) {
        button.classList.add("today");
      }
      const label = wordleCompleted.includes(index) ? "Strands" : index + 1;
      button.innerHTML = `<span class="level-number">${label}</span><span class="level-date">${formatShortDate(level.date)}</span>`;
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

  if (getWordleCompletedLevels().includes(index)) {
    openStrands(index);
    return;
  }

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
    restoreSavedGuesses(level.date);
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
  clearSavedGuesses(level.date);
  answer = proposedAnswer;
  setupPanel.classList.add("hidden");
  secretWordInput.value = "";
  setMessage("Guess the five-letter word.");
}

function completeWordleLevel() {
  const wordleCompleted = getWordleCompletedLevels();

  if (!wordleCompleted.includes(activeLevelIndex)) {
    wordleCompleted.push(activeLevelIndex);
    localStorage.setItem(WORDLE_COMPLETED_KEY, JSON.stringify(wordleCompleted));
  }

  clearSavedGuesses(levels[activeLevelIndex].date);
  buildLevels();
}

function completeLevel() {
  const completed = getCompletedLevels();

  if (!completed.includes(activeLevelIndex)) {
    completed.push(activeLevelIndex);
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  }

  clearSavedGuesses(levels[activeLevelIndex].date);
  clearStrandsProgress(levels[activeLevelIndex].date);
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

function closeStrands() {
  strandsModal.classList.remove("open");
  strandsModal.setAttribute("aria-hidden", "true");
  clearStrandsSelection();
}

function closeReward() {
  rewardModal.classList.remove("open");
  rewardModal.setAttribute("aria-hidden", "true");
}

function openStrands(index) {
  activeLevelIndex = index;
  const level = levels[index];

  strandsDate.textContent = `${formatLongDate(level.date)} - ${level.city}`;
  strandsTheme.textContent = `Theme: ${strandsPuzzles[index].theme}`;
  strandsMessage.textContent = "Find the hidden theme words.";
  clearStrandsSelection();
  buildStrandsGrid();
  updateStrandsProgress();
  strandsModal.classList.add("open");
  strandsModal.setAttribute("aria-hidden", "false");
}

function buildStrandsGrid() {
  const puzzle = strandsPuzzles[activeLevelIndex];
  const found = getStrandsFoundWords(levels[activeLevelIndex].date);
  const foundCellIndexes = new Set();

  found.forEach((word) => {
    findWordPath(puzzle.grid, word).forEach((cellIndex) => foundCellIndexes.add(cellIndex));
  });

  strandsGrid.innerHTML = "";
  puzzle.grid.forEach((row, rowIndex) => {
    row.split("").forEach((letter, columnIndex) => {
      const cellIndex = getStrandsCellIndex(rowIndex, columnIndex, puzzle.grid[0].length);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "strands-cell";
      cell.textContent = letter;
      cell.dataset.index = cellIndex;
      cell.dataset.row = rowIndex;
      cell.dataset.column = columnIndex;
      cell.setAttribute("aria-label", letter);

      if (foundCellIndexes.has(cellIndex)) {
        cell.classList.add("found");
      }

      cell.addEventListener("click", () => selectStrandsCell(cellIndex));
      strandsGrid.append(cell);
    });
  });
}

function selectStrandsCell(cellIndex) {
  const alreadySelected = strandsSelection.includes(cellIndex);

  if (alreadySelected) {
    strandsMessage.textContent = "That letter is already selected.";
    return;
  }

  if (strandsSelection.length > 0 && !isTouchingCell(strandsSelection[strandsSelection.length - 1], cellIndex)) {
    strandsMessage.textContent = "Pick a letter that touches the last one.";
    return;
  }

  strandsSelection.push(cellIndex);
  updateStrandsSelection();
}

function updateStrandsSelection() {
  const cells = [...strandsGrid.querySelectorAll(".strands-cell")];
  const selectedWord = getSelectedStrandsWord();

  cells.forEach((cell) => {
    cell.classList.toggle("selected", strandsSelection.includes(Number(cell.dataset.index)));
  });

  strandsSelectionText.textContent = selectedWord || "Pick touching letters.";
}

function submitStrandsWord() {
  const puzzle = strandsPuzzles[activeLevelIndex];
  const level = levels[activeLevelIndex];
  const selectedWord = getSelectedStrandsWord();
  const reversedWord = selectedWord.split("").reverse().join("");
  const matchedWord = puzzle.words.find((word) => word === selectedWord || word === reversedWord);

  if (!matchedWord) {
    strandsMessage.textContent = "That is not one of the hidden theme words.";
    clearStrandsSelection();
    return;
  }

  const found = getStrandsFoundWords(level.date);

  if (found.includes(matchedWord)) {
    strandsMessage.textContent = "You already found that word.";
    clearStrandsSelection();
    return;
  }

  found.push(matchedWord);
  saveStrandsFoundWords(level.date, found);
  strandsMessage.textContent = `Found ${matchedWord}!`;
  clearStrandsSelection();
  buildStrandsGrid();
  updateStrandsProgress();

  if (found.length === puzzle.words.length) {
    strandsMessage.textContent = "Strands done! Photo unlocked.";
    setTimeout(() => {
      closeStrands();
      completeLevel();
    }, 650);
  }
}

function updateStrandsProgress() {
  const puzzle = strandsPuzzles[activeLevelIndex];
  const found = getStrandsFoundWords(levels[activeLevelIndex].date);
  const wordText = puzzle.words.length === 1 ? "word" : "words";

  strandsCount.textContent = `${found.length} of ${puzzle.words.length} ${wordText} found`;
  foundWords.innerHTML = "";

  puzzle.words.forEach((word) => {
    const badge = document.createElement("span");
    badge.className = found.includes(word) ? "found-word found" : "found-word";
    badge.textContent = found.includes(word) ? word : `${word.length} letters`;
    foundWords.append(badge);
  });
}

function getSelectedStrandsWord() {
  const puzzle = strandsPuzzles[activeLevelIndex];
  const columns = puzzle.grid[0].length;

  return strandsSelection.map((cellIndex) => {
    const row = Math.floor(cellIndex / columns);
    const column = cellIndex % columns;
    return puzzle.grid[row][column];
  }).join("");
}

function clearStrandsSelection() {
  strandsSelection = [];

  if (strandsSelectionText && activeLevelIndex !== null) {
    updateStrandsSelection();
  }
}

function isTouchingCell(firstIndex, secondIndex) {
  const columns = strandsPuzzles[activeLevelIndex].grid[0].length;
  const firstRow = Math.floor(firstIndex / columns);
  const firstColumn = firstIndex % columns;
  const secondRow = Math.floor(secondIndex / columns);
  const secondColumn = secondIndex % columns;

  return Math.abs(firstRow - secondRow) <= 1 && Math.abs(firstColumn - secondColumn) <= 1;
}

function findWordPath(grid, word) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  const rows = grid.length;
  const columns = grid[0].length;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      for (const [rowStep, columnStep] of directions) {
        const path = [];

        for (let index = 0; index < word.length; index += 1) {
          const nextRow = row + rowStep * index;
          const nextColumn = column + columnStep * index;

          if (
            nextRow < 0 ||
            nextRow >= rows ||
            nextColumn < 0 ||
            nextColumn >= columns ||
            grid[nextRow][nextColumn] !== word[index]
          ) {
            path.length = 0;
            break;
          }

          path.push(getStrandsCellIndex(nextRow, nextColumn, columns));
        }

        if (path.length === word.length) {
          return path;
        }
      }
    }
  }

  return [];
}

function getStrandsCellIndex(row, column, columns) {
  return row * columns + column;
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
  const submittedGuess = currentGuess;

  result.forEach((state, index) => {
    row.children[index].classList.add(state);
    updateKeyState(currentGuess[index], state);
  });

  saveSubmittedGuess(submittedGuess);

  if (currentGuess === answer) {
    setMessage("Wordle done! Now finish Strands.");
    gameOver = true;
    completeWordleLevel();
    setTimeout(() => {
      closeGame();
      openStrands(activeLevelIndex);
    }, 650);
    return;
  }

  currentRow += 1;
  currentGuess = "";

  if (currentRow >= MAX_GUESSES) {
    setMessage(`Game over. The word was ${answer}.`);
    gameOver = true;
    clearSavedGuesses(levels[activeLevelIndex].date);
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

function restoreSavedGuesses(dateText) {
  const savedGuesses = getSavedGuesses()[dateText] || [];
  const guessesToRestore = savedGuesses.slice(0, MAX_GUESSES);

  guessesToRestore.forEach((guess, rowIndex) => {
    drawSubmittedGuess(rowIndex, guess);
  });

  currentRow = guessesToRestore.length;

  if (currentRow > 0) {
    const guessText = currentRow === 1 ? "guess" : "guesses";
    setMessage(`${currentRow} ${guessText} already used. Keep going.`);
  }
}

function drawSubmittedGuess(rowIndex, guess) {
  const result = scoreGuess(guess, answer);
  const row = document.querySelector(`[data-row="${rowIndex}"]`);

  result.forEach((state, index) => {
    row.children[index].textContent = guess[index];
    row.children[index].className = `tile filled ${state}`;
    updateKeyState(guess[index], state);
  });
}

function saveSubmittedGuess(guess) {
  const level = levels[activeLevelIndex];
  const savedGuesses = getSavedGuesses();
  const levelGuesses = savedGuesses[level.date] || [];

  levelGuesses.push(guess);
  savedGuesses[level.date] = levelGuesses.slice(0, MAX_GUESSES);
  localStorage.setItem(SAVED_GUESSES_KEY, JSON.stringify(savedGuesses));
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

function getWordleCompletedLevels() {
  const oldCompleted = JSON.parse(localStorage.getItem(OLD_COMPLETED_KEY) || "[]");
  const wordleCompleted = JSON.parse(localStorage.getItem(WORDLE_COMPLETED_KEY) || "[]");
  return [...new Set([...oldCompleted, ...wordleCompleted])];
}

function getCustomWords() {
  return JSON.parse(localStorage.getItem(CUSTOM_WORDS_KEY) || "{}");
}

function saveCustomWords(words) {
  localStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(words));
}

function getSavedGuesses() {
  return JSON.parse(localStorage.getItem(SAVED_GUESSES_KEY) || "{}");
}

function clearSavedGuesses(dateText) {
  const savedGuesses = getSavedGuesses();
  delete savedGuesses[dateText];
  localStorage.setItem(SAVED_GUESSES_KEY, JSON.stringify(savedGuesses));
}

function getStrandsProgress() {
  return JSON.parse(localStorage.getItem(STRANDS_PROGRESS_KEY) || "{}");
}

function getStrandsFoundWords(dateText) {
  return getStrandsProgress()[dateText] || [];
}

function saveStrandsFoundWords(dateText, words) {
  const progress = getStrandsProgress();
  progress[dateText] = words;
  localStorage.setItem(STRANDS_PROGRESS_KEY, JSON.stringify(progress));
}

function clearStrandsProgress(dateText) {
  const progress = getStrandsProgress();
  delete progress[dateText];
  localStorage.setItem(STRANDS_PROGRESS_KEY, JSON.stringify(progress));
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
closeStrandsButton.addEventListener("click", closeStrands);
closeRewardButton.addEventListener("click", closeReward);
clearStrandsButton.addEventListener("click", clearStrandsSelection);
submitStrandsButton.addEventListener("click", submitStrandsWord);

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
    closeStrands();
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
