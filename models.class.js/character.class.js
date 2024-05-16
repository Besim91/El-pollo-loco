class Character extends MoveableObject {
  WALKING_PEPE = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  JUMPING_PEPE = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  world;
  width = 150;
  height = 300;
  speed = 8;
  otherDirection;
  walkingSound = new Audio("audio/running.mp3");
  jumpSound = new Audio("audio/jump.mp3");
  speedY = 0;
  acceleration = 4;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.y = 235;
    this.loadImages(this.WALKING_PEPE);
    this.loadImages(this.JUMPING_PEPE);
    this.playAnimation();
    this.graviation();
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
    return this.y < 220;
  }

  walkingNois() {
    if (!this.isInAir()) {
      this.walkingSound.play();
    }
  }

  playAnimation() {
    this.walkingSound.pause();
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walkingNois();
      }
      if (this.world.keyboard.LEFT && this.x > -599) {
        this.moveLeft();
        this.otherDirection = true;
        this.walkingNois();
      }
      if (this.world.keyboard.SPACE && !this.isInAir()) {
        // The second condition is to avoid jumping during to be in air
        this.jump();
        this.jumpSound.play();
      }
      this.world.cameraX = -this.x + 100; //Moves the camera to te opposite side of walking. +100 to place the camera littl bit forward
    }, 1000 / 60);

    setInterval(() => {
      if (this.isInAir()) {
        this.animateJump(this.JUMPING_PEPE);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.animate(this.WALKING_PEPE);
      }
    }, 30);
  }

  animateJump(arr) {
    if (this.speedY > 0) {
      for (let i = 0; i < 4; i++) {
        let path = arr[i];
        this.img = this.imageChache[path];
      }
    }
    if (this.speedY == 0) {
      let path = arr[4];
      this.img = this.imageChache[path];
    }

    if (this.speedY < 0 && this.speedY >= -40) {
      for (let i = 5; i < 6; i++) {
        let path = arr[i];
        this.img = this.imageChache[path];
      }
    }
    if (this.speedY == -40) {
      for (let i = 6; i < 9; i++) {
        let path = arr[i];
        this.img = this.imageChache[path];
      }
    }
  }
}
