/**
 * Represents a status bar for collected coins in the game.
 * Extends the DrawableObject class.
 */
class StatusbarCoin extends DrawableObject {
  STATUSBAR_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  /**
   * Creates an instance of StatusbarCoin.
   * Sets initial properties and loads images.
   */
  constructor() {
    super().loadImages(this.STATUSBAR_COIN);
    this.setPercentage(0);
    this.y = 60;
    this.x = 10;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the percentage value of the status bar for collected coins and updates the displayed image accordingly.
   * @param {number} collectedCoins - The percentage value of collected coins to set.
   */
  setPercentage(collectedCoins) {
    this.collectedCoins = collectedCoins;
    let path = this.STATUSBAR_COIN[this.resolvePercentageIndex()];
    this.img = this.imageChache[path];
  }

  /**
   * Resolves the index of the image in the array based on the current percentage value of collected coins.
   * @returns {number} The index of the image in the array.
   */
  resolvePercentageIndex() {
    if (this.collectedCoins == 100) {
      return 5;
    } else if (this.collectedCoins >= 80) {
      return 4;
    } else if (this.collectedCoins >= 60) {
      return 3;
    } else if (this.collectedCoins >= 40) {
      return 2;
    } else if (this.collectedCoins >= 20) {
      return 1;
    } else if (this.collectedCoins >= 0) {
      return 0;
    }
  }
}
