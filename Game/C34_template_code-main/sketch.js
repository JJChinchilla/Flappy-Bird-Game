var backgroundImage
var birdImage;
var bird
var coinImage;
var pipeBottomImage;
var pipeTopImage;
var pipeBottom;
var pipeTop;
var pipeTopGroup;
var pipeBottomGroup;
var gameState = "play"
var birdStill;
var score = 0

function preload(){
    //preloading all images
    backgroundImage = loadImage("Images/background1.png");
    coinImage = loadImage("Images/coin.png");
    pipeBottomImage = loadImage("Images/pipeBottom.png");
    pipeTopImage = loadImage("Images/pipeTop.png");
    birdImage = loadAnimation("Images/bird1.png","Images/bird2.png","Images/bird3.png","Images/bird4.png");
    birdStill = loadAnimation("Images/bird2.png")
}
function setup(){
    //creates canvas
    createCanvas(1400,550);
    //creates bird animation
    bird = createSprite(100,220,100,100);
    bird.addAnimation("bird", birdImage);
    bird.addAnimation("birdStill", birdStill);
    bird.changeAnimation("bird");
    
    bird.scale= 0.5;

    //creates groups
    pipeTopGroup = new Group()
    pipeBottomGroup = new Group()
    coinGroup = new Group()
    
   
}
function draw(){
    background(backgroundImage);
    textSize(20)
    //shows score
    text("Score:"+ score,50,50);
    //when gameState is at play state, pipes and coins start spawning
    if(gameState == "play"){
    spawningPipesTop();
    spawningPipesBottom();
    
    spawningCoin();
    
    //lets player contol bird
    if(keyIsDown(UP_ARROW)){
        bird.position.y = bird.position.y-10; //when up arrow is pressed, bird moves up by 10
       
    }
     if(keyIsDown(DOWN_ARROW)){
        bird.position.y = bird.position.y+10; //when down arrow is pressed, bird moves down by 10
        
    }
    //makes collider thingy smaller
    bird.setCollider("rectangle",0,0,250,200)
}
//makes bird stay in canvas
    if(bird.position.y<=30){
        bird.position.y = 30;
    }
    if(bird.position.y>=510){
        bird.position.y = 510;
    }
    
    
    drawSprites()
    //when bird touches pipeTopGroup or pipeBottomGroup, game state is at end state
    //runs function collidingBird and gameOver
    if(bird.isTouching(pipeTopGroup) || bird.isTouching(pipeBottomGroup)){
    gameState = "end"
        collidingBird(); 
        gameOver();
    }
    //when bird touches coingroup, coin is collected (point is added and coin is removed)
    if(bird.isTouching(coinGroup)){
    bird.overlap(coinGroup, function(collector, collected)
    {
        score = score+1;
        collected.remove();
    })
    
    }
   //console.log(frameCount)

}
//pipes spawn when the framecount divide by 200 has a remainder of 0
function spawningPipesTop(){
    if(frameCount%200 == 0){
        position = [10,30,50,70] //pipe position
        pipeTop = createSprite(1400, random(position),100,100);
        pipeTop.velocityX = -4 //lets pipe move
        pipeTop.addImage(pipeTopImage)//adds the image
        pipeTopGroup.add(pipeTop); // adds in group
        topPipeCount = topPipeCount+1
    }
}
//pipes spawn when the framecount divide by 300 has a remainder of 0
function spawningPipesBottom(){
    if(frameCount%300 == 0){
        position = [490, 470, 450, 430 ] //position of pipe
        pipeBottom = createSprite(1400, random(position),100,100); //random postion
        pipeBottom.velocityX = -4; //lets pipe move
        pipeBottom.addImage(pipeBottomImage) //adds the image
        pipeBottomGroup.add(pipeBottom); // adds in group
        
    }
}
//coin spawn when the framecount divide by 330 has a remainder of 10
function spawningCoin(){
    if(frameCount%330 == 10){
        coin = createSprite(1400, Math.round(random(20,500)),100,100); //randoms position
        coin.velocityX = -4; //makes it move
        coin.addImage(coinImage) //adds image
        coinGroup.add(coin); //adds in group
        coin.scale = 0.1 //makes it tiny
    }
}

function collidingBird(){

        pipeTopGroup.setVelocityXEach(0) //makes it stop moving
        pipeBottomGroup.setVelocityXEach(0) //makes it stop moving
        coinGroup.setVelocityXEach(0) //makes it stop moving
        bird.velocityY = 0 //make it stop moving so player can't control it
        bird.changeAnimation("birdStill"); //changes the animation so it doesn't move
       
    }
    //POP UP SWAL
function gameOver(){
    swal({
        title: `Game Over`,
        text: "Oops you died....!!!",
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });

}




