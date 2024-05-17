class MoveableObject extends DrawableObject {
  speed = 0.1;
  energy = 100;
  lastHit = 0;
  acceleration = 4;
  speedY = 0;

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.y + this.height >= obj.y &&
      this.x <= obj.x + obj.width &&
      this.y <= obj.y + obj.height
    ); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  animate(arr) {
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 40;
  }



  hit() {
    this.energy -= 2;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let passedTime = new Date().getTime() - this.lastHit;
    let passedTimeSek = passedTime / 1000;
    return passedTimeSek < 0.5;
  }
}
