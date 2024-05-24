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

  respawnEnemies(characterX) {
    this.enemies.forEach((enemy) => {
      if (
        !(enemy instanceof Endboss) &&
        enemy.x + enemy.width < characterX - 200
      ) {
        enemy.x = characterX + 1000; // Beispiel: 200 Pixel vor dem Charakter
      }
    });
  }
}
