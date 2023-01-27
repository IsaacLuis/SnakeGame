//const canvas = document.getElementById("my-canvas")
//const context = canvas.getContext('2d')
const button = document.getElementById("start-button")

const arrayImg = new Image();
 arrayImg.src = 'https://github.com/yuri-brito/snake-game/blob/main/imgFrutas/pngwing.com%20(1).png?raw=true'

 const virusImg = new Image();
 virusImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1OQcm5TseXmWlDjlObF-44tnz0ls2OOgWw&usqp=CAU'




let blockSize = 27;
let total_row = 23;     //total row number         //heigt
let total_col = 23;     //total column number  // width
let canvas;
let context;
 
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
 
// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x .
let speedY = 0;  //speed of snake in Y .
let count = 0;
let score = 0;
let snakeBody;
 
let foodX;
let foodY;

let End;

window.onload = function () {

    
    document.getElementById("start-button").onclick = function () {
    // Start ----
    Start()   
    }


}



function placeFood() {
 console.log("placing food..")
  // in x 
  foodX = Math.floor(Math.random() * total_col) * blockSize;
   
  //in y 
  foodY = Math.floor(Math.random() * total_row) * blockSize;
}


function placeVirus() {
  console.log("placing food..")
   // in x 
   virusX = Math.floor(Math.random() * total_col) * blockSize;
    
   //in y 
   virusY = Math.floor(Math.random() * total_row) * blockSize;
   context.drawImage(virusImg, virusX, virusY, blockSize, blockSize);
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
  placeVirus();
  document.addEventListener("keyup", changeDirection);  //for movements
  // Set snake speed
  setInterval(update, 1000 / 10);
  
  }     
      
    
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
    if (End === true) {
        return gameOver()
    }
    
    score = snakeBody.length - count;
    // Background of a Game
    context.fillStyle = "#31bcaa"
    context.fillRect(0, 0, canvas.width, canvas.height);
     
  context.drawImage(virusImg,virusX,virusY,blockSize,blockSize)  
  context.drawImage(arrayImg, foodX, foodY, blockSize, blockSize);
    if (snakeX + blockSize +3 > foodX && snakeX < foodX + blockSize +3 && snakeY + blockSize +3 > foodY && snakeY < foodY + blockSize +3) 
    {
     // if snakeX > foodX && snakeX < foodX + 25 && snakeY > foodY && snakeY < foodY + 25
      snakeBody.push([foodX , foodY]);  
      placeFood();
      placeVirus();
      }
 
 
    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    if(snakeX + blockSize + 1 > virusX && snakeX < virusX + blockSize +1 && snakeY + blockSize +1 > virusY && snakeY < virusY + blockSize +1) {

      count+=2
      placeVirus();
    }
  
    context.fillStyle = "green"; //sqr work
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.beginPath();
    context.arc(snakeX, snakeY, blockSize/2, 0, 2 * Math.PI);
    context.fill()


  for (let i = 0; i < snakeBody.length; i++) {
    console.log("snakeBody " ,snakeBody)
    context.beginPath()
    context.arc(snakeBody[i][0], snakeBody[i][1], blockSize/2, 0, 2 * Math.PI);
    context.fill()  
}
//context.fill();
    //if(snakeX >= canvas.width || snakeX < 0 || snakeY >= canvas.height || snakeY < 0)
    if (snakeX <= 0  || snakeX >= total_col * blockSize || snakeY <= 0 || snakeY >= total_row * blockSize) 
    {
        // Out of bound 
         gameOver()
    }
 
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                        //  If Snake eats own body
           gameOver()
        }
    }
    showScore()
  }

function gameOver() 
{

  console.log("Overrrr....")
  End= true
  button.style.visibility = "visible"
  if (score > 10) {
    context.fillStyle = "white";
    context.font = "30px serif";
    context.fillText(`Your score is ${score}.  You've won!`, 200, 150);
  } else {
    context.fillStyle = "white";
    context.font = "20px serif";
    context.fillText(`Your score is ${score}.  You've lost. You need 10!`, 200, 150);
  }
  
  document.getElementById("start-button").onclick = function () {
    window.location.reload()
   
    }
    
  
}


function showScore() {
  //context.fillStyle = "black";
  context.fillRect(10, 10, 130, 50);

  context.fillStyle = "white";
  context.font = "24px serif";
  context.fillText(`Score: ${score}`, 35, 43);
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
 


