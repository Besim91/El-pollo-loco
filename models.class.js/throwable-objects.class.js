class ThrowableObjects extends MoveableObject {
  THROWABLE_OBJECT = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  width = 100;
  height = 100;
  world;
  otherDirection;
  currentImgIndex = 0;
  brokenFlag = false;
  splashInterval = null;

  constructor(x, y) {
    super().loadImages(this.THROWABLE_OBJECT);
    this.loadImages(this.BOTTLE_SPLASH);
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
    this.speedY = 20;
    this.graviation();

    setInterval(() => {
      this.x += 10;
    }, 1000 / 60);
  }

  splash() {
    this.currentImgIndex = 0;
    if (this.splashInterval) clearInterval(this.splashInterval);
    this.splashInterval = setInterval(() => {
      this.animate(this.BOTTLE_SPLASH);
      if (this.currentImgIndex >= this.BOTTLE_SPLASH.length) {
        clearInterval(this.splashInterval);
        this.splashInterval = null;
      }
    }, 1000 / 5);
  }
}
