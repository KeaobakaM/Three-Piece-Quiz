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
