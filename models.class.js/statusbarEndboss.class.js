/**
 * Represents a status bar for an end boss in the game.
 * Extends the DrawableObject class.
 */
class StatusbarEndboss extends DrawableObject {
  STATUSBAR_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * Creates an instance of StatusbarEndboss.
   * Sets initial properties and loads images.
   */
  constructor() {
    super().loadImages(this.STATUSBAR_ENDBOSS);
    this.setPercentage(100);
    this.y = 10;
    this.x = 590;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the percentage value of the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.STATUSBAR_ENDBOSS[this.resolvePercentageIndex()];
    this.img = this.imageChache[path];
  }

  /**
   * Resolves the index of the image in the array based on the current percentage value.
   * @returns {number} The index of the image in the array.
   */
  resolvePercentageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else if (this.percentage >= 0) {
      return 0;
    }
  }
}
