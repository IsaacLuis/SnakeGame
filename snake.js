//const canvas = document.getElementById("my-canvas")
//const ctx = canvas.getContext('2d')
const button = document.getElementById("start-button")


// canvas H 750 * W 750

const scale = 35;
let snakeHeadX  = 27  //  scale * 5;
let snakeHeadY = 27   //  scale * 5; 




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
 
var snakeBody = [];
 
var foodX;
var foodY;
 
var gameOver = false;
 
window.onload = function () {

    document.getElementById("start-button").onclick = function() {
    console.log("Starting")
  
  button.style.visibility = "hidden"
  
        
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


}
 
function update() {
    if (gameOver) {
        return;
    }
 
    // Background of a Game
    context.fillStyle = "#31bcaa"
    context.fillRect(0, 0, canvas.width, canvas.height);
 
    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
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
    
    //context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
  //  context.fillRect(snakeX, snakeY, blockSize, blockSize);
    //context.arc(snakeX, snakeY, blockSize/2, 0, 2 * Math.PI);
//context.fillStyle = "green";
drawSnakeHead()
    for (let i = 0; i < snakeBody.length; i++) {
        //context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        //context.arc(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        drawSnakeHead()
    }
    
    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {
         
        // Out of bound condition
        gameOver = true;
        alert("Game Over"); // GameOver()
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
             
            // Snake eats own body
            gameOver = true;
            alert("Game Over") // GameOver()
        }
    }
}
 
function drawSnakeHead() {
    context.beginPath();
    context.arc(snakeX+scale/2, snakeY+blockSize/2, blockSize/2, 0, 2 * Math.PI);
    context.fillStyle = "green";
    context.fill();
    //eyes
    context.beginPath();
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
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}
 
// Randomly place food
function placeFood() {
 
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;
     
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}








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

  

