var score = 0, canvas, animalCenter = 333, foodCenter = 230, rockHitScore = 0;
var backImage, groundImage, animalImage, foodImage, stopperImage;
var groundSprite, animalSprite, foodSprite, stopperSprite;
var foodGroup, stopperGroup;


function preload(){
  backImage = loadImage("jungle.jpg");
  animalImage = loadAnimation("Monkey_01.png",     "Monkey_02.png","Monkey_03.png","Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  groundImage = loadImage("ground.png");
  foodImage = loadImage("banana.png");
  stopperImage = loadImage("stone.png");
  foodGroup = createGroup();
  stopperGroup = createGroup();
}
/* In setup() function create a sprite of background
add image to background
Give it a velocity and start from center of image to reset it.
*/
function setup() {
  //createCanvas(500, 300);
  canvas = createSprite(200,200,600,400);
  canvas.addImage(backImage);
  animalSprite = createSprite(75, animalCenter, 20, 20);
  animalSprite.addAnimation("Monkey", animalImage);
  animalSprite.scale = 0.1;
  canvas.velocityX = -9;
  groundSprite = createSprite(200, 366, 400, 10);
  groundSprite.visible = false;
}

function draw() {
  background("white");

  if (animalSprite.isTouching(foodGroup)) {
    // If you touch the food, then eat it
    score = score + 2;
    foodSprite.destroy();
  }
  
  if (animalSprite.isTouching(stopperGroup)) {
    // If touching a rock, scale reverts to original
    animalSprite.scale = 0.1;
    rockHitScore = score;
  }
  
  if (canvas.x < -50) {
    // Keep moving the canvas, so it appears unending
    canvas.x = 250;
  }
  
  if (World.frameCount % 85 == 0) {
    // Spawn a new banana at some regular interval
    spawnBanana();
  }
  
  if (World.frameCount % 90 == 0) {
    // Spawn a new banana at some regular interval
    spawnStopper();
  }
  
  if (animalSprite.isTouching(groundSprite)) {
    // If touching the ground, prevent monkey from falling through
    animalSprite.y = animalCenter;
    animalSprite.velocityY = 0;
  } else {
    // If not touching the ground, simulate gravity by increasing velocityY
    animalSprite.velocityY = animalSprite.velocityY + 0.8;
  }
  

  switch (score - rockHitScore) {
    case 0:
      animalSprite.scale = 0.1;
      animalCenter = 333;
      foodCenter = 230;
      break;
    case 10:
      animalSprite.scale = 0.12;
      animalCenter = 327;
      foodCenter = 220;
      break;
    case 20:
      animalSprite.scale = 0.14;
      animalCenter = 321;
      foodCenter = 210;
      break;
    case 30:
      animalSprite.scale = 0.16;
      animalCenter = 315;
      foodCenter = 200;
      break;
    case 40:
      animalSprite.scale = 0.18;
      animalCenter = 310;
      foodCenter = 190;
      break;
    default:
      break;
  }
  
  /*
  if (stoppergroup.isTouching(animal)) {
    player.scale = 0.2;
  }
  */

  drawSprites();
  
  stroke("black");
  textSize(25);
  fill("white");
  text("Score " + score, 100, 50);
  //text("RHS " + rockHitScore, 100, 100);
  //text("AS.y " + animalSprite.y, 100, 100);
  //text("AS.velocityY " + animalSprite.velocityY, 100, 150);
  //text("AC " + animalCenter, 100, 200);
}

function keyPressed() {
  if (keyCode == UP_ARROW && animalSprite.y >= animalCenter) {
    // Only allow jumping if you are touching the ground
    animalSprite.velocityY = -10;
  }
}

function spawnBanana() {
  foodSprite = createSprite(400, foodCenter, 20, 20);
  foodSprite.addImage(foodImage);
  foodSprite.scale = 0.05;
  foodSprite.velocityX = canvas.velocityX;
  foodSprite.lifetime = 80;
  foodGroup.add(foodSprite);
}

function spawnStopper() {
  stopperSprite = createSprite(400, 370, 20, 20);
  stopperSprite.addImage(stopperImage);
  stopperSprite.scale = 0.15;
  stopperSprite.velocityX = canvas.velocityX;
  stopperSprite.lifetime = 80;
  stopperGroup.add(stopperSprite);
}