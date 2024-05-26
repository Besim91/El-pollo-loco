class StatusbarBottle extends DrawableObject {
  STATUSBAR_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];



  constructor() {
    super().loadImages(this.STATUSBAR_BOTTLE);
    this.setPercentage(0);
    this.y = 110;
    this.x = 10;
    this.width = 200;
    this.height = 60;
  }

  setPercentage(collectedBottles) {
    this.collectedBottles = collectedBottles;
    let path = this.STATUSBAR_BOTTLE[this.resolvePercentageIndex()];
    this.img = this.imageChache[path];
  }

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
