const categorySelect = document.getElementById("admin-category");
const questionInput = document.getElementById("question-text");
const optionsInput = document.getElementById("options-text");
const correctAnswerInput = document.getElementById("correct-answer");
const addQuestionBtn = document.getElementById("add-question");
const questionList = document.getElementById("question-list");

addQuestionBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const questionText = questionInput.value.trim();
  const optionsText = optionsInput.value.trim();
  const correctIndex = parseInt(correctAnswerInput.value);

  if (!questionText || !optionsText) {
    alert("Please fill in all fields");
    return;
  }

  const options = optionsText.split(",").map((opt) => opt.trim());
  if (correctIndex < 0 || correctIndex >= options.length) {
    alert("Invalid correct answer index");
    return;
  }

  const newQuestion = {
    text: questionText,
    options: options,
    answer: options[correctIndex],
  };


  const allQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || {};
  if (!allQuestions[category]) {
    allQuestions[category] = [];
  }

  allQuestions[category].push(newQuestion);
  localStorage.setItem("quizQuestions", JSON.stringify(allQuestions));

 
  questionInput.value = "";
  optionsInput.value = "";
  correctAnswerInput.value = "0";
  loadQuestionsForCategory();
});