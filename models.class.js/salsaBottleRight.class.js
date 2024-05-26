class salsaBottleRight extends MoveableObject {
  width = 100;
  height = 100;

  offset = {
    top: 10,
    bottom: 35,
    left: 65,
    right: 65,
  };

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 799 * 4.5;
    this.y = 440;
    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
  }
}
