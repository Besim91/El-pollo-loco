keyboard = new KEYBOARD();
let world;

function initGame() {
  let canvas = document.getElementById("canvas");
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

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
