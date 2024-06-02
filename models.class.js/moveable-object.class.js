class MoveableObject extends DrawableObject {
  energy = 100;
  lastHit = 0;
  acceleration = 4;
  speedY = 0;
  collectedBottles = 0;
  throwablebottles = 0;
  collectedCoins = 0;
  isInjured = false;
  enemyCrushed = false;
  offsetX = 0;
  offsetY = 0;
  lastMove;
  otherDirection;
  crushedFromAbove = false;

  deadSound = new Audio("audio/squeak.mp3");

  /**
   * Offset values for collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Audio element for the end of the game.
   * @type {HTMLAudioElement}
   */
  gameOver = new Audio("audio/gameover.mp3");

  /**
   * Checks if the object collides with another object.
   * @param {DrawableObject} obj - The other object.
   * @returns {boolean} - Indicates whether a collision is occurring.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * Runs a cycle for the animation.
   * @param {string[]} arr - Array of image paths.
   */
  oneCycle(arr) {
    for (let i = 0; i < arr.length; i++) {
      let path = arr[i];
      this.img = this.imageChache[path];
    }
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Executes a jump of the object.
   */
  jump() {
    this.speedY = 40;
    this.crushedFromAbove = false;
  }

  /**
   * Causes damage to the object.
   * @param {number} damage - The amount of damage.
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} - Indicates whether the object is dead.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the object is injured.
   * @returns {boolean} - Indicates whether the object is injured.
   */
  isHurt() {
    let passedTime = new Date().getTime() - this.lastHit;
    let passedTimeSek = passedTime / 1000;
    return passedTimeSek < 0.5;
  }

  /**
   * Collects a bottle.
   */
  takeBottle() {
    this.collectedBottles += 10;
    this.throwablebottles += 10;
  }

  /**
   * Collects a coin.
   */
  takeCoin() {
    this.collectedCoins += 10;
  }

  /**
   * Applies gravity to the object.
   */
  graviation() {
    setInterval(() => {
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (!this.isInAir() && this.y !== 235) {
        this.y = 235;
      }
    }, 60);
  }

  /**
   * Checks if the object is in the air.
   * @returns {boolean} - Indicates whether the object is in the air.
   */
  isInAir() {
    if (this instanceof ThrowableObjects) {
      return true;
    } else {
      return this.y < 220;
    }
  }

  /**
   * Inflicts damage on an enemy.
   */
  hitEnemy() {
    this.energy -= 15;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Calculates the time difference between the current time and the last recorded move time.
   * @returns {number} The time difference in seconds.
   */
  calculateTimeDiff() {
    let timeDiff = this.currentTime - this.lastMove;
    return timeDiff / 1000;
  }

  /**
   * Records the current time as the last key press time.
   */
  safeLastKeyPress() {
    this.lastMove = new Date().getTime();
  }

  /**
   * Plays the walking sound if the character is not in the air.
   */
  playAudioOf(x) {
    x.volume = 0.5;
    x.play();
  }

  /**
   * Monitors the energy level and handles enemy animation and audio.
   * If the energy level drops to 0, it plays a sound, changes the image,
   * and clears the animation and movement intervals.
   *
   * @param {number} walkInterval - The interval ID for walking animation.
   * @param {number} moveInterval - The interval ID for movement animation.
   * @param {string} img - The image URL or path to load when energy is 0.
   */
  check(walkInterval, moveInterval, img) {
    let animationInterval = setInterval(() => {
      if (this.energy == 0) {
        if (window.sound) {
          this.playAudioOf(this.deadSound);
        }
        this.loadImage(img);
        clearInterval(animationInterval);
        clearInterval(walkInterval);
        clearInterval(moveInterval);
      }
    }, 100);
  }

  /**
   * Checks if the energy level is above 0.
   *
   * @returns {boolean} True if the energy level is greater than 0, otherwise false.
   */
  energyHigh() {
    return this.energy > 0;
  }
}
