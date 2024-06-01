class StatusbarBottle extends DrawableObject {
  /**
   * Creates an instance of StatusbarBottle.
   * Sets initial properties and loads images.
   */
  constructor() {
    super().loadImages(STATUSBAR_BOTTLE);
    this.setPercentage(0);
    this.y = 110;
    this.x = 10;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the percentage value of the status bar for collected bottles and updates the displayed image accordingly.
   * @param {number} collectedBottles - The percentage value of collected bottles to set.
   */
  setPercentage(collectedBottles) {
    this.collectedBottles = collectedBottles;
    let path = STATUSBAR_BOTTLE[this.resolvePercentageIndex()];
    this.img = this.imageChache[path];
  }

  /**
   * Resolves the index of the image in the array based on the current percentage value of collected bottles.
   * @returns {number} The index of the image in the array.
   */
  resolvePercentageIndex() {
    if (this.collectedBottles == 100) {
      return 5;
    } else if (this.collectedBottles >= 80) {
      return 4;
    } else if (this.collectedBottles >= 60) {
      return 3;
    } else if (this.collectedBottles >= 40) {
      return 2;
    } else if (this.collectedBottles >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
