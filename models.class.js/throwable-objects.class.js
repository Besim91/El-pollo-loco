class ThrowableObjects extends MoveableObject {
  THROWABLE_OBJECT = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  width = 100;
  height = 100;
  world;

  constructor(x, y) {
    super().loadImages(this.THROWABLE_OBJECT);
    this.playAnimation();
    this.throw(x, y);
  }

  playAnimation() {
    setInterval(() => {
      this.animate(this.THROWABLE_OBJECT);
    }, 1000 / 25);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.graviation();

    setInterval(() => {
      this.x += 8;
    }, 1000 / 60);
  }
}
