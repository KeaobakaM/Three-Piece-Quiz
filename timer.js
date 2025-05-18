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
