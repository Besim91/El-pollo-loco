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

  HURT_PEPE = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  DEATH_PEPE = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  RELAXING_PEPE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  SLEEPING_PEPE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  width = 150;
  height = 300;
  speed = 8;
  otherDirection;
  currentTime = 0;
  lastMove = 0;
  pepeRelaxed = false;
  throwCooldown = false;
  pepeDied = false;

  walkingSound = new Audio("audio/running.mp3");
  jumpSound = new Audio("audio/jump.mp3");
  hurtSound = new Audio("audio/hurt.mp3");
  deathSound = new Audio("audio/deathPepe.mp3");
  tiredSound = new Audio("audio/tired.mp3");
  sleepingSound = new Audio("audio/snoring.mp3");

  offset = {
    top: 120,
    bottom: 10,
    left: 15,
    right: 25,
  };

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.y = 235;
    this.loadImages(this.WALKING_PEPE);
    this.loadImages(this.JUMPING_PEPE);
    this.loadImages(this.HURT_PEPE);
    this.loadImages(this.DEATH_PEPE);
    this.loadImages(this.RELAXING_PEPE);
    this.loadImages(this.SLEEPING_PEPE);
    this.playAnimation();
    this.graviation();
  }

  calculateTimeDiff() {
    let timeDiff = this.currentTime - this.lastMove;
    return timeDiff / 1000;
  }

  safeLastKeyPress() {
    this.lastMove = new Date().getTime();
  }

  playAnimation() {
    this.walkingSound.pause();

    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.end_x) {
        this.moveRight();
        this.otherDirection = false;
        if (window.sound) {
          this.walkingNois();
        }
        this.safeLastKeyPress();
        this.pepeRelaxed = false;
        this.sleepingSound.pause();
      }
      if (this.world.keyboard.LEFT && this.x > -599) {
        this.moveLeft();
        this.otherDirection = true;
        if (window.sound) {
          this.walkingNois();
        }
        this.safeLastKeyPress();
        this.pepeRelaxed = false;
        this.sleepingSound.pause();
      }
      if (this.world.keyboard.SPACE && !this.isInAir()) {
        // The second condition is to avoid jumping during to be in air
        this.jump();
        if (window.sound) {
          this.jumpSound.play();
        }
        this.pepeRelaxed = false;
        this.safeLastKeyPress();
        this.sleepingSound.pause();
      }

      this.world.cameraX = -this.x + 100; //Moves the camera to the opposite side of walking. +100 to place the camera a little bit forward
    }, 1000 / 60);

    setInterval(() => {
      if (this.isHurt() && !this.isInjured) {
        this.animate(this.HURT_PEPE);
        if (window.sound) {
          this.hurtNois();
        }
        this.sleepingSound.pause();
      }
    }, 150);

    setInterval(() => {
      if (
        this.calculateTimeDiff() > 5 &&
        this.calculateTimeDiff() < 8 &&
        !this.pepeRelaxed
      ) {
        this.animate(this.RELAXING_PEPE);
        if (window.sound) {
          this.tiredSound.play();
        }
        this.pepeRelaxed = true;
      }

      if (this.calculateTimeDiff() > 7) {
        this.animate(this.SLEEPING_PEPE);
        if (window.sound) {
          this.sleepingSound.play();
        }
        this.sleepingSound.volume = 0.3;
      }

      if (!this.pepeDied && this.isDead()) {
        this.pepeDied = true;
        this.oneCycle(this.DEATH_PEPE);
        if (window.sound) {
          this.deathNoise();
        }
        mute();
        this.energy = 100;
        document.getElementById("canvas").classList.add("d-none");
        document.getElementById("endScreen").classList.remove("d-none");
        document.getElementById("gameControls").classList.add("d-none");
        document.getElementById("openScreenImg").classList.add("d-none");
      }

      this.currentTime = new Date().getTime();
      this.calculateTimeDiff();
    }, 100);

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

  pushPepeBack(enemyX, enemyWidth, enemyY, enemy, index) {
    let pushBackAnimation = setInterval(() => {
      if (
        this.isInAir() &&
        this.speedY < 0 &&
        !this.enemyCrushed &&
        this.y + this.height - 60 <= enemyY
      ) {
        this.speedY = 35;
        this.enemyCrushed = true;
        enemy.hit(15);
        setTimeout(() => {
          this.world.level.enemies.splice(index, 1);
          this.enemyCrushed = false;
        }, 500);
      } else if (
        !this.isInAir() &&
        (this.x < enemyX || this.x + this.width > enemyX + enemyWidth)
      ) {
        if (this.x < enemyX) {
          this.x -= 20;
        } else {
          this.x += 20;
        }
        this.speedY = 0;
        this.y -= 15;
        this.hit(10);
      }
    }, 10);

    setTimeout(() => {
      clearInterval(pushBackAnimation);
    }, 100);
  }

  walkingNois() {
    if (!this.isInAir()) {
      this.walkingSound.volume = 0.5;
      this.walkingSound.play();
    }
  }

  hurtNois() {
    this.hurtSound.volume = 0.5;
    this.hurtSound.play();
  }

  deathNoise() {
    this.deathSound.play();
    setTimeout(() => {
      this.deathSound.pause();
      this.gameOver.play();
    }, 1000);
  }
}
