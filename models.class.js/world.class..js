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
  }

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

  runGame() {
    this.intervals.push(
      setInterval(() => {
        this.checkCollisions();
        this.checkThrowObjects();
      }, 10)
    );
  }

  checkThrowObjects() {
    if (this.canThrowObject()) {
      this.createAndThrowObject();
      this.setThrowCooldown();
    }
  }

  canThrowObject() {
    return (
      this.keyboard.D == true &&
      this.character.throwablebottles > 0 &&
      !this.character.throwCooldown
    );
  }

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

  setThrowCooldown() {
    this.character.throwCooldown = true;
    setTimeout(() => {
      this.character.throwCooldown = false;
    }, 1000);
  }

  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkBottleCollisions();
    this.checkCoinCollisions();
    this.checkThrowableObjectCollisions();
  }

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

  checkBottleCollisions() {
    this.checkSalsaBottleCollisions(this.level.salsaBottleLeft);
    this.checkSalsaBottleCollisions(this.level.salsaBottleRight);
  }

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

  playBottleSound() {
    if (window.sound) {
      this.bottleSound.play();
      this.bottleSound.volume = 0.4;
    }
  }

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

  playCoinSound() {
    if (window.sound) {
      this.coinSound.play();
    }
  }

  removeCoinFromLevel(coin) {
    let index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.level.coins.splice(index, 1);
    }
  }

  checkThrowableObjectCollisions() {
    this.throwableObject.forEach((bottle) => {
      this.checkThrowableObjectCollisionWithGround(bottle);
      this.checkThrowableObjectCollisionWithEnemies(bottle);
    });
  }

  checkThrowableObjectCollisionWithGround(bottle) {
    if (bottle.y >= 430) {
      bottle.brokenFlag = true;
      this.removeThrowableObject(bottle);
      bottle.splash();
    }
  }

  checkThrowableObjectCollisionWithEnemies(bottle) {
    if (!bottle.brokenFlag) {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.handleThrowableObjectCollisionWithEnemy(bottle, enemy);
        }
      });
    }
  }

  handleThrowableObjectCollisionWithEnemy(bottle, enemy) {
    bottle.brokenFlag = true;
    this.removeThrowableObject(bottle);
    bottle.splash();
    enemy.isInjured = false;
    this.updateEndbossStatusBar(enemy);
    enemy.hit(15);
    this.removeEnemyIfNotEndboss(enemy);
  }

  updateEndbossStatusBar(enemy) {
    if (enemy instanceof Endboss) {
      this.statusbarEndboss.setPercentage(enemy.energy);
    }
  }

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

  removeThrowableObject(bottle) {
    setTimeout(() => {
      let index = this.throwableObject.indexOf(bottle);
      this.throwableObject.splice(index, 1);
    }, 20);
  }

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

  setRequestAnimationFrame() {
    let drawRef = requestAnimationFrame(() => {
      this.drawGame();
    });
    this.animationFrames.push(drawRef);
  }

  drawObjectOnMap(object) {
    object.forEach((e) => {
      this.drawElementOnMap(e);
    });
  }

  drawElementOnMap(mo) {
    this.flipImage(mo);
    mo.draw(this.ctx);
    this.flipImageBack(mo);
  }

  flipImage(mo) {
    if (mo.otherDirection == true) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  }

  flipImageBack(mo) {
    if (mo.otherDirection == true) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

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

  initializeResetGame() {
    this.setWorld();
    this.drawGame();
    this.runGame();
  }
}
