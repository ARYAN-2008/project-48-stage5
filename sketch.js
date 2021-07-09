var PLAY=1;
var END=0;
var gameState=PLAY;
var background, backgroundImg;
var shooter, shooterImg; 
var satellite, satelliteImg, satelliteGroup;
var comets, comet1, comet2, comet3, comet4, cometsGroup;
var bullets, bulletsImg, bulletsGroup;
var explosion, explosionA;
var gameOver, gameOverImg;
var restart, restartImg;
var score;


function preload(){
backgroundImg = loadImage("background 1.jpg");
shooterImg = loadImage("shooter image.png");
comet1 = loadImage("comet 1.png");
comet2 = loadImage("comet 2.png");
comet3 = loadImage("comets 3.png");
comet4 = loadImage("comets 4.png");
bulletsImg = loadImage("bulletnew 2.png");
satelliteImg = loadImage("sattelite.png");
explosionA = loadAnimation("E1.png","E2.png", "E3.png", "E4.png", "E5.png", "E6.png");
gameOverImg = loadImage("gameover11.png");
restartImg = loadImage("restart.png");

  
}



function setup() {
  createCanvas(700, 600);

  shooter = createSprite(300,560,20,50);
  shooter.addImage(shooterImg); 
  shooter.scale = 0.3;

  explosion=createSprite(300, 540);
  explosion.addAnimation("explosion", explosionA);
  explosion.scale=1.3;


  satelliteGroup = createGroup();
  bulletsGroup = createGroup();
  cometsGroup = createGroup();
  score=0;
  
  gameOver=createSprite(350, 300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.3

  restart=createSprite(335, 370);
  restart.addImage(restartImg);
  restart.scale=0.4
}

function draw() {
 background(backgroundImg);

 if(gameState===PLAY){
   explosion.visible=false;
   gameOver.visible=false;
   restart.visible=false;

  if(keyDown("left")){
    shooter.x=shooter.x-8;
  }
   
  if(keyDown("right")){
   shooter.x=shooter.x+8;
  }
   if (keyDown("space")) {
     var bullets = createBullet();
     bullets.addImage(bulletsImg);
      bullets.x = shooter.x;
    }
    if(bulletsGroup.isTouching(cometsGroup)){
      score = score+10;
      cometsGroup.destroyEach();
    }
  
    if(bulletsGroup.isTouching(satelliteGroup)){
      score = score-10;
      satelliteGroup.destroyEach();
    }
    if(score<=-10){
      gameState=END;
    }
     createSatellite();
     spawnComets();
 }
 else if(gameState===END){
  explosion.visible=true;
  gameOver.visible=true;
  restart.visible=true;

    shooter.x=300;

    cometsGroup.setVelocityYEach(0);
    bulletsGroup.setVelocityYEach(0);
    satelliteGroup.setVelocityYEach(0);
    
    cometsGroup.setLifetimeEach(-1);
    bulletsGroup.setLifetimeEach(-1);
    satelliteGroup.setLifetimeEach(-1);

   shooter.depth = explosion.depth;
   explosion.depth = explosion.depth + 1;

 }
 
 if(mousePressedOver(restart)){
   restartGame();
 }

   
  drawSprites();

  fill("white");
  strokeWeight(2);
  stroke("black");
  textSize(22);
  text("Score: "+score, 585, 60);
 
}

function restartGame(){
gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
explosion.visible=false;

cometsGroup.destroyEach();
bulletsGroup.destroyEach();
satelliteGroup.destroyEach();
score=0;

}

function createBullet() {
  bullets= createSprite(480, 500, 5, 10);
  bullets.velocityY = -60;
  bullets.scale = 0.1;
  bulletsGroup.add(bullets);


  return bullets;
}

function createSatellite(){
  if(frameCount%140===0){
  var satellite = createSprite(Math.round(random(20, 650)),0, 10, 10);
  satellite.addImage(satelliteImg);
  satellite.velocityY = (3 + 2*score/100);
  satellite.lifetime = 200;
  satellite.scale = 0.6;
  satelliteGroup.add(satellite);
  if(score===60){
    frameCount%50===0;
  }
  

  satellite.depth = shooter.depth;
  shooter.depth = shooter.depth + 1;
}
}
function spawnComets(){
  if (frameCount % 100 === 0){
   var comets = createSprite(Math.round(random(20, 650)),0,40,40);
   comets.velocityY = (4 + 2*score/100);

   
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: comets.addImage(comet1);
              break;
      case 2: comets.addImage(comet2);
              break;
      case 3: comets.addImage(comet3);
              break;
      case 4: comets.addImage(comet4);
              break;
      default: break;
    }
              
    comets.scale = 0.4;
    comets.lifetime = 200;
   
   cometsGroup.add(comets);
   comets.depth = shooter.depth;
   shooter.depth = shooter.depth + 1;

}}
