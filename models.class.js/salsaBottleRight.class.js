class salsaBottleRight extends DrawableObject {
  width = 100;
  height = 100;

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 799 * 4.5;
    this.y = 440;
    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
  }
}
