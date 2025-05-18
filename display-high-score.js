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