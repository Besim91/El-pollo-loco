class Coin extends MoveableObject {
  width = 120;
  height = 120;

  COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImages(this.COINS);
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 100;
    this.playAnimation();
  }

  playAnimation() {
    setInterval(() => {
      this.animate(this.COINS);
    }, 500);
  }
}
