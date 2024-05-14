class CloudsOne extends MoveableObject {
  width = 600;
  height = 250;
  speed = 1 / 10;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.y = 10;
    this.animate(this.speed);
  }
}
