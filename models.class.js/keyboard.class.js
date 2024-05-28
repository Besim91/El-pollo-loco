class KEYBOARD {
  RIGHT = false;
  LEFT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.keyProcess();
    this.detectTouchPress();
  }

  keyProcess() {
    this.checkKeyDown();
    this.checkKeyUp();
  }

  detectTouchPress() {
    this.checkStart();
    this.checkEnd();
  }

  checkKeyDown() {
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
  }
  checkKeyUp() {
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

  checkStart() {
    window.addEventListener("touchstart", (e) => {
      if (e.target.id == "arrowRight") {
        keyboard.RIGHT = true;
      }
      if (e.target.id == "arrowLeft") {
        keyboard.LEFT = true;
      }
      if (e.target.id == "jump") {
        keyboard.SPACE = true;
      }
      if (e.target.id == "throw") {
        keyboard.D = true;
      }
    });
  }

  checkEnd() {
    window.addEventListener("touchend", (e) => {
      if (e.target.id == "arrowRight") {
        keyboard.RIGHT = false;
      }
      if (e.target.id == "arrowLeft") {
        keyboard.LEFT = false;
      }
      if (e.target.id == "jump") {
        keyboard.SPACE = false;
      }
      if (e.target.id == "throw") {
        keyboard.D = false;
      }
    });
  }
}
