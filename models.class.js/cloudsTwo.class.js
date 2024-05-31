/**
 * Class representing a cloud that moves across the screen.
 * @extends MoveableObject
 */
class CloudsTwo extends MoveableObject {
  width = 250;
  height = 150;
  speed = 2 / 10;

  /**
   * Create a new cloud instance.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/2.png");
    this.x = Math.random() * 799 * 5;
    this.y = 50;
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 120);
  }
}
