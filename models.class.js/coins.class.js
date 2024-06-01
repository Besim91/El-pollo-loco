class Coin extends MoveableObject {
  width = 120;
  height = 120;

  COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * The offset values for the coin's bounding box.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} bottom - The bottom offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   */
  offset = {
    top: 10,
    bottom: 35,
    left: 40,
    right: 40,
  };

  /**
   * Create a new coin instance.
   */
  constructor() {
    super().loadImages(this.COINS);
    this.x = 200 + Math.random() * 799 * 5;
    this.y = 100;
    this.playAnimation();
  }

  /**
   * Play the coin animation.
   */
  playAnimation() {
    setInterval(() => {
      this.animate(this.COINS);
    }, 500);
  }
}
