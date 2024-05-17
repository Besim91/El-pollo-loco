class Level {
  background;
  enemies;
  clouds;
  end_x = 4000;
  coins;

  constructor(background, enemies, clouds, coins) {
    this.background = background;
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
  }
}
