class Level {
  /**
   * Creates an instance of the Level class.
   * @param {DrawableObject} background - The background object of the level.
   * @param {Enemy[]} enemies - An array of enemy objects in the level.
   * @param {Cloud[]} clouds - An array of cloud objects in the level.
   * @param {Coin[]} coins - An array of coin objects in the level.
   * @param {SalsaBottle} salsaBottleLeft - The left salsa bottle object in the level.
   * @param {SalsaBottle} salsaBottleRight - The right salsa bottle object in the level.
   */
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
    this.end_x = 4300;
  }

  /**
   * Resets the position of enemies and clouds when the character has advanced far enough.
   * @param {number} characterX - The X position of the character.
   */
  respawnEntities(characterX) {
    this.enemies.forEach((enemy) => {
      // Checks if the enemy is not the end boss and if it is far enough behind the character.
      if (
        !(enemy instanceof Endboss) &&
        enemy.x + enemy.width < characterX - 1000
      ) {
        enemy.x = characterX + 1000; // Resets the X position of the enemy.
      }
    });

    this.clouds.forEach((cloud) => {
      // Checks if the cloud is far enough behind the character.
      if (cloud.x + cloud.width < characterX - 1500) {
        cloud.x = characterX + 1000; // Resets the X position of the cloud.
      }
    });
  }
}
