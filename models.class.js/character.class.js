class Character extends MoveableObject {
  WALKING_PEPE = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  width = 150;
  height = 300;
  speed = 8;
  otherDirection;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.y = 220;
    this.loadImages(this.WALKING_PEPE);
    this.playAnimation();
  }

  playAnimation() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      } else if (this.world.keyboard.LEFT && this.x > -599) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.cameraX = -this.x + 100; //Moves the camera to te opposite side of walking. +100 to place the camera littl bit forward
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.animate(this.WALKING_PEPE);
      }
    }, 30);
  }
}
