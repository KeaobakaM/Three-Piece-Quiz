categorySelect.addEventListener("change", () => {
  const limit = loadQuestionLimit(categorySelect.value);
  document.getElementById("question-limit").value = limit;
});

categorySelect.addEventListener("change", loadQuestionsForCategory);
loadQuestionsForCategory();