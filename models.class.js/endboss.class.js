class Endboss extends MoveableObject {
  width = 400;
  height = 450;

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
  endbossDead = false;
  startEndbossRun = false;
  speed = 7;

  constructor() {
    super().loadImages(this.ENDBOSS);
    this.loadImages(this.DEAD_ENDBOSS);
    this.loadImages(this.HURT_ENDBOSS);
    this.loadImages(this.WALK_ENDBOSS);
    this.playAnimation();
    this.y = 110;
    this.x = 4300;
  }

  playAnimation() {
    setInterval(() => {
      if (!this.startEndbossRun) {
        this.animate(this.ENDBOSS);
      }
    }, 100);

    setInterval(() => {
      if (this.energy == 0 && !this.endbossDead) {
        this.animate(this.DEAD_ENDBOSS);
        this.endbossDead = true;
      }
    }, 1000);

    setInterval(() => {
      if (this.isHurt()) {
        this.animate(this.HURT_ENDBOSS);
        this.startEndbossRun = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.startEndbossRun) {
        this.animate(this.WALK_ENDBOSS);
        this.moveLeft();
      }
    }, 300);
  }
}
