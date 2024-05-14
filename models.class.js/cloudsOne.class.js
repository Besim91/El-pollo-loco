class CloudsOne extends MoveableObject {
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 200 + Math.random() * 500;
    this.y = 40;
  }
}
