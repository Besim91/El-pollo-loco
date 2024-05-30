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
