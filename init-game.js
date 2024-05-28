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
}

function restartGame() {
  initGame();
  if (this.world) {
    this.world.resetGame(); // Hier das Spiel zurücksetzen, wenn es bereits existiert
  }
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
