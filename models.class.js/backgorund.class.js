/**
 * Represents a background object in the game.
 * @extends MoveableObject
 */
class Background extends MoveableObject {
  width = 800;
  height = 600;

  /**
   * Creates an instance of Background.
   * @param {string} bgoPath - The path to the background image.
   * @param {number} x - The x-coordinate position of the background image.
   */
  constructor(bgoPath, x) {
    super().loadImage(bgoPath);
    this.x = x;
    this.y = 600 - this.height; // Height of canvas minus height of the image is the start position
  }
}
