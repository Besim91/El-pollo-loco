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

  setWorld() {
    this.character.world = this; //Needed for accsses from charcter to keyboard. World is defined in the class charachter
  }

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.canvas = canvas; //Declare canvas as global variable to use it for clearRect.
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //To use canvas here, it have to be declared as a variable before

    this.ctx.translate(this.cameraX, 0); //Moves the camera
    this.drawObjectOnMap(this.level.background);
    this.drawElementOnMap(this.character);
    this.drawObjectOnMap(this.level.enemies);
    this.drawObjectOnMap(this.level.clouds);

    this.ctx.translate(-this.cameraX, 0); //Moves the camera back
    this.drawElementOnMap(this.statusbar);
    this.drawElementOnMap(this.statusbarBottle);
    this.drawElementOnMap(this.statusbarCoin);
    this.ctx.translate(this.cameraX, 0); //Moves the camera

    this.ctx.translate(-this.cameraX, 0); //Moves the camera back

    //Call the draw function so often as the grafic card is possible to do it
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
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
