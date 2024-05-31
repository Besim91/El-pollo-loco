/**
 * Class representing a movable object.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
  /**
   * Creates an instance of the MoveableObject class.
   */
  constructor() {
    super();
    this.energy = 100;
    this.lastHit = 0;
    this.acceleration = 4;
    this.speedY = 0;
    this.collectedBottles = 0;
    this.throwablebottles = 0;
    this.collectedCoins = 0;
    this.isInjured = false;
    this.enemyCrushed = false;
    this.offsetX = 0;
    this.offsetY = 0;

    /**
     * Offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    this.offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    /**
     * Audio element for the end of the game.
     * @type {HTMLAudioElement}
     */
    this.gameOver = new Audio("audio/gameover.mp3");
  }

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
}
