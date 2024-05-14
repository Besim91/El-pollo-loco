class MoveableObject {
  x = 100;
  y = 100;
  img;
  speed;
  imageChache = [];

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = path;
    });
  }

  animate(speed) {
    setInterval(() => {
      this.x -= speed;
    }, 1000 / 120);
  }
}
