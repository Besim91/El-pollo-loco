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

  constructor() {
    super().loadImages(this.ENDBOSS);
    this.playAnimation();
    this.y = 110;
    this.x = 4300;
  }

  playAnimation() {
    setInterval(() => {
      this.animate(this.ENDBOSS);
    }, 100);
  }
}
