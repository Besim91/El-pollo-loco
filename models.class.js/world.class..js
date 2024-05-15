class World {
  ctx;
  background = [
    new Background("img/5_background/layers/air.png", 0),
    new Background("img/5_background/layers/3_third_layer/1.png", 0),
    new Background("img/5_background/layers/2_second_layer/1.png", 0),
    new Background("img/5_background/layers/1_first_layer/1.png", 0),
  ];

  character = new Character();
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
  ];
  clouds = [new CloudsOne(), new CloudsOne(), new CloudsTwo(), new CloudsTwo()];
  canvas; //Declare for clearRect
  keyboard;

  setWorld() {
    this.character.world = this; //Needed for accsses from charcter to keyboard
  }

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.canvas = canvas; //Declare canvas as global variable to use it for clearRect.
    this.draw();
    this.setWorld();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //To use canvas here, it have to be declared as a variable before

    this.drawObjectOnMap(this.background);
    this.drawElementOnMap(this.character);
    this.drawObjectOnMap(this.enemies);
    this.drawObjectOnMap(this.clouds);

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
  drawElementOnMap(element) {
    this.ctx.drawImage(
      element.img,
      element.x,
      element.y,
      element.width,
      element.height
    );
  }
}
