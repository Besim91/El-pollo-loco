class Chicken extends MoveableObject {
  WALKING_CHICKEN = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  width = 100;
  height = 90;
  energy = 10;
  deadSound = new Audio("audio/squeak.mp3");

  offset = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 10,
  };

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 435;
    this.speed = 0.1 + Math.random() * 0.25;
    this.loadImages(this.WALKING_CHICKEN);
    this.playAnimation();
  }

  playAnimation() {
    let walkInterval = setInterval(() => {
      if (this.energy > 0) {
        this.animate(this.WALKING_CHICKEN);
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
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        clearInterval(animationInterval);
        clearInterval(walkInterval);
        clearInterval(moveInterval);
      }
    }, 100);
  }
}
