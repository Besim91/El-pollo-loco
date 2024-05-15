class CloudsTwo extends MoveableObject {
  width = 250;
  height = 150;
  speed = 1 / 20;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/2.png");
    this.x = Math.random() * 500;
    this.y = 50;
    this.moveLeft(this.speed);
  }
}
