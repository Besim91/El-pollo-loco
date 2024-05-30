class SmallChicken extends MoveableObject {
  width = 60;
  height = 60;
  energy = 10;

  deadSound = new Audio("audio/squeak.mp3");

  WALKING_SMALLCHICKEN = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  offset = {
    top: 5,
    bottom: 10,
    left: 30,
    right: 40,
  };

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 470;
    this.speed = 0.05 + Math.random() * 0.25;
    this.loadImages(this.WALKING_SMALLCHICKEN);
    this.playAnimation();
    this.moveLeft();
  }

  playAnimation() {
    let walkInterval = setInterval(() => {
      if (this.energy > 0) {
        this.animate(this.WALKING_SMALLCHICKEN);
      }
    }, 100);

    let moveInterval = setInterval(() => {
      if (this.energy > 0) {
        this.moveLeft();
      }
    }, 1000 / 120);

    this.checkDeath(walkInterval, moveInterval);
  }

  checkDeath(walkInterval, moveInterval) {
    let animationInterval = setInterval(() => {
      if (this.energy == 0) {
        if (window.sound) {
          this.deadSound.play();
          this.deadSound.volume = 0.6;
        }
        this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
        clearInterval(animationInterval);
        clearInterval(walkInterval);
        clearInterval(moveInterval);
      }
    }, 100);
  }
}
