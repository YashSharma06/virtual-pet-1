

//Create variables here
var dog, happydog, database, foodstock;
var foods = 0;

function preload()
{
  //load images here
  dog1 = loadImage("images/Dog.png");
  doghappy = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dog1);
  dog.scale = 0.3;
  database = firebase.database();
  foodstock = database.ref('Food');
  foodstock.on("value", function readstock(data){
   foods = data.val();
  })
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writestock(foods);
    dog.addImage(doghappy);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dog1);
  }
  
  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  text("Press 'UP ARROW' to feed the dog", 120, 50);
  text("FOOD REMAINING:"+foods, 160, 180);
}
function writestock(x){

  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


