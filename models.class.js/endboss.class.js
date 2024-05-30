class Endboss extends MoveableObject {
  ENDBOSS = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  DEAD_ENDBOSS = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  HURT_ENDBOSS = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  WALK_ENDBOSS = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  ATTACK_ENDBOSS = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  width = 400;
  height = 450;
  endbossDead = false;
  startEndbossRun = false;
  speed = 50;
  endbossDied = false;

  dinoSound = new Audio("audio/dinochicken.mp3");
  dinoWalk = new Audio("audio/dinowalk.mp3");
  deadSound = new Audio("audio/rooster.mp3");

  offset = {
    top: 170,
    bottom: 10,
    left: 80,
    right: 20,
  };

  constructor() {
    super().loadImages(this.ENDBOSS);
    this.loadImages(this.DEAD_ENDBOSS);
    this.loadImages(this.HURT_ENDBOSS);
    this.loadImages(this.WALK_ENDBOSS);
    this.loadImages(this.ATTACK_ENDBOSS);
    this.playAnimation();
    this.y = 110;
    this.x = 4300;
  }

  playAnimation() {
    this.endbossRun();
    this.checkEndbossHurt();
    this.endbossReadyToAttack();
    this.enbossWalk();
    this.checkEnbossDeath();
  }

  checkEnbossDeath() {
    setInterval(() => {
      if (!this.endbossDied && this.energy == 0 && !this.endbossDead) {
        this.endbossDied = true;
        this.animate(this.DEAD_ENDBOSS);
        if (window.sound) {
          this.deadSound.play();
          this.playGameOver();
          mute();
        }
        this.endbossDead = true;
        this.switchScreen();
      }
    }, 1000);
  }

  playGameOver() {
    setTimeout(() => {
      if (window.sound) {
        this.gameOver.play();
      }
    }, 2000);
  }

  enbossWalk() {
    setInterval(() => {
      if (this.startEndbossRun && this.energy > 0 && this.energy <= 80) {
        this.animate(this.WALK_ENDBOSS);
        this.moveLeft();
        if (window.sound) {
          this.dinoWalk.play();
          this.dinoWalk.volume = 0.3;
        }
      }
    }, 300);
  }

  endbossReadyToAttack() {
    setInterval(() => {
      if (this.energy < 100 && this.energy > 80) {
        this.animate(this.ATTACK_ENDBOSS);
        if (window.sound) {
          this.dinoSound.play();
          this.dinoSound.volume = 0.7;
        }
      }
    }, 350);
  }

  checkEndbossHurt() {
    setInterval(() => {
      if (this.isHurt() && !this.isInjured) {
        this.animate(this.HURT_ENDBOSS);
        this.startEndbossRun = true;
        this.isInjured = true;
      }
    }, 1000 / 60);
  }

  endbossRun() {
    setInterval(() => {
      if (!this.startEndbossRun) {
        this.animate(this.ENDBOSS);
      }
    }, 100);
  }

  switchScreen() {
    setTimeout(() => {
      document.getElementById("canvas").classList.add("d-none");
      document.getElementById("endScreen").classList.remove("d-none");
      document.getElementById("gameControls").classList.add("d-none");
      document.getElementById("openScreenImg").classList.add("d-none");
    }, 1500);
  }
}
