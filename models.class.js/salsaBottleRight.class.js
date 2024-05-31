/**
 * Represents a salsa bottle object on the right side of the ground in the game.
 * Extends the MoveableObject class.
 */
class salsaBottleRight extends MoveableObject {
  width = 100;
  height = 100;

  /**
   * Offset values for collision detection.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 10,
    bottom: 35,
    left: 65,
    right: 65,
  };

  /**
   * Creates an instance of salsaBottleRight.
   * Sets initial properties and loads images.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 799 * 4.5;
    this.y = 440;
    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
  }
}
