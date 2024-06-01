class ThrowableObjects extends MoveableObject {
  width = 100;
  height = 100;
  world;
  otherDirection;
  currentImgIndex = 0;
  brokenFlag = false;
  splashInterval = null;
  brokeBottle = new Audio("audio/brokenbottle.mp3");

  /**
   * Creates an instance of ThrowableObjects.
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   * @param {World} world - The game world reference.
   */
  constructor(x, y, world) {
    super().loadImages(THROWABLE_OBJECT);
    this.loadImages(BOTTLE_SPLASH);
    this.world = world;
    this.playAnimation();
    this.throw(x, y);
  }

  /**
   * Plays the rotation animation of the throwable object.
   */
  playAnimation() {
    setInterval(() => {
      this.animate(THROWABLE_OBJECT);
    }, 1000 / 25);
  }

  /**
   * Throws the throwable object.
   * @param {number} x - The x-coordinate to throw the object from.
   * @param {number} y - The y-coordinate to throw the object from.
   */
  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 20;
    this.graviation();
    const throwDirection = this.world.character.otherDirection ? -1 : 1;
    setInterval(() => {
      this.x += 10 * throwDirection;
    }, 1000 / 60);
  }

  /**
   * Plays the splash animation when the object hits the ground.
   */
  splash() {
    if (window.sound) {
      this.brokeBottle.play();
      this.brokeBottle.volume = 0.6;
    }
    this.currentImgIndex = 0;
    if (this.splashInterval) clearInterval(this.splashInterval);
    this.splashInterval = setInterval(() => {
      this.animate(BOTTLE_SPLASH);
      if (this.currentImgIndex >= BOTTLE_SPLASH.length) {
        clearInterval(this.splashInterval);
        this.splashInterval = null;
      }
    }, 1000 / 5);
  }
}
