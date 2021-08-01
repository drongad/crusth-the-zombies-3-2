const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground,rightWall
var bridge, joinPoint
var breakButton
var zombie, sadZombie
var axe
var zombie1Img,zombie2Img,zombie3Img,zombie4Img, backgroundImg
var stones  = []
function preload(){

  zombie1Img = loadImage("zombie1.png")
  zombie2Img = loadImage("zombie2.png")
  zombie3Img = loadImage("zombie3.png")
  zombie4Img = loadImage("zombie4.png")
  sadZombie = loadImage("sad_zombie.png")
  backgroundImg = loadImage("background.png")
 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0,height-15,width*2,20,true)
  rightWall = new Base(width-80,300,450,45,true)
  leftWall = new Base(80,300,450,45,true)
  bridge = new Bridge(23, { x: 50, y: height / 2 });
  joinPoint = new Base(width-180,height/2 -100,20,20,true)
  
  Matter.Composite.add(bridge.body, joinPoint);
  jointLink = new Link(bridge, joinPoint);

  for(var i =0;i<8;i++){
    var x = random(width/2-200, width/2+300)
    var y = random(-100,100)
    var stone = new Stone(x,y,80,80)
    stones.push(stone)

  }
    
  zombie = createSprite(width/2,height-110)
  zombie.addAnimation("LeftToRight", zombie1Img,zombie2Img,zombie1Img,)
  zombie.addAnimation("RightToLeft", zombie3Img,zombie4Img,zombie3Img)
  zombie.addImage("sad",sadZombie)
  zombie.scale = 0.1
  zombie.velocityX = 10
  
  breakButton = createButton("")
  breakButton.position(width-200,height/2-50)
  breakButton.class("breakbutton")
  breakButton.mouseClicked(HandleButton)
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  

  bridge.show()
  for( var stone of stones){
    stone.show()
    var pos = stone.body.position
    var distance = dist(zombie.x,zombie.y,pos.x,pos.y)
    
  
  if(distance<=45){
    zombie.velocityX = 0
    zombie.changeImage("sad")
    Matter.Body.setVelocity(stone.body,{x:10,y:-10})
    collided = true
  }
}
  if(zombie.position.x >= width-300){
    zombie.velocityX=-10
    zombie.changeAnimation("RightToLeft")

  }
  if(zombie.position.x<=300){
    zombie.velocityX=10
    zombie.changeAnimation("LeftToRight")
  }
 


  drawSprites()

}
function HandleButton(){
  jointLink.detatch()
  setTimeout(()=>{
    bridge.break()
  },1500)
}