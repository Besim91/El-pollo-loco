class World {
  ctx;
  character = new Character();
  level = level1;
  canvas; //Declare for clearRect
  keyboard;
  cameraX = 0;
  statusbar = new Statusbar();
  statusbarBottle = new StatusbarBottle();
  statusbarCoin = new StatusbarCoin();
  statusbarEndboss = new StatusbarEndboss();
  throwableObject = [];
  intervals = []; // Array to store interval references
  animationFrames = []; // Array to store animation frame references

  bottleSound = new Audio("audio/bottle.mp3");
  coinSound = new Audio("audio/coin.mp3");
  backgroundMusic = new Audio("audio/background.mp3");
  backgroundAnimalSound = new Audio("audio/animalbackgroundnoise.mp3");
  swing = new Audio("audio/swing.mp3");

  setWorld() {
    this.character.world = this; //Needed for access from character to keyboard. World is defined in the class character
  }

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.canvas = canvas; //Declare canvas as global variable to use it for clearRect.
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
    if (
      this.keyboard.D == true &&
      this.character.throwablebottles > 0 &&
      !this.character.throwCooldown
    ) {
      this.swing.currentTime = 0;
      if (window.sound) {
        this.swing.play();
      }

      let bottle = new ThrowableObjects(
        this.character.x,
        this.character.y,
        this
      );
      this.throwableObject.push(bottle);
      if (this.character.throwablebottles > 0) {
        this.character.throwablebottles -= 10;
      }

      this.character.sleepingSound.pause();

      this.character.throwCooldown = true;
      setTimeout(() => {
        this.character.throwCooldown = false;
      }, 1000); //
    }
  }

  checkCollisions() {
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

    this.level.salsaBottleLeft.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (window.sound) {
          this.bottleSound.play();
          this.bottleSound.volume = 0.4;
        }
        this.character.takeBottle();
        this.statusbarBottle.setPercentage(this.character.collectedBottles);
        this.bottleSound.currentTime = 0;
        let index = this.level.salsaBottleLeft.indexOf(bottle);
        this.level.salsaBottleLeft.splice(index, 1);
      }
    });

    this.level.salsaBottleRight.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        if (window.sound) {
          this.bottleSound.play();
          this.bottleSound.volume = 0.4;
        }
        this.character.takeBottle();
        this.statusbarBottle.setPercentage(this.character.collectedBottles);
        this.bottleSound.currentTime = 0;
        let index = this.level.salsaBottleRight.indexOf(bottle);
        this.level.salsaBottleRight.splice(index, 1);
      }
    });

    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        if (window.sound) {
          this.coinSound.play();
        }
        this.character.takeCoin();
        this.statusbarCoin.setPercentage(this.character.collectedCoins);
        this.coinSound.currentTime = 0;
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
      }
    });

    this.throwableObject.forEach((bottle) => {
      if (bottle.y >= 430) {
        bottle.brokenFlag = true;
        setTimeout(() => {
          let index = this.throwableObject.indexOf(bottle);
          this.throwableObject.splice(index, 1);
        }, 20);
        bottle.splash();
      }
    });

    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (!bottle.brokenFlag && bottle.isColliding(enemy)) {
          bottle.brokenFlag = true;
          setTimeout(() => {
            let index = this.throwableObject.indexOf(bottle);
            this.throwableObject.splice(index, 1);
          }, 20);
          bottle.splash();
          enemy.isInjured = false;

          if (enemy instanceof Endboss) {
            this.statusbarEndboss.setPercentage(enemy.energy);
          }

          enemy.hit(15);
          if (!(enemy instanceof Endboss)) {
            let index = this.level.enemies.indexOf(enemy);
            if (index !== -1) {
              setTimeout(() => {
                this.level.enemies.splice(index, 1);
              }, 2000);
            }
          }
        }
      });
    });
  }

  drawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //To use canvas here, it has to be declared as a variable before

    this.ctx.translate(this.cameraX, 0); //Moves the camera
    this.drawObjectOnMap(this.level.background);
    this.drawElementOnMap(this.character);
    this.drawObjectOnMap(this.level.enemies);
    this.drawObjectOnMap(this.throwableObject);
    this.drawObjectOnMap(this.level.clouds);
    this.drawObjectOnMap(this.level.coins);
    this.drawObjectOnMap(this.level.salsaBottleLeft);
    this.drawObjectOnMap(this.level.salsaBottleRight);

    this.ctx.translate(-this.cameraX, 0); //Moves the camera back
    this.drawElementOnMap(this.statusbar);
    this.drawElementOnMap(this.statusbarBottle);
    this.drawElementOnMap(this.statusbarCoin);
    this.drawElementOnMap(this.statusbarEndboss);
    this.ctx.translate(this.cameraX, 0); //Moves the camera

    this.ctx.translate(-this.cameraX, 0); //Moves the camera back

    //Call the draw function as often as the graphic card can handle it
    let drawRef = requestAnimationFrame(() => {
      this.drawGame();
    });
    this.animationFrames.push(drawRef);
    this.level.respawnEntities(this.character.x);
  }

  //The selected object is going to be created
  drawObjectOnMap(object) {
    object.forEach((e) => {
      this.drawElementOnMap(e);
    });
  }

  //The element from the selected object is going to be created. The parameters are in the classes
  drawElementOnMap(mo) {
    this.flipImage(mo);
    mo.draw(this.ctx);
    this.flipImageBack(mo);
  }

  flipImage(mo) {
    if (mo.otherDirection == true) {
      //Function is drawing the object mirrored
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1; //Mirror the axe
    }
  }

  flipImageBack(mo) {
    if (mo.otherDirection == true) {
      //Function is drawing the object mirrored
      mo.x = mo.x * -1; //Sets the axe back to the origin form
      this.ctx.restore(); //Sets the saved status back
    }
  }

  resetGame() {
    // Reset game objects
    this.character = new Character();
    this.level = level1;
    this.cameraX = 0;
    this.statusbar = new Statusbar();
    this.statusbarBottle = new StatusbarBottle();
    this.statusbarCoin = new StatusbarCoin();
    this.statusbarEndboss = new StatusbarEndboss();
    this.throwableObject = [];

    // Reset sounds
    this.backgroundMusic.pause();
    this.backgroundAnimalSound.pause();
    this.backgroundMusic.currentTime = 0;
    this.backgroundAnimalSound.currentTime = 0;

    // Reinitialize the game
    this.setWorld();
    this.drawGame();
    this.runGame();

  }
}
