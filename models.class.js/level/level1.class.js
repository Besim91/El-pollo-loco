const level1 = new Level(
  [
    new Background("img/5_background/layers/air.png", -799),
    new Background("img/5_background/layers/3_third_layer/2.png", -799),
    new Background("img/5_background/layers/2_second_layer/2.png", -799),
    new Background("img/5_background/layers/1_first_layer/2.png", -799),

    new Background("img/5_background/layers/air.png", 0),
    new Background("img/5_background/layers/3_third_layer/1.png", 0),
    new Background("img/5_background/layers/2_second_layer/1.png", 0),
    new Background("img/5_background/layers/1_first_layer/1.png", 0),

    new Background("img/5_background/layers/air.png", 799),
    new Background("img/5_background/layers/3_third_layer/2.png", 799),
    new Background("img/5_background/layers/2_second_layer/2.png", 799),
    new Background("img/5_background/layers/1_first_layer/2.png", 799),

    new Background("img/5_background/layers/air.png", 799 * 2),
    new Background("img/5_background/layers/3_third_layer/1.png", 799 * 2),
    new Background("img/5_background/layers/2_second_layer/1.png", 799 * 2),
    new Background("img/5_background/layers/1_first_layer/1.png", 799 * 2),

    new Background("img/5_background/layers/air.png", 799 * 3),
    new Background("img/5_background/layers/3_third_layer/2.png", 799 * 3),
    new Background("img/5_background/layers/2_second_layer/2.png", 799 * 3),
    new Background("img/5_background/layers/1_first_layer/2.png", 799 * 3),

    new Background("img/5_background/layers/air.png", 799 * 4),
    new Background("img/5_background/layers/3_third_layer/1.png", 799 * 4),
    new Background("img/5_background/layers/2_second_layer/1.png", 799 * 4),
    new Background("img/5_background/layers/1_first_layer/1.png", 799 * 4),

    new Background("img/5_background/layers/air.png", 799 * 5),
    new Background("img/5_background/layers/3_third_layer/2.png", 799 * 5),
    new Background("img/5_background/layers/2_second_layer/2.png", 799 * 5),
    new Background("img/5_background/layers/1_first_layer/2.png", 799 * 5),
  ],
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
  ],
  [
    new CloudsOne(),
    new CloudsOne(),
    new CloudsTwo(),
    new CloudsTwo(),
    new CloudsOne(),
    new CloudsOne(),
    new CloudsTwo(),
    new CloudsTwo(),
    new CloudsOne(),
    new CloudsOne(),
    new CloudsTwo(),
    new CloudsTwo(),
  ]
);
