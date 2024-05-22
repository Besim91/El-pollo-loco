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
  bottleSound = new Audio("audio/bottle.mp3");
  coinSound = new Audio("audio/coin.mp3");
  throwableObject = [];

  setWorld() {
    this.character.world = this; //Needed for accsses from charcter to keyboard. World is defined in the class charachter
    this.throwableObject.world = this;
  }

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.canvas = canvas; //Declare canvas as global variable to use it for clearRect.
    this.setWorld();
    this.drawGame();
    this.runGame();
  }

  throwBottle() {}

  runGame() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D == true && this.character.throwablebottles > 0) {
      let bottle = new ThrowableObjects(this.character.x, this.character.y);
      this.throwableObject.push(bottle);
      if (this.character.throwablebottles > 0) {
        this.character.throwablebottles -= 10;
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(10);
        this.statusbar.setPercentage(this.character.energy);
        this.character.pushPepeBack(enemy.x, enemy.width);
      }
    });
    this.level.salsaBottleLeft.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottleSound.play();
        this.character.takeBottle();
        this.statusbarBottle.setPercentage(this.character.collectedBottles);
        this.bottleSound.currentTime = 0;
        let index = this.level.salsaBottleLeft.indexOf(bottle);
        this.level.salsaBottleLeft.splice(index, 1);
      }
    });
    this.level.salsaBottleRight.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottleSound.play();
        this.character.takeBottle();
        this.statusbarBottle.setPercentage(this.character.collectedBottles);
        this.bottleSound.currentTime = 0;
        let index = this.level.salsaBottleRight.indexOf(bottle);
        this.level.salsaBottleRight.splice(index, 1);
      }
    });
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinSound.play();
        this.character.takeCoin();
        this.statusbarCoin.setPercentage(this.character.collectedCoins);
        this.coinSound.currentTime = 0;
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //To use canvas here, it have to be declared as a variable before

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

    //Call the draw function so often as the grafic card is possible to do it
    let self = this;
    requestAnimationFrame(() => {
      self.drawGame();
    });
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
    mo.drawFrame(this.ctx);
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
}
