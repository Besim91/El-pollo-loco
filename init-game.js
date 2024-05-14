keyboard = new KEYBOARD();

/**
 * Initializes the game by creating a world instance.
 * @function initGame
 *
 * The canvas element where the game will be rendered.
 * @type {HTMLCanvasElement}
 *
 * The world instance where the game objects exist.
 * @type {World}
 *
 */
function initGame() {
  let canvas = document.getElementById("canvas");
  world = new World(canvas);
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
});
