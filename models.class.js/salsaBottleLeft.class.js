class salsaBottleLeft extends MoveableObject {
  width = 100;
  height = 100;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 799 * 4.5;
    this.y = 430;
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
  }
}
