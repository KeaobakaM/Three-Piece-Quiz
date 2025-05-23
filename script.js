let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let questions = [];
let username = "";

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const usernameInput = document.getElementById("username");
const categorySelect = document.getElementById("category");
const finalScoreElement = document.getElementById("final-score");
const highScoresElement = document.getElementById("high-scores");

function loadQuestions(category) {
  const savedQuestions =
    JSON.parse(localStorage.getItem("quizQuestions")) || {};
  return savedQuestions[category] || [];
}

startBtn.addEventListener("click", () => {
  username = usernameInput.value.trim() || "Anonymous";
  usernameInput.value = "";
  const category = categorySelect.value;
  const limits = JSON.parse(localStorage.getItem("questionLimits")) || {};
  const questionLimit = limits[category] || 10;

  questions = shuffleArray(loadQuestions(category)).slice(0, questionLimit);

  if (questions.length === 0) {
    alert("No questions available for this category. Please try another one.");
    return;
  }

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  resetState();
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const question = questions[currentQuestion];
  questionElement.textContent = question.text;

  const shuffledOptions = shuffleArray([...question.options]);

  shuffledOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () =>
      selectAnswer(option, question.answer)
    );
    optionsElement.appendChild(button);
  });

  progressElement.style.width = `${
    (currentQuestion / questions.length) * 100
  }%`;

  timeLeft = 30;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function updateTimer() {
  timerElement.textContent = `Time: ${timeLeft}s`;
}

function resetState() {
  clearInterval(timer);
  nextBtn.classList.add("hidden");
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function selectAnswer(selectedOption, correctAnswer) {
  clearInterval(timer);
  const options = document.querySelectorAll(".option-btn");
  let isCorrect = false;

  options.forEach((option) => {
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
    if (
      option.textContent === selectedOption &&
      selectedOption !== correctAnswer
    ) {
      option.classList.add("wrong");
    }
    option.disabled = true;
  });

  if (selectedOption === correctAnswer) {
    score++;
    isCorrect = true;
  }

  scoreElement.textContent = `Score: ${score}`;
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScoreElement.textContent = `${username}, your score is ${score} out of ${questions.length}`;

  saveHighScore(username, score, questions.length);
  displayHighScores();
}

function saveHighScore(name, score, total) {
  name = name.trim() || "Anonymous";
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const newScore = {
    name,
    score,
    total,
    timestamp: Date.now(),
  };

  highScores.push(newScore);

  const uniqueScores = highScores.filter(
    (score, index, self) =>
      index ===
      self.findIndex(
        (s) =>
          s.name === score.name &&
          s.score === score.score &&
          s.total === score.total
      )
  );

  const sortedScores = uniqueScores
    .sort((a, b) => {
      const aRatio = a.score / a.total;
      const bRatio = b.score / b.total;
      if (bRatio !== aRatio) return bRatio - aRatio;
      return b.timestamp - a.timestamp;
    })
    .slice(0, 5);

  localStorage.setItem("highScores", JSON.stringify(sortedScores));
}

function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b.score - a.score);

  if (highScores.length > 0) {
    highScoresElement.innerHTML = "<h2>High Scores</h2>";
    highScores.slice(0, 5).forEach((score, index) => {
      highScoresElement.innerHTML += `
              <p>${index + 1}. ${score.name}: ${score.score}/${score.total}</p>
          `;
    });
  }
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}