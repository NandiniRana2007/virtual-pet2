//Create variables here
var dog,dogImg,happyDog,database,foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
	//load images here
dogImg=loadImage("images/dogImg.png")
happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();
  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(25);

  dog=createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale=0.2;
  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("addFood")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  
}


function draw() {  
background(46,139,87);
foodObj.display()
fedTime=database.ref('feedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})
fill("white")
textSize(15)
if(lastFed>=12){
  text("lastFeed"+lastFed%12+"pm",350,30)
}
else if(lastFed===0){
  text("lastFeed:12am",350,30)
}
else{
  text("lastFeed"+lastFed+"am",350,30)
}


  drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodstock(foodS)
}
function feedDog(){
  dog.addImage(happyDog)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodstock(foodObj.getFoodStock()*0)
  }
  else{
    foodObj.updateFoodstock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




