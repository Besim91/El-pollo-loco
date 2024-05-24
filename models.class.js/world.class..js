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
  gameInterval;
  drawInterval;
  gameOverImage = new Image();
  gameStopped = false;

  bottleSound = new Audio("audio/bottle.mp3");
  coinSound = new Audio("audio/coin.mp3");
  backgroundMusic = new Audio("audio/background.mp3");
  backgroundAnimalSound = new Audio("audio/animalbackgroundnoise.mp3");

  setWorld() {
    this.character.world = this; //Needed for access from character to keyboard. World is defined in the class character
    this.throwableObject.world = this;
  }

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.canvas = canvas; //Declare canvas as global variable to use it for clearRect.
    this.setWorld();
    this.drawGame();
    this.runGame();

    setInterval(() => {
      this.playBackgroundMusic();
    }, 500);
    this.gameOverImage.src =
      "img/9_intro_outro_screens/game_over/game over.png";
  }

  stopGame() {
    if (
      (this.character.isDead() && !this.gameStopped) ||
      (this.level.enemies.some(
        (enemy) => enemy instanceof Endboss && enemy.endbossDead
      ) &&
        !this.gameStopped)
    ) {
      this.gameStopped = true;
      setTimeout(() => {
        clearInterval(this.gameInterval);
        cancelAnimationFrame(this.drawInterval);
        this.backgroundMusic.pause();
        this.backgroundAnimalSound.pause();
        this.character.pauseAllSounds();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
          this.gameOverImage,
          this.canvas.width / 2 - this.gameOverImage.width / 2,
          this.canvas.height / 2 - this.gameOverImage.height / 2
        );

        // Erstellen und Hinzufügen des Start-Buttons
        const startButton = document.createElement("button");
        startButton.id = "game-button";
        startButton.textContent = "Back to start";
        startButton.onclick = () => location.reload(); // Seite neu laden beim Klicken des Buttons

        // Stelle sicher, dass der Button nur einmal hinzugefügt wird
        if (!document.getElementById("start-button")) {
          document.body.appendChild(startButton);
        }
      }, 1300);
    }
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
    this.gameInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.stopGame();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D == true && this.character.throwablebottles > 0) {
      let bottle = new ThrowableObjects(this.character.x, this.character.y);
      this.throwableObject.push(bottle);
      if (this.character.throwablebottles > 0) {
        this.character.throwablebottles -= 10;
      }
      this.character.sleepingSound.pause();
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
        this.bottleSound.play();
        this.bottleSound.volume = 0.4;
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
        this.bottleSound.volume = 0.4;
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
    this.drawInterval = requestAnimationFrame(() => {
      this.drawGame();
    });
    this.level.respawnEnemies(this.character.x);
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
