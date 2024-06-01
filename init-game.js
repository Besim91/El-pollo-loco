keyboard = new KEYBOARD();
let world;

/**
 * Initializes the game by setting up the canvas, initializing the game level,
 * and setting up the world. This function also manages the visibility of different
 * screen elements to transition from the start screen to the game view.
 */
function initGame() {
  let canvas = document.getElementById("canvas");
  initLevel();
  this.world = new World(canvas, keyboard);

  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("endScreen").classList.add("d-none");
  document.getElementById("openScreenImg").classList.remove("d-none");
  document.getElementById("gameControls").classList.remove("d-none");
}

/**
 * Opens the game canvas in full screen mode. It handles different browser
 * implementations of the full screen request.
 */
function openFullScreen() {
  var elem = document.getElementById("canvasFrame");

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // IE11
    elem.msRequestFullscreen();
  }
}
