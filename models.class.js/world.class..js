class World {
  ctx;
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
  background = [new Background("img/5_background/layers/1_first_layer/1.png")];
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas; //Declare canvas as global variable to use it for clearRect.
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Just one image is going to be loadet
    this.drawElementOnMap(this.character);

    //Several images are going to be loadet from an array
    this.drawObjectOnMap(this.enemies);
    this.drawObjectOnMap(this.clouds);
    this.drawObjectOnMap(this.background);

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
      element.height,
      element.width
    );
  }
}
