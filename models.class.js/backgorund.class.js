class Background extends MoveableObject {
  width = 800;
  height = 600;

  constructor(bgoPath, x) {
    super().loadImage(bgoPath);
    this.x = x;
    this.y = 600 - this.height; //Height of canvas minus height of the image is the start position
  }
}
