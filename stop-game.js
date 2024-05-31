/**
 * Restarts the game by clearing all intervals and animation frames,
 * resetting the game world if it exists, reinitializing the level and game,
 * and updating the visibility of screen elements to show the game canvas.
 */
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

/**
 * Clears all intervals, timeouts, and animation frames to ensure no lingering
 * callbacks or animations are running. This helps in resetting the game state completely.
 */
function clearAllIntervalsAndFrames() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
    cancelAnimationFrame(i);
  }
}
