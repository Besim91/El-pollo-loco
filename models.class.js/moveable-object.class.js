class MoveableObject {
  x = 100;
  y = 100;
  img; //Storage for image
  speed = 0.1;
  imageChache = []; //Storage for images to animate the charcters
  currentImage = 0;

  loadImage(path) {
    this.img = new Image(); // Create an image
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 120);
  }

  moveRight() {
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 120);
  }

  animate(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }
}
