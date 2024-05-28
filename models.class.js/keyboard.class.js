class KEYBOARD {
  RIGHT = false;
  LEFT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.keyProcess();
  }

  keyProcess() {
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
  }

  detectTouchPress() {
    document.getElementById("arrowLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });

    document.getElementById("arrowLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document
      .getElementById("arrowRight")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });

    document.getElementById("arrowRight").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });

    document.getElementById("jump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });

    document.getElementById("jump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });

    document.getElementById("throw").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });

    document.getElementById("throw").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}
