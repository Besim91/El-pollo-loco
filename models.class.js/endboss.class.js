class Endboss extends MoveableObject {
  width = 400;
  height = 450;
  endbossDead = false;
  startEndbossRun = false;
  speed = 50;
  endbossDied = false;
  world;

  dinoSound = new Audio("audio/dinochicken.mp3");
  dinoWalk = new Audio("audio/dinowalk.mp3");
  deadSound = new Audio("audio/rooster.mp3");

  offset = {
    top: 170,
    bottom: 10,
    left: 80,
    right: 20,
  };

  /**
   * Represents a constructor function for managing end boss animations and game logic.
   * @constructor
   */
  constructor() {
    super().loadImages(ENDBOSS);
    this.loadImages(DEAD_ENDBOSS);
    this.loadImages(HURT_ENDBOSS);
    this.loadImages(WALK_ENDBOSS);
    this.loadImages(ATTACK_ENDBOSS);
    this.playAnimation();
    this.y = 110;
    this.x = 4300;
  }

  /**
   * Initiates various animations for the end boss.
   */
  playAnimation() {
    this.endbossRun();
    this.checkEndbossHurt();
    this.endbossReadyToAttack();
    this.enbossWalk();
    this.checkEnbossDeath();
  }

  /**
   * Checks if the end boss has died and triggers game over logic.
   */
  checkEnbossDeath() {
    setInterval(() => {
      if (this.dead()) {
        this.endbossDied = true;
        this.animate(DEAD_ENDBOSS);
        if (window.sound) {
          this.deathNoise(this.deadSound);
          mute();
        }
        this.endbossDead = true;
        this.switchScreen();
      }
    }, 1000);
  }

  dead() {
    return !this.endbossDied && this.energy == 0 && !this.endbossDead;
  }

  /**
   * Initiates the game over sound effect.
   */
  playGameOver() {
    setTimeout(() => {
      if (window.sound) {
        this.gameOver.play();
      }
    }, 2000);
  }

  /**
   * Initiates the end boss walking animation.
   */
  enbossWalk() {
    setInterval(() => {
      if (this.canAttack()) {
        this.animate(WALK_ENDBOSS);
        this.checkDirection();
        if (window.sound) {
          this.dinoWalk.play();
          this.dinoWalk.volume = 0.3;
        }
      }
    }, 300);
  }

  canAttack() {
    return this.startEndbossRun && this.energy > 0 && this.energy <= 80;
  }

  checkDirection() {
    if (this.characterLeftOfEndboss()) {
      this.otherDirection = false;
      this.moveLeft();
    } else if (this.characterRightOfEndboss()) {
      this.otherDirection = true;
      this.moveRight();
    }
  }

  characterLeftOfEndboss() {
    return (
      this.world.character.x + this.world.character.width / 2 <
      this.x + this.width / 2
    );
  }
  characterRightOfEndboss() {
    return (
      this.world.character.x + this.world.character.width / 2 >
      this.x + this.width / 2
    );
  }

  /**
   * Initiates the end boss attack animation.
   */
  endbossReadyToAttack() {
    setInterval(() => {
      if (this.canPrepareAttack()) {
        this.animate(ATTACK_ENDBOSS);
        if (window.sound) {
          this.dinoSound.play();
          this.dinoSound.volume = 0.7;
        }
      }
    }, 350);
  }

  canPrepareAttack() {
    return this.energy < 100 && this.energy > 80;
  }

  /**
   * Checks if the end boss is hurt and triggers corresponding animations.
   */
  checkEndbossHurt() {
    setInterval(() => {
      if (this.isHurt() && !this.isInjured) {
        this.animate(HURT_ENDBOSS);
        this.startEndbossRun = true;
        this.isInjured = true;
      }
    }, 1000 / 60);
  }

  /**
   * Initiates the default end boss running animation.
   */
  endbossRun() {
    setInterval(() => {
      if (!this.startEndbossRun) {
        this.animate(ENDBOSS);
      }
    }, 100);
  }

  /**
   * Switches the game screen to the end screen after a delay.
   */
  switchScreen() {
    setTimeout(() => {
      document.getElementById("canvas").classList.add("d-none");
      document.getElementById("endScreen").classList.remove("d-none");
      document.getElementById("gameControls").classList.add("d-none");
      document.getElementById("openScreenImg").classList.add("d-none");
    }, 1500);
  }
}
