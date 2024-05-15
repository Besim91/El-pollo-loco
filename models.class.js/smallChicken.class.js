class SmallChicken extends MoveableObject {
  width = 60;
  height = 60;

  WALKING_SMALLCHICKEN = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 455;
    this.speed = 0.05 + Math.random() * 0.25;
    this.loadImages(this.WALKING_SMALLCHICKEN);
    this.playAnimation();
    this.moveLeft();
  }

  playAnimation() {
    setInterval(() => {
      this.animate(this.WALKING_SMALLCHICKEN);
    }, 100);
  }
}
