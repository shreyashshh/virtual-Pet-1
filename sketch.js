var dog,sadDog,happyDog, database;
var foodS, foodStock;

var addFood;
var foodObj;

//create feed and lastfed variable here 
var feed, lastFed

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
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

  drawSprites();
  //add styles here

}



