class Level {
  background;
  enemies;
  clouds;
  end_x = 4000;
  coins;
  salsaBottleLeft;
  salsaBottleRight;

  constructor(
    background,
    enemies,
    clouds,
    coins,
    salsaBottleLeft,
    salsaBottleRight
  ) {
    this.background = background;
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.salsaBottleLeft = salsaBottleLeft;
    this.salsaBottleRight = salsaBottleRight;
  }
}
