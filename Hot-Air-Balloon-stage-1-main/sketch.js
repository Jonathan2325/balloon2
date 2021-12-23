var balloon, balloonImg, backgroundImg, bg, topObs,bottomObs, birdImg, building, buildingImg, edges, balloonObsImg,invisibleObs,score=0;

function preload() {
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  backgroundImg = loadImage("assets/bg.png");
  birdImg = loadImage("assets/obsTop2.png")
  buildingImg = loadImage("assets/obsBottom1.png");
  building2Img = loadImage("assets/obsBottom2.png");
  building3Img = loadImage("assets/obsBottom3.png");
  balloonObsImg = loadImage("assets/obsTop1.png");
}
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 25);
  bg = createSprite(windowWidth / 2, 600)
  bg.addImage('bg', backgroundImg)
  bg.scale = 1.6

  balloon = createSprite(300, 200, 20, 50)
  balloon.addAnimation('balloon', balloonImg);
  balloon.scale = 0.3;
  edges = createEdgeSprites();
  invisibleObsGroup = new Group();

}
function draw() {
  background("black");
  if (keyDown("SPACE")) {
    balloon.velocityY = -5
  }
  balloon.velocityY = balloon.velocityY + 0.08
  balloon.collide(edges[3])
  collideInvisibleObs();
  spawnTopObs();
  spawnBottomObs();
  drawSprites()
  calculateScore();
}
function spawnTopObs() {
  if (frameCount % 100 === 0) {
    topObs = createSprite(windowWidth - 20, random(30, 100))
    topObs.velocityX = -4
    topObs.scale = 0.2
  topObs.lifetime = windowWidth-20 /4
  balloon.depth = topObs.depth+1
    var rand = Math.round(random(1, 2))
    switch (rand) {
      case 1: topObs.addImage("bird", birdImg);
        break;
      case 2: topObs.addImage("balloonObs", balloonObsImg);
        break;
      default: break;
    }
  }
}

function spawnBottomObs(){
  if(frameCount % 120===0){
    bottomObs = createSprite(windowWidth-20,windowHeight-200)
    bottomObs.velocityX = -4
    bottomObs.scale = 0.2
    bottomObs.lifetime = windowWidth-20/4
    balloon.depth = bottomObs.depth+1
    var random2 = Math.round(random(1,3))
    switch (random2){
      case 1:bottomObs.addImage("building",buildingImg)
      break;
      case 2:bottomObs.addImage("building2",building2Img)
      break;
      case 3:bottomObs.addImage("building",building3Img)
      break;
      default:break;
    }
  }
}

function collideInvisibleObs(){
  if(frameCount % 100===0||frameCount % 120===0){
invisibleObs= createSprite(windowWidth-20,windowHeight/2,10,windowHeight)
invisibleObs.velocityX = -4;
invisibleObs.lifetime = windowWidth-20/4
//invisibleObs.visible = false
invisibleObsGroup.add(invisibleObs)
  }
}

function calculateScore(){
  if(balloon.isTouching(invisibleObsGroup)){
  score++;
  }
  textSize(30)
  fill("red");
  text("Score:"+ score,200,50);
}