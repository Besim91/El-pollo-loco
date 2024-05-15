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

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.y = 220;
    this.loadImages(this.WALKING_PEPE);
    this.playAnimation();
  }

  playAnimation() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.animate(this.WALKING_PEPE);
      }
    }, 100);
  }
}
