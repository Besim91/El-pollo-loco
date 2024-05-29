keyboard = new KEYBOARD();
let world;

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

function openImpressum() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("impressum").classList.remove("d-none");
}

function closeImpressum() {
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("impressum").classList.add("d-none");
}
function openGameplayInfo() {
  document.getElementById("canvas").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("gameplay").classList.remove("d-none");
}

function closeGameplayInfo() {
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("gameplay").classList.add("d-none");
}

function openFullScreen() {
  var elem = document.getElementById("canvas");

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function clearAllIntervalsAndFrames() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
    cancelAnimationFrame(i);
  }
}
