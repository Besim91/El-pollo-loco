class KEYBOARD {
  /**
   * Creates an instance of the KEYBOARD class and initializes keyboard and touch event monitoring.
   */
  constructor() {
    this.RIGHT = false;
    this.LEFT = false;
    this.UP = false;
    this.DOWN = false;
    this.SPACE = false;
    this.D = false;

    this.keyProcess();
    this.detectTouchPress();
  }

  /**
   * Checks keyboard inputs.
   */
  keyProcess() {
    this.checkKeyDown();
    this.checkKeyUp();
  }

  /**
   * Checks if keys are being pressed.
   */
  detectTouchPress() {
    this.checkStart();
    this.checkEnd();
  }

  /**
   * Checks key press events.
   */
  checkKeyDown() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 37) {
        this.LEFT = true;
      }
      if (e.keyCode == 38) {
        this.UP = true;
      }
      if (e.keyCode == 39) {
        this.RIGHT = true;
      }
      if (e.keyCode == 40) {
        this.DOWN = true;
      }
      if (e.keyCode == 32) {
        this.SPACE = true;
      }
      if (e.keyCode == 68) {
        this.D = true;
      }
    });
  }

  /**
   * Checks key release events.
   */
  checkKeyUp() {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 37) {
        this.LEFT = false;
      }
      if (e.keyCode == 38) {
        this.UP = false;
      }
      if (e.keyCode == 39) {
        this.RIGHT = false;
      }
      if (e.keyCode == 40) {
        this.DOWN = false;
      }
      if (e.keyCode == 32) {
        this.SPACE = false;
      }
      if (e.keyCode == 68) {
        this.D = false;
      }
    });
  }

  /**
   * Checks the start of touch events.
   */
  checkStart() {
    window.addEventListener("touchstart", (e) => {
      if (e.target.id == "arrowRight") {
        this.RIGHT = true;
      }
      if (e.target.id == "arrowLeft") {
        this.LEFT = true;
      }
      if (e.target.id == "jump") {
        this.SPACE = true;
      }
      if (e.target.id == "throw") {
        this.D = true;
      }
    });
  }

  /**
   * Checks the end of touch events.
   */
  checkEnd() {
    window.addEventListener("touchend", (e) => {
      if (e.target.id == "arrowRight") {
        this.RIGHT = false;
      }
      if (e.target.id == "arrowLeft") {
        this.LEFT = false;
      }
      if (e.target.id == "jump") {
        this.SPACE = false;
      }
      if (e.target.id == "throw") {
        this.D = false;
      }
    });
  }
}
