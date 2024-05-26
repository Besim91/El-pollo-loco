class Level {
  background;
  enemies;
  clouds;
  end_x = 4300;
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

  respawnEntities(characterX) {
    this.enemies.forEach((enemy) => {
      if (
        !(enemy instanceof Endboss) &&
        enemy.x + enemy.width < characterX - 1000
      ) {
        enemy.x = characterX + 1000; // Beispiel: 200 Pixel vor dem Charakter
      }
    });

    this.clouds.forEach((cloud) => {
      if (cloud.x + cloud.width < characterX - 1500) {
        cloud.x = characterX + 1000; // Beispiel: 200 Pixel vor dem Charakter
      }
    });
  }
}
