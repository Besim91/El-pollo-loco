/**
 * Represents a chicken enemy in the game.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
  WALKING_CHICKEN = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  width = 100;
  height = 90;
  energy = 10;

  /**
   * Sound that plays when the chicken dies.
   * @type {Audio}
   */
  deadSound = new Audio("audio/squeak.mp3");

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
    this.loadImages(this.WALKING_CHICKEN);
    this.playAnimation();
  }

  /**
   * Plays the walking animation and moves the chicken left.
   */
  playAnimation() {
    let walkInterval = setInterval(() => {
      if (this.energy > 0) {
        this.animate(this.WALKING_CHICKEN);
      }
    }, 100);

    let moveInterval = setInterval(() => {
      if (this.energy > 0) {
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
    let animationInterval = setInterval(() => {
      if (this.energy == 0) {
        if (window.sound) {
          this.deadSound.play();
          this.deadSound.volume = 0.6;
        }
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        clearInterval(animationInterval);
        clearInterval(walkInterval);
        clearInterval(moveInterval);
      }
    }, 100);
  }
}
