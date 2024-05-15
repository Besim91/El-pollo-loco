class Chicken extends MoveableObject {
  width = 100;
  height = 90;

  WALKING_CHICKEN = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
    this.y = 425;
    this.speed = 0.1 + Math.random() * 0.25;
    this.loadImages(this.WALKING_CHICKEN);
    this.playAnimation();
    this.moveLeft();
  }

  playAnimation() {
    setInterval(() => {
      this.animate(this.WALKING_CHICKEN);
    }, 100);
  }
}
