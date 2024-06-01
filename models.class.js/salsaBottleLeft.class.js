class salsaBottleLeft extends MoveableObject {
  width = 100;
  height = 100;

  /**
   * Offset values for collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 10,
    bottom: 35,
    left: 60,
    right: 60,
  };

  /**
   * Creates an instance of salsaBottleLeft.
   * Sets initial properties and loads images.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 799 * 4.5;
    this.y = 430;
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
  }
}
