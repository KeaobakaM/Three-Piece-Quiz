startBtn.addEventListener("click", () => {
  username = usernameInput.value.trim() || "Anonymous";
  usernameInput.value = '';
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
});
