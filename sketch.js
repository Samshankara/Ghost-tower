var gameState = "play";
var towerImg;
var tower;
var doorImg;
var doorGroup;
var climberImg;
var climberGroup;
var ghostImg;
var ghost;
var rodGroup;
var score = 0
var spooky;
function preload() {
  spooky = loadSound("spooky.wav");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  doorGroup = new Group();
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  climberGroup = new Group();
  rodGroup = new Group();
}
function draw() {
  background("black");
  camera.position.y = ghost.y;
  camera.position.x = 300;
  if(gameState === "play") {
    text("Score" + score, 500, 50);
  spawnDoors();      
    score = score +1;
    
  if(tower.y >400) {
    tower.y = 300;
  }
  if(keyDown("space")) {
    ghost.velocityY = -5;
  }
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x +5;
  }
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -5;
  }
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  ghost.velocityY = ghost.velocityY +0.8;
    if(rodGroup.isTouching(ghost)) {
      ghost.destroy();
      gameState = "end";
    }
  }
  if(gameState === "end") {
    rodGroup.destroyEach();
    doorGroup.destroyEach();
    tower.visible = false;
    climberGroup.destroyEach();
    textColor = "yellow";
    textSize(30)
    text("GAME OVER", 210, 240);
    
  }
  drawSprites();
  
}
function spawnDoors() {
  if(frameCount%240 === 0) {
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 600;
    doorGroup.add(door);
    var climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    climberGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    var rod = createSprite(200, 15, 100, 20);
    rod.x = climber.x;
    rod.velocityY = 1;
    rod.lifetime = 600;
    rodGroup.add(rod);
    rod.visible = false;
  }
}