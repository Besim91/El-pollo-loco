function restartGame() {
  clearAllIntervalsAndFrames();
  if (this.world) {
    this.world.resetGame();
  }
  initLevel();
  initGame();

  document.getElementById("endScreen").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
}

function clearAllIntervalsAndFrames() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
    cancelAnimationFrame(i);
  }
}
