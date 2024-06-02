class World {
  ctx;
  character = new Character();
  level = level1;
  canvas;
  keyboard;
  cameraX = 0;
  statusbar = new Statusbar();
  statusbarBottle = new StatusbarBottle();
  statusbarCoin = new StatusbarCoin();
  statusbarEndboss = new StatusbarEndboss();
  throwableObject = [];
  intervals = [];
  animationFrames = [];
  bottleSound = new Audio("audio/bottle.mp3");
  coinSound = new Audio("audio/coin.mp3");
  backgroundMusic = new Audio("audio/background.mp3");
  backgroundAnimalSound = new Audio("audio/animalbackgroundnoise.mp3");
  swing = new Audio("audio/swing.mp3");

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  /**
   * Initializes the game world.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.setWorld();
    this.drawGame();
    this.runGame();
    this.intervals.push(
      setInterval(() => {
        this.playBackgroundMusic();
      }, 150)
    );
  }

  /**
   * Plays or pauses the background music based on the global sound setting.
   */
  playBackgroundMusic() {
    if (window.sound) {
      this.backgroundMusic.play();
      this.backgroundMusic.volume = 0.4;
      this.backgroundAnimalSound.play();
      this.backgroundAnimalSound.volume = 0.4;
    } else {
      this.backgroundMusic.pause();
      this.backgroundAnimalSound.pause();
    }
  }

  /**
   * Runs the game by setting intervals for collision checks and throwable objects checks.
   */
  runGame() {
    this.intervals.push(
      setInterval(() => {
        this.checkCollisions();
        this.checkThrowObjects();
      }, 10)
    );
  }

  /**
   * Checks if the character can throw an object and creates and throws it if possible.
   */
  checkThrowObjects() {
    if (this.canThrowObject()) {
      this.createAndThrowObject();
      this.setThrowCooldown();
    }
  }

  /**
   * Determines if the character can throw an object.
   * @returns {boolean} True if the character can throw an object, false otherwise.
   */
  canThrowObject() {
    return (
      this.keyboard.D == true &&
      this.character.throwablebottles > 0 &&
      !this.character.throwCooldown
    );
  }

  /**
   * Creates and throws a bottle object.
   */
  createAndThrowObject() {
    this.swing.currentTime = 0;
    if (window.sound) {
      this.swing.play();
    }
    let bottle = new ThrowableObjects(this.character.x, this.character.y, this);
    this.throwableObject.push(bottle);
    if (this.character.throwablebottles > 0) {
      this.character.throwablebottles -= 10;
    }
    this.character.sleepingSound.pause();
  }

  /**
   * Sets a cooldown period after throwing an object.
   */
  setThrowCooldown() {
    this.character.throwCooldown = true;
    setTimeout(() => {
      this.character.throwCooldown = false;
    }, 1000);
  }

  /**
   * Checks for various types of collisions in the game.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkBottleCollisions();
    this.checkCoinCollisions();
    this.checkThrowableObjectCollisions();
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        this.statusbar.setPercentage(this.character.energy);
        this.character.pushPepeBack(
          enemy.x,
          enemy.width,
          enemy.y,
          enemy,
          index
        );
      }
    });
  }

  /**
   * Checks for collisions between the character and salsa bottles.
   */
  checkBottleCollisions() {
    this.checkSalsaBottleCollisions(this.level.salsaBottleLeft);
    this.checkSalsaBottleCollisions(this.level.salsaBottleRight);
  }

  /**
   * Checks for collisions between the character and a list of salsa bottles.
   * @param {Array<Object>} bottles - The list of salsa bottles to check.
   */
  checkSalsaBottleCollisions(bottles) {
    bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.playBottleSound();
        this.character.takeBottle();
        this.statusbarBottle.setPercentage(this.character.collectedBottles);
        this.removeBottleFromLevel(bottle);
      }
    });
  }

  /**
   * Plays the bottle collection sound if sound is enabled.
   */
  playBottleSound() {
    if (window.sound) {
      this.bottleSound.play();
      this.bottleSound.volume = 0.4;
    }
  }

  /**
   * Removes a collected bottle from the level.
   * @param {Object} bottle - The bottle to remove.
   */
  removeBottleFromLevel(bottle) {
    let index = this.level.salsaBottleLeft.indexOf(bottle);
    if (index !== -1) {
      this.level.salsaBottleLeft.splice(index, 1);
    } else {
      index = this.level.salsaBottleRight.indexOf(bottle);
      if (index !== -1) {
        this.level.salsaBottleRight.splice(index, 1);
      }
    }
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.playCoinSound();
        this.character.takeCoin();
        this.statusbarCoin.setPercentage(this.character.collectedCoins);
        this.removeCoinFromLevel(coin);
      }
    });
  }

  /**
   * Plays the coin collection sound if sound is enabled.
   */
  playCoinSound() {
    if (window.sound) {
      this.coinSound.play();
    }
  }

  /**
   * Removes a collected coin from the level.
   * @param {Object} coin - The coin to remove.
   */
  removeCoinFromLevel(coin) {
    let index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.level.coins.splice(index, 1);
    }
  }

  /**
   * Checks for collisions involving throwable objects.
   */
  checkThrowableObjectCollisions() {
    this.throwableObject.forEach((bottle) => {
      this.checkThrowableObjectCollisionWithGround(bottle);
      this.checkThrowableObjectCollisionWithEnemies(bottle);
    });
  }

  /**
   * Checks for collisions between a throwable object and the ground.
   * @param {ThrowableObjects} bottle - The throwable object to check.
   */
  checkThrowableObjectCollisionWithGround(bottle) {
    if (bottle.y >= 430) {
      bottle.brokenFlag = true;
      this.removeThrowableObject(bottle);
      bottle.splash();
    }
  }

  /**
   * Checks for collisions between a throwable object and enemies.
   * @param {ThrowableObjects} bottle - The throwable object to check.
   */
  checkThrowableObjectCollisionWithEnemies(bottle) {
    if (!bottle.brokenFlag) {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.handleThrowableObjectCollisionWithEnemy(bottle, enemy);
        }
      });
    }
  }

  /**
   * Handles the collision between a throwable object and an enemy.
   * @param {ThrowableObjects} bottle - The throwable object.
   * @param {Object} enemy - The enemy involved in the collision.
   */
  handleThrowableObjectCollisionWithEnemy(bottle, enemy) {
    bottle.brokenFlag = true;
    this.removeThrowableObject(bottle);
    bottle.splash();
    enemy.isInjured = false;
    this.updateEndbossStatusBar(enemy);
    enemy.hit(15);
    this.removeEnemyIfNotEndboss(enemy);
  }

  /**
   * Updates the end boss status bar based on the enemy's energy.
   * @param {Object} enemy - The enemy to update the status bar for.
   */
  updateEndbossStatusBar(enemy) {
    if (enemy instanceof Endboss) {
      this.statusbarEndboss.setPercentage(enemy.energy);
    }
  }

  /**
   * Removes an enemy from the level if it is not the end boss.
   * @param {Object} enemy - The enemy to remove.
   */
  removeEnemyIfNotEndboss(enemy) {
    if (!(enemy instanceof Endboss)) {
      let index = this.level.enemies.indexOf(enemy);
      if (index !== -1) {
        setTimeout(() => {
          this.level.enemies.splice(index, 1);
        }, 2000);
      }
    }
  }

  /**
   * Removes a throwable object from the game.
   * @param {ThrowableObjects} bottle - The throwable object to remove.
   */
  removeThrowableObject(bottle) {
    setTimeout(() => {
      let index = this.throwableObject.indexOf(bottle);
      this.throwableObject.splice(index, 1);
    }, 20);
  }

  /**
   * Draws the entire game on the canvas.
   */
  drawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawObjectOnMap(this.level.background);
    this.drawElementOnMap(this.character);
    this.drawObjectOnMap(this.level.enemies);
    this.drawObjectOnMap(this.throwableObject);
    this.drawObjectOnMap(this.level.clouds);
    this.drawObjectOnMap(this.level.coins);
    this.drawObjectOnMap(this.level.salsaBottleLeft);
    this.drawObjectOnMap(this.level.salsaBottleRight);
    this.ctx.translate(-this.cameraX, 0);
    this.drawElementOnMap(this.statusbar);
    this.drawElementOnMap(this.statusbarBottle);
    this.drawElementOnMap(this.statusbarCoin);
    this.drawElementOnMap(this.statusbarEndboss);
    this.ctx.translate(this.cameraX, 0);
    this.ctx.translate(-this.cameraX, 0);
    this.setRequestAnimationFrame();
    this.level.respawnEntities(this.character.x);
  }

  /**
   * Requests the next animation frame for drawing the game.
   */
  setRequestAnimationFrame() {
    let drawRef = requestAnimationFrame(() => {
      this.drawGame();
    });
    this.animationFrames.push(drawRef);
  }

  /**
   * Draws a list of objects on the map.
   * @param {Array<Object>} object - The objects to draw.
   */
  drawObjectOnMap(object) {
    object.forEach((e) => {
      this.drawElementOnMap(e);
    });
  }

  /**
   * Draws a single element on the map.
   * @param {Object} mo - The element to draw.
   */
  drawElementOnMap(mo) {
    this.flipImage(mo);
    mo.draw(this.ctx);
    this.flipImageBack(mo);
  }

  /**
   * Flips an image horizontally if needed.
   * @param {Object} mo - The element whose image needs to be flipped.
   */
  flipImage(mo) {
    if (mo.otherDirection == true) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  }

  /**
   * Flips the image back to its original state.
   * @param {Object} mo - The element whose image was flipped.
   */
  flipImageBack(mo) {
    if (mo.otherDirection == true) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  /**
   * Resets the game to its initial state.
   */
  resetGame() {
    this.character = new Character();
    this.level = level1;
    this.cameraX = 0;
    this.statusbar = new Statusbar();
    this.statusbarBottle = new StatusbarBottle();
    this.statusbarCoin = new StatusbarCoin();
    this.statusbarEndboss = new StatusbarEndboss();
    this.throwableObject = [];
    this.backgroundMusic.pause();
    this.backgroundAnimalSound.pause();
    this.backgroundMusic.currentTime = 0;
    this.backgroundAnimalSound.currentTime = 0;
    this.initializeResetGame();
  }

  /**
   * Initializes the game after resetting it.
   */
  initializeResetGame() {
    this.setWorld();
    this.drawGame();
    this.runGame();
  }
}
