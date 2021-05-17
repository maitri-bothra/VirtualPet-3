var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var gameState;
var bedroom,garden,livingroom,washroom;

function preload(){
  sadDog = loadImage("dogImg.png");
  happyDog = loadImage("happy dog.png");
  milkImg = loadImage("milk.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  livingroom = loadImage("Living Room.png");
  washroom = loadImage("Wash Room.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 600);

  foodObj=new Food();
  
  dog = createSprite(250,290,10,10);
  dog.addImage(sadDog);
  dog.scale = 0.27;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  milkBotltle2 = createSprite(185,340,10,10);
  milkBotltle2.addImage(milkImg);
  milkBotltle2.scale = 0.1;
  milkBotltle2.visible = false;

}


function draw() {  
  background("yellow")

  foodObj.display();
  writeStock(foodS);
  

  var gameStateRef=database.ref('gameState');
  gameStateRef.on('value',function(data){
    gameState = data.val();
  });

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.27;
    dog.y=290;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.27;
    milkBotltle2.visible=false;
    dog.y=290;
  }
  
  var Bath=createButton("BATHING");
  Bath.position(600,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Sleep=createButton("SLEEPING");
  Sleep.position(680,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var Play=createButton("PLAYING");
  Play.position(518,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  var PlayInGarden=createButton("PARK");
  PlayInGarden.position(600,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBotltle2.visible=false;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining:  "+foodS,150,50);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}