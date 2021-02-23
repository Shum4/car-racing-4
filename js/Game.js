class Game {
  constructor(){

  }

  //to read the values of the gamestate from the database
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  //to update the gamestate in the database
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //creating car sprites and adding images to them
    car1 = createSprite(100,200);
    car1.addImage(car1Image);
   
    car2 = createSprite(300,200);
    car2.addImage(car2Image);
    
    car3 = createSprite(500,200);
    car3.addImage(car3Image);
   
    car4 = createSprite(700,200);
    car4.addImage(car4Image);
    
    //array cars to store all the car sprites together
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      
      background(groundImage)
      
      //image(image, x, y, width, height)
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 210;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("navy");
          ellipse(x,y+70,30,30);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3860){
      gameState=2;
    }

    drawSprites();
  }

  //function to end the 
  end(){
    //to display message in the console
    console.log("Game Ended!!!");
  }
}
