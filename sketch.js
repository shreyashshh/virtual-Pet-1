var dog,sadDog,happyDog, database;
var foodS, foodStock;

var addFood;
var foodObj;

//create feed and lastfed variable here 
var feed, lastFed

function preload(){
Dog=loadImage("images/dogImg.png");
Dog1=loadImage("images/dogImg1.png");
}
	
function setup() {
	database=firebase.database();
  createCanvas(1000,4000);

  foodObj = new Food();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(freeDog);
  
}

function draw() {  
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
lastFed=data.val()
  })

  
  //write code to read fedtime value from the database

fill(255,255,255);

if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM,350,30");
}else if(lastFed===0){
  text("Last Feed: 12 AM",350,30)
}else{
  text("Last Feed:"+ lastFed+"AM",350,30)
}


drawSprites();
}

//function to read food Stock
function redStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}


function feedDog(){
dog.addImage(happyDog);

//write code here to update food stock and last fed time
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val <= 0){
   foodObj.updateFoodStock(food_stock_val * 0);
}else{
foodObj.updateFoodStock(food_stock_val -1);
}

database.ref('/').update({
Food:foodObj.getFoodStock(),
   FeedTime:hour()

})

}



}



