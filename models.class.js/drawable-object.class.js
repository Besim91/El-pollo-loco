/**
 * Class representing a drawable object.
 */
class DrawableObject {
  x = -300;
  y = 100;
  img = new Image();
  imageChache = [];
  currentImage = 0;
  percentage;

  /**
   * Load a single image.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Load multiple images.
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }

  /**
   * Draw the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Animate the object by cycling through an array of images.
   * @param {string[]} arr - An array of image paths for the animation.
   */
  animate(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }
}
