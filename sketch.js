var dog,sadDog,happyDog, database;
var position;
var foodS,foodStock;
var addFood,feedDoG;
var foodObj;
var feed,lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food()

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDoG=createButton("Feed the DoG")
  feedDoG.position(600,95);
  feedDoG.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
 
  

 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  // var food_stock_val = foodObj.get
  //  if(food_stock_val <= 0){
  //   foodObj.updateFoodStock(food_stock_val *0);
  // }else{
  //   foodObj.updateFoodStock(food_stock_val -1);
  
  // }
}

function feedDog()
{
  dog.addImage(happyDog);
    // foodObj.deductFood()
    foodS--;
    database.ref('/').update({
      Food:foodS,
      FeedTime:hour()
 
    })
    
    if(lastFed > 12){
      text("Last Feed :"(lastFed-12),"PM",550,50)
      }else if(lastFed==0){
        text("Last Feed : 12 AM",550,50);
      }else{
        text("Last Feed :",lastFed,"AM",550,50)
      }
    
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


