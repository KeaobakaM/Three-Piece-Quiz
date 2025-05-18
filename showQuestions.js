function showQuestion() {
  resetState();
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const question = questions[currentQuestion];
  questionElement.textContent = question.text;

  // Shuffle options
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
}
