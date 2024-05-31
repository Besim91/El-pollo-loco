/**
 * Shows the "Impressum" section by hiding the game canvas and start screen,
 * and displaying the "Impressum" section.
 */
function openImpressum() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("impressum").classList.remove("d-none");
}

/**
 * Hides the "Impressum" section and shows the start screen.
 */
function closeImpressum() {
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("impressum").classList.add("d-none");
}

/**
 * Shows the gameplay information section by hiding the game canvas and start screen,
 * and displaying the gameplay information section.
 */
function openGameplayInfo() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("gameplay").classList.remove("d-none");
}

/**
 * Hides the gameplay information section and shows the start screen.
 */
function closeGameplayInfo() {
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("gameplay").classList.add("d-none");
}
