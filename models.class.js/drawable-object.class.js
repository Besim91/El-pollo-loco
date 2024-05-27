class DrawableObject {
  x = -300;
  y = 100;
  img = new Image(); //Storage for image
  imageChache = []; //Storage for images to animate the charcters
  currentImage = 0;
  percentage;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  animate(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }
}
