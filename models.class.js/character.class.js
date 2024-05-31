class Character extends MoveableObject {
  WALKING_PEPE = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  JUMPING_PEPE = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  HURT_PEPE = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  DEATH_PEPE = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];

  RELAXING_PEPE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  SLEEPING_PEPE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  width = 150;
  height = 300;
  speed = 8;
  otherDirection;
  currentTime = 0;
  lastMove = 0;
  pepeRelaxed = false;
  throwCooldown = false;
  pepeDied = false;

  walkingSound = new Audio("audio/running.mp3");
  jumpSound = new Audio("audio/jump.mp3");
  hurtSound = new Audio("audio/hurt.mp3");
  deathSound = new Audio("audio/deathPepe.mp3");
  tiredSound = new Audio("audio/tired.mp3");
  sleepingSound = new Audio("audio/snoring.mp3");

  offset = {
    top: 120,
    bottom: 10,
    left: 15,
    right: 25,
  };

  /**
   * Creates an instance of Character and initializes its properties.
   * Loads initial image and animations for different states.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.y = 235;
    this.loadImages(this.WALKING_PEPE);
    this.loadImages(this.JUMPING_PEPE);
    this.loadImages(this.HURT_PEPE);
    this.loadImages(this.DEATH_PEPE);
    this.loadImages(this.RELAXING_PEPE);
    this.loadImages(this.SLEEPING_PEPE);
    this.playAnimation();
    this.graviation();
  }

  /**
   * Calculates the time difference between the current time and the last recorded move time.
   * @returns {number} The time difference in seconds.
   */
  calculateTimeDiff() {
    let timeDiff = this.currentTime - this.lastMove;
    return timeDiff / 1000;
  }

  /**
   * Records the current time as the last key press time.
   */
  safeLastKeyPress() {
    this.lastMove = new Date().getTime();
  }

  /**
   * Controls and handles different animations and movements for the character.
   * Pauses the walking sound and sets up various movement and animation intervals.
   */
  playAnimation() {
    this.walkingSound.pause();

    this.setupMovementIntervals();
    this.setupHurtAnimationInterval();
    this.setupRelaxAndSleepIntervals();
    this.setupJumpAndWalkAnimationInterval();
  }

  /**
   * Sets up intervals to handle character movement and camera updates.
   * The interval runs at 60 frames per second.
   */
  setupMovementIntervals() {
    setInterval(() => {
      this.handleRightMovement();
      this.handleLeftMovement();
      this.handleJump();
      this.updateCamera();
    }, 1000 / 60);
  }

  /**
   * Handles the character's movement to the right.
   * Moves the character to the right if the right arrow key is pressed and the character is within the level boundaries.
   * Plays walking sound if enabled, marks the last key press, sets the character state to not relaxed, and pauses the sleeping sound.
   */
  handleRightMovement() {
    if (this.canMoveRightSide()) {
      this.moveRight();
      this.otherDirection = false;
      if (window.sound) {
        this.walkingNois();
      }
      this.safeLastKeyPress();
      this.pepeRelaxed = false;
      this.sleepingSound.pause();
    }
  }

  /**
   * Condition for movement to right side
   */
  canMoveRightSide() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.end_x;
  }

  /**
   * Handles the character's movement to the left.
   * Moves the character to the left if the left arrow key is pressed and the character is within the level boundaries.
   * Plays walking sound if enabled, marks the last key press, sets the character state to not relaxed, and pauses the sleeping sound.
   */
  handleLeftMovement() {
    if (this.canMoveLeftSide()) {
      this.moveLeft();
      this.otherDirection = true;
      if (window.sound) {
        this.walkingNois();
      }
      this.safeLastKeyPress();
      this.pepeRelaxed = false;
      this.sleepingSound.pause();
    }
  }

  /**
   * Condition for movement to left side
   */
  canMoveLeftSide() {
    return this.world.keyboard.LEFT && this.x > -599;
  }

  /**
   * Handles the character's jump action.
   * Makes the character jump if the spacebar is pressed and the character is not in the air.
   * Plays jump sound if enabled, sets the character state to not relaxed, marks the last key press, and pauses the sleeping sound.
   */
  handleJump() {
    if (this.canJump()) {
      this.jump();
      if (window.sound) {
        this.jumpSound.play();
      }
      this.pepeRelaxed = false;
      this.safeLastKeyPress();
      this.sleepingSound.pause();
    }
  }

  /**
   * Condition to jump
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isInAir();
  }

  /**
   * Updates the camera position based on the character's x-coordinate.
   * Adjusts the camera's x-coordinate to keep the character centered.
   */
  updateCamera() {
    this.world.cameraX = -this.x + 100;
  }

  /**
   * Sets up an interval to handle the hurt animation for the character.
   * The interval runs every 150 milliseconds.
   */
  setupHurtAnimationInterval() {
    setInterval(() => {
      this.handleHurtAnimation();
    }, 150);
  }

  /**
   * Handles the character's hurt animation.
   * Triggers the hurt animation if the character is hurt and not already injured.
   * Plays hurt sound if enabled and pauses the sleeping sound.
   */
  handleHurtAnimation() {
    if (this.canBeHurt()) {
      this.animate(this.HURT_PEPE);
      if (window.sound) {
        this.hurtNois();
      }
      this.sleepingSound.pause();
    }
  }

  /**
   * Condition to be hurt
   */
  canBeHurt() {
    return this.isHurt() && !this.isInjured;
  }

  /**
   * Sets up intervals to handle the character's relaxing, sleeping, and death states, and updates the game time.
   * The interval runs every 100 milliseconds.
   */
  setupRelaxAndSleepIntervals() {
    setInterval(() => {
      this.handleRelaxing();
      this.handleSleeping();
      this.handleDeath();
      this.updateTime();
    }, 100);
  }

  /**
   * Handles the character's relaxing animation.
   * Triggers the relaxing animation if the time difference is between 5 and 8 seconds and the character is not already relaxed.
   * Plays the tired sound if enabled.
   */
  handleRelaxing() {
    if (
      this.calculateTimeDiff() > 5 &&
      this.calculateTimeDiff() < 8 &&
      !this.pepeRelaxed
    ) {
      this.animate(this.RELAXING_PEPE);
      if (window.sound) {
        this.tiredSound.play();
      }
      this.pepeRelaxed = true;
    }
  }

  /**
   * Handles the character's sleeping animation.
   * Triggers the sleeping animation if the time difference is greater than 7 seconds.
   * Plays the sleeping sound if enabled and sets its volume to 0.3.
   */
  handleSleeping() {
    if (this.calculateTimeDiff() > 7) {
      this.animate(this.SLEEPING_PEPE);
      if (window.sound) {
        this.sleepingSound.play();
      }
      this.sleepingSound.volume = 0.3;
    }
  }

  /**
   * Handles the character's death animation and related actions.
   * Triggers the death animation if the character is dead and has not already been marked as dead.
   * Plays the death sound if enabled, mutes all sounds, resets the character's energy, and switches to the end screen.
   */
  handleDeath() {
    if (!this.pepeDied && this.isDead()) {
      this.pepeDied = true;
      this.oneCycle(this.DEATH_PEPE);
      if (window.sound) {
        this.deathNoise();
        mute();
      }
      this.energy = 100;
      this.switchScreen();
    }
  }

  /**
   * Switches the view to the end screen.
   * Hides the game canvas and game controls, and shows the end screen.
   */
  switchScreen() {
    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("endScreen").classList.remove("d-none");
    document.getElementById("gameControls").classList.add("d-none");
    document.getElementById("openScreenImg").classList.add("d-none");
  }

  /**
   * Updates the current time and calculates the time difference.
   * Sets the current time to the current timestamp and calculates the difference since the last recorded time.
   */
  updateTime() {
    this.currentTime = new Date().getTime();
    this.calculateTimeDiff();
  }

  /**
   * Sets up an interval to handle the character's jump and walk animations.
   * The interval runs every 30 milliseconds.
   */
  setupJumpAndWalkAnimationInterval() {
    setInterval(() => {
      this.handleJumpAndWalkAnimation();
    }, 30);
  }

  /**
   * Handles the character's jump and walk animations.
   * Triggers the jump animation if the character is in the air.
   * Triggers the walk animation if the right or left arrow key is pressed.
   */
  handleJumpAndWalkAnimation() {
    if (this.isInAir()) {
      this.animateJump(this.JUMPING_PEPE);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.animate(this.WALKING_PEPE);
    }
  }

  /**
   * Animates the character's jump based on the current vertical speed.
   * Selects and sets the appropriate image from the provided array based on the vertical speed.
   *
   * @param {string[]} arr - An array of image paths for the jump animation.
   */
  animateJump(arr) {
    if (this.speedY > 0) {
      for (let i = 0; i < 4; i++) {
        let path = arr[i];
        this.img = this.imageChache[path];
      }
    }
    if (this.speedY == 0) {
      let path = arr[4];
      this.img = this.imageChache[path];
    }

    if (this.speedY < 0 && this.speedY >= -40) {
      for (let i = 5; i < 6; i++) {
        let path = arr[i];
        this.img = this.imageChache[path];
      }
    }
    if (this.speedY == -40) {
      for (let i = 6; i < 9; i++) {
        let path = arr[i];
        this.img = this.imageChache[path];
      }
    }
  }

  /**
   * Pushes the character back upon collision with an enemy.
   * Initiates a pushback animation and handles character movement and damage upon collision.
   *
   * @param {number} enemyX - The x-coordinate of the enemy.
   * @param {number} enemyWidth - The width of the enemy.
   * @param {number} enemyY - The y-coordinate of the enemy.
   * @param {object} enemy - The enemy object.
   * @param {number} index - The index of the enemy in the array.
   */
  pushPepeBack(enemyX, enemyWidth, enemyY, enemy, index) {
    let pushBackAnimation = setInterval(() => {
      if (
        this.isInAir() &&
        this.speedY < 0 &&
        !this.enemyCrushed &&
        this.y + this.height - 60 <= enemyY
      ) {
        this.jumpAfterCrush(enemy, index);
      } else if (
        !this.isInAir() &&
        (this.x < enemyX || this.x + this.width > enemyX + enemyWidth)
      ) {
        this.pushbackDirection(enemyX);
        this.speedY = 0;
        this.y -= 15;
        this.hit(10);
      }
    }, 10);
    this.clearIntervall(pushBackAnimation);
  }

  /**
   * Initiates a jump after crushing an enemy, sets speedY to 35, marks enemy as crushed,
   * inflicts damage to the enemy, and deletes the enemy from the array after a delay.
   *
   * @param {object} enemy - The enemy object.
   * @param {number} index - The index of the enemy in the array.
   */
  jumpAfterCrush(enemy, index) {
    this.speedY = 35;
    this.enemyCrushed = true;
    enemy.hit(15);
    this.deleteEnemy(index);
  }

  /**
   * Deletes the enemy from the array after a delay of 500 milliseconds.
   *
   * @param {number} index - The index of the enemy in the array.
   */
  deleteEnemy(index) {
    setTimeout(() => {
      this.world.level.enemies.splice(index, 1);
      this.enemyCrushed = false;
    }, 500);
  }

  /**
   * Pushes the character in the opposite direction of the enemy upon collision.
   *
   * @param {number} enemyX - The x-coordinate of the enemy.
   */
  pushbackDirection(enemyX) {
    if (this.x < enemyX) {
      this.x -= 20;
    } else {
      this.x += 20;
    }
  }

  /**
   * Clears the specified interval after a delay of 100 milliseconds.
   *
   * @param {number} pushBackAnimation - The ID of the interval to clear.
   */
  clearIntervall(pushBackAnimation) {
    setTimeout(() => {
      clearInterval(pushBackAnimation);
    }, 100);
  }

  /**
   * Plays the walking sound if the character is not in the air.
   */
  walkingNois() {
    if (!this.isInAir()) {
      this.walkingSound.volume = 0.5;
      this.walkingSound.play();
    }
  }

  /**
   * Plays the hurt sound.
   */
  hurtNois() {
    this.hurtSound.volume = 0.5;
    this.hurtSound.play();
  }

  /**
   * Plays the death sound and triggers the game over sound after a delay of 1000 milliseconds.
   */
  deathNoise() {
    this.deathSound.play();
    setTimeout(() => {
      this.deathSound.pause();
      this.gameOver.play();
    }, 1000);
  }
}
