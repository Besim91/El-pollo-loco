class MoveableObject {
  x = 100;
  y = 100;
  img;
  height = 100;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
}
