const categorySelect = document.getElementById("admin-category");
const questionInput = document.getElementById("question-text");
const optionsInput = document.getElementById("options-text");
const correctAnswerInput = document.getElementById("correct-answer");
const addQuestionBtn = document.getElementById("add-question");
const questionList = document.getElementById("question-list");

function loadQuestionsForCategory() {
  const category = categorySelect.value;
  const allQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || {};
  const categoryQuestions = allQuestions[category] || [];

  questionList.innerHTML = "";
  categoryQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-item";
    questionDiv.innerHTML = `
            <p><strong>${q.text}</strong></p>
            <p>Options: ${q.options.join(", ")}</p>
            <p>Correct: ${q.answer}</p>
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
    questionList.appendChild(questionDiv);
  });
}