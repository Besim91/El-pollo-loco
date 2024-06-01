class SmallChicken extends MoveableObject {
  width = 60;
  height = 60;
  energy = 10;
  deadSound = new Audio("audio/squeak.mp3");

  /**
   * Offset values for collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 5,
    bottom: 10,
    left: 30,
    right: 40,
  };

  /**
   * Creates an instance of SmallChicken.
   * Sets initial properties, loads images, and starts animations.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 470;
    this.speed = 0.05 + Math.random() * 0.25;
    this.loadImages(WALKING_SMALLCHICKEN);
    this.playAnimation();
    this.moveLeft();
  }

  /**
   * Plays the walking animation of the small chicken and continuously moves it left.
   * Checks for death and stops animations if energy is depleted.
   */
  playAnimation() {
    let walkInterval = setInterval(() => {
      if (this.energy > 0) {
        this.animate(WALKING_SMALLCHICKEN);
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
   * Checks if the small chicken has died, stops animations and moves if it has.
   * @param {number} walkInterval - The interval ID for walking animation.
   * @param {number} moveInterval - The interval ID for continuous movement.
   */
  checkDeath(walkInterval, moveInterval) {
    let animationInterval = setInterval(() => {
      if (this.energy == 0) {
        if (window.sound) {
          this.deadSound.play();
          this.deadSound.volume = 0.6;
        }
        this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
        clearInterval(animationInterval);
        clearInterval(walkInterval);
        clearInterval(moveInterval);
      }
    }, 100);
  }
}
