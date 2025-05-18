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
