class Chicken extends MoveableObject {
  width = 100;
  height = 90;
  energy = 10;

  /**
   * Offset values for collision detection.
   * @type {Object}
   * @property {number} top - Offset from the top.
   * @property {number} bottom - Offset from the bottom.
   * @property {number} left - Offset from the left.
   * @property {number} right - Offset from the right.
   */
  offset = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Creates an instance of Chicken.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 435;
    this.speed = 0.1 + Math.random() * 0.25;
    this.loadImages(WALKING_CHICKEN);
    this.playAnimation();
  }

  /**
   * Plays the walking animation and moves the chicken left.
   */
  playAnimation() {
    let walkInterval = setInterval(() => {
      if (this.energyHigh) {
        this.animate(WALKING_CHICKEN);
      }
    }, 100);

    let moveInterval = setInterval(() => {
      if (this.energyHigh) {
        this.moveLeft();
      }
    }, 1000 / 120);

    this.checkDeath(walkInterval, moveInterval);
  }

  /**
   * Checks if the chicken's energy is zero and handles the death animation and sound.
   * @param {number} walkInterval - ID of the walking animation interval.
   * @param {number} moveInterval - ID of the movement interval.
   */
  checkDeath(walkInterval, moveInterval) {
    this.check(
      walkInterval,
      moveInterval,
      "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    );
  }
}
