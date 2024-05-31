/**
 * Represents a status bar for health in the game.
 * Extends the DrawableObject class.
 */
class Statusbar extends DrawableObject {
  STATUSBAR_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates an instance of Statusbar.
   * Sets initial properties and loads images.
   */
  constructor() {
    super().loadImages(this.STATUSBAR_HEALTH);
    this.setPercentage(100);
    this.y = 10;
    this.x = 10;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the percentage value of the status bar for health and updates the displayed image accordingly.
   * @param {number} percentage - The percentage value of health to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.STATUSBAR_HEALTH[this.resolvePercentageIndex()];
    this.img = this.imageChache[path];
  }

  /**
   * Resolves the index of the image in the array based on the current percentage value of health.
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
