class Chicken extends MoveableObject {
  width = 100;
  height = 90;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500;
    this.y = 425;
  }
}
