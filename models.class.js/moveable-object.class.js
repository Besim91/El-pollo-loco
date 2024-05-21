class MoveableObject extends DrawableObject {
  speed = 0.1;
  energy = 100;
  lastHit = 0;
  acceleration = 4;
  speedY = 0;
  collectedBottles = 0;
  throwablebottles = 0;
  collectedCoins = 0;

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

  takeBottle() {
    this.collectedBottles += 10;
    this.throwablebottles += 10;
  }

  takeCoin() {
    this.collectedCoins += 10;
  }

  graviation() {
    setInterval(() => {
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 60);
  }

  isInAir() {
    if (this instanceof ThrowableObjects) {
      return true;
    } else {
      return this.y < 220;
    }
  }
}
