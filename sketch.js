//declaring all the variables
var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

function preload(){
  //1. absolute path = C/Shammim/Desktop/Whitehatjr/carRacingStage1.5/images/car1.png"
  //it specifies the path starting right from the drive name
  //2. relative path = images/car1.png
  //it's the path of the image in the current folder in use
  
  //loading all the images for the game
  
  car1Image=loadImage("./images/car1.png");
  car2Image=loadImage("./images/car2.png");
  car3Image=loadImage("./images/car3.png");
  car4Image=loadImage("./images/car4.png");
  groundImage=loadImage("./images/ground.png");
  trackImage=loadImage("./images/track.jpg");
  
}

function setup(){
  //created a canvas to fit the screen
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 
  //created a database from firebase.database
  database = firebase.database();
  
  //created a game from the Game class
  game = new Game();

  //calling the getState function from Game class
  game.getState();

  //calling the start function from Game class
  game.start();
}


function draw(){
  //if playerCount is 4 , update gameState to play
  if(playerCount === 4){
    game.update(1);
  }

  //if gameState is one start playing
  if(gameState === 1){
    clear();
    game.play();
  }
  //if gamestate is 2
  if(gameState===2){
    game.end();
  }
}
