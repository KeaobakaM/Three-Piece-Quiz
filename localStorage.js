window.deleteQuestion = function (index) {
  const category = categorySelect.value;
  const allQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || {};

  if (allQuestions[category] && allQuestions[category][index]) {
    allQuestions[category].splice(index, 1);
    localStorage.setItem("quizQuestions", JSON.stringify(allQuestions));
    loadQuestionsForCategory();
  }
};

function saveQuestionLimit(category, limit) {
  const limits = JSON.parse(localStorage.getItem("questionLimits")) || {};
  limits[category] = limit;
  localStorage.setItem("questionLimits", JSON.stringify(limits));
}

function loadQuestionLimit(category) {
  const limits = JSON.parse(localStorage.getItem("questionLimits")) || {};
  return limits[category] || 10;
}

document.getElementById("question-limit").addEventListener("change", (e) => {
  const category = document.getElementById("admin-category").value;
  saveQuestionLimit(category, parseInt(e.target.value));
});
