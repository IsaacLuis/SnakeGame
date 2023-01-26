//const canvas = document.getElementById("my-canvas")
//const context = canvas.getContext('2d')
const button = document.getElementById("start-button")

const button2 = document.getElementById('play-again-button');

// canvas H 750 * W 750

const scale = 35;
let snakeHeadX  = 27  //  scale * 5;
let snakeHeadY = 27   //  scale * 5; 


let direction;

var blockSize = 33;
var total_row = 27; //total row number         //heigt
var total_col = 27; //total column number  // width
var canvas;
var context;
 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
 
// Set the total number of rows and columns
var speedX = 0;  //speed of snake in x coordinate.
var speedY = 0;  //speed of snake in Y coordinate.
 
var snakeBody
 
var foodX;
var foodY;
 
var End;
let foodCopyX;
let foodCopyY;
window.onload = function () {

    
    document.getElementById("start-button").onclick = function () {
    // Start ----
    Start()   
    }


}

function placeFood() {
 console.log("placing food..")
  // in x coordinates.
  foodX = Math.floor(Math.random() * total_col) * blockSize;
   
  //in y coordinates.
  foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function Start(){

  
  console.log("Starting function")

  button.style.visibility = "hidden"
  End= false;
  snakeBody = [];

  // Set canvas height and width
  canvas = document.getElementById("my-canvas");
  canvas.height = total_row * blockSize;
  canvas.width = total_col * blockSize;
  context = canvas.getContext("2d");
  canvas.style.visibility = "visible"
  placeFood();
  document.addEventListener("keyup", changeDirection);  //for movements
  // Set snake speed
  setInterval(update, 1000 / 10);
  
  }     
      
    








function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
    if (End === true) {
      console.log("Come back")
        return gameOver()
    }
  
    
    // Background of a Game
    context.fillStyle = "#31bcaa"
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set food color and position
    
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize-8 , blockSize -8);
    
    if (snakeX + 25 > foodX && snakeX < foodX + 25 && snakeY + 25 > foodY && snakeY < foodY + 25) {
     console.log("Coliding")
     // if snakeX > foodX && snakeX < foodX + 25 && snakeY > foodY && snakeY < foodY + 25
      snakeBody.push([foodX , foodY]);

      //console.log(foodX)
      
      //snakeBody.push([snakeBodyCopy.pop(),snakeBodyCopy.pop()]) 
         
        //placeFood();
        console.log(snakeBody);
      
      placeFood();
      console.log(foodX,foodY)
      }
 
    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
 
/*
    ctx.beginPath();
  ctx.arc(snakeX, snakeY, scale/2, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.arc(playerSnake.x+scale/2, playerSnake.y+scale/2, scale/2, 0, 2 * Math.PI);
*/
    
    context.fillStyle = "green"; //sqr work
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    //context.fillRect(snakeX, snakeY, blockSize, blockSize); //sqr work
    context.beginPath();
    context.arc(snakeX, snakeY, blockSize/2, 0, 2 * Math.PI);
    context.fill()


  for (let i = 0; i < snakeBody.length; i++) {
    //context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);  //sqr work
    console.log("snakeBody " ,snakeBody)
    context.beginPath()
    context.arc(snakeBody[i][0], snakeBody[i][1], blockSize/2, 0, 2 * Math.PI);
    context.fill()
    //console.log("score = " ,snakeBody.length)
   // context.clearRect(0, 0, canvas.width, canvas.height);
    
}
//context.fill();

;



    
      
    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {
         
        // Out of bound condition
        //End = true;
         gameOver()
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             
            // Snake eats own body
            //End = true;
           gameOver()
        }
    }
}

function gameOver() 
{window.location.reload()
  clearInterval(update)
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  

  console.log("Overrrr....")
  End= true
  button2.style.visibility = "visible"
  
  
  document.getElementById("play-again-button").onclick = function() {
    
    console.log("pressing...")
    
    //context.clearRect(0, 0, canvas.width, canvas.height);
    Start()
  }
}



function drawSnakeHead(direction) {
  
    
  context.beginPath(direction);
  if(direction==="Up") {
      context.arc(snakeX+(blockSize/5), snakeY+(blockSize/5), blockSize/8, 0, 2 * Math.PI);
      context.arc(snakeX+blockSize-(blockSize/5), snakeY+(blockSize/5), blockSize/8, 0, 2 * Math.PI);
  }
  else if(direction==="Down") {
      context.arc(snakeX+(blockSize/5), snakeY+blockSize-(blockSize/5), blockSize/8, 0, 2 * Math.PI);
      context.arc(snakeX+blockSize-(blockSize/5), snakeY+blockSize-(blockSize/5), blockSize/8, 0, 2 * Math.PI);
  }
  else if(direction==="Left") {
      context.arc(snakeX+(blockSize/5), snakeY+(blockSize/5), blockSize/8, 0, 2 * Math.PI);
      context.arc(snakeX+(blockSize/5), snakeY+blockSize-(blockSize/5), blockSize/8, 0, 2 * Math.PI);
  }
  else {
      context.arc(snakeX+blockSize-(blockSize/5), snakeY+(blockSize/5), blockSize/8, 0, 2 * Math.PI);
      context.arc(snakeX+blockSize-(blockSize/5), snakeY+blockSize-(blockSize/5), blockSize/8, 0, 2 * Math.PI);
  }
  context.fillStyle = "black";
  context.fill();

   
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
        drawSnakeHead("Up")
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
        drawSnakeHead("Down") 
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
        drawSnakeHead("Left") 
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;

      drawSnakeHead("Right")
    }
}
 







// Randomly place food









/*
function startGame() {

  console.log("Starting")
  //Invisible
  button.style.visibility = "hidden"
  //logo.style.visibility = "hidden"
  //logo.style.height = "0px"
  // Visible
  canvas.width = "750"
  canvas.height = "750"
  canvas.style.visibility = "visible"
  
  
  directionVar = "Right";
    direction = "Right";
    previousDir = "Right";
  
    speedX = scale * speed;
    speedY = 0;

}
  
  window.onload = function() {
   
    document.getElementById("start-button").onclick = function() {
      
      startGame()
    // checkCollision() 
      //moveSnakeForward()
      
          
    }
    document.addEventListener('keydown', e => {
      playerSnake.draw();
      switch (e.keyCode) {
        case 38:
          //changeDirection("Up")
          playerSnake.moveUp();
          break;
        case 40:
          //changeDirection("Down")
          playerSnake.moveDown();
          
          break;
        case 37:
          //changeDirection("Left")
          playerSnake.moveLeft();
          break;
        case 39:
          //changeDirection("Right")
          
         playerSnake.moveRight();
          break;
      }
  
    });
  }

  
*/

  



