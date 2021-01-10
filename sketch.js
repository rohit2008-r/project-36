var dog,dogimg,foods,foodStock, database,happydog;
var position;
var button1,button2;
var fedTime,lastFed,foodObj;

function preload()
{
  //load images here
  dogimg=loadImage("dogImg.png")
  happydog=loadImage("dogimg1.png")
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  createCanvas(500,500);
  dog=createSprite(250,300)
  dog.addImage(dogimg);
  dog.scale=0.2


  
}

function draw(){
  background(0);
 

  
   
    button1 = createButton('feed the dog ');
    button1.mousePressed(feedDog);
    button1.position(720,140);
    button2 = createButton('add Food');
    button2.mousePressed(addFoods)
    button2.position(720,110);
    fedTime=database.ref('FeedTime')
    fedTime.on("value",function(data){
    lastFed=data.val();})
    fill("yellow");
    textSize(50)
    if(lastFed>=12){
      text("Last Feed :"+lastFed%12+" PM," ,350, 30);
    }else if(lastFed===0){
      text("Last Feed 12 AM",350,30);
    } else if(lastFed===0){
      text("Last Feed "+lastFed+"AM",350,30);
      
    }
    
    drawSprites();
  
}

function feedDog(data){
  dog.addImage(happydog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}


function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
  
}

