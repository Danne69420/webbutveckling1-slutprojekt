

let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
console.log(playAgain);
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.getElementById("left");
let bottom = document.getElementById("bottom");
let right = document.getElementById("right");
let up = document.getElementById("top");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let controlCalledThisTick = false;

/* DOMContentLoaded event is fired once html content has finished loading */
document.addEventListener("DOMContentLoaded", function () {
  up.addEventListener("click", () => (direction = -width));
  bottom.addEventListener("click", () => (direction = +width));
  left.addEventListener("click", () => (direction = -1));
  right.addEventListener("click", () => (direction = 1));
    document.addEventListener("keydown", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
    createBoard();

  });

/* This function makes the game board. Each square of the board is a div. TODO: maybe make board size not fixed. 
   For some reason the first time we create the board it becomes twice as big as we want it to. No clue why this happens, but for now i just make half as many divs the first time-*/
  function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 50; i++) {
        /* Make a div element */
      let div = document.createElement("div");
        /* make newly created div a child of the grid element */
      grid.appendChild(div);
    }
  }

  function resetBoard(){
    //clear the board before bulding a new one
    while(grid.firstChild){
      grid.removeChild(grid.lastChild);
    }
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
      /* Make a div element */
    let div = document.createElement("div");
      /* make newly created div a child of the grid element */
    grid.appendChild(div);
  }

  }
  function startGame() {
    /* get divs here since they are created durting runtime */
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    //random apple 
    direction = 1;
    scoreDisplay.innerHTML = "Score: " + score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    /* addes the "snake" class to the squares thet currentSnake occupies */
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
  }

  //this function is called every tick
  function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    controlCalledThisTick = false;
    if (checkForHits(squares)) {
      popup.style.display = "flex";
      return clearInterval(interval);
    } else {
      moveSnake(squares);
    }
  }

  function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
  }

  function checkForHits(squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  }

  function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple(squares);
      score++;
      scoreDisplay.textContent = "Score: " + score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcome, intervalTime);
    }
  }

  function randomApple(squares) {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }

  //There is a bug where if you press two arrow keys in quick succession it registers both the inputs. This is can lead to direction being set to the opposite direction, leading to a game over.
  function control(e) {
    console.log("Balls");
    if(controlCalledThisTick === false){
      if (e.key === "ArrowRight" && direction != -1) {
        direction = 1; // right
      } else if (e.key === "ArrowUp" && direction != +width) {
        direction = -width; //if we press the up arrow, the snake will go ten divs up
      } else if (e.key === "ArrowLeft" && direction != 1) {
        direction = -1; // left, the snake will go left one div
      } else if (e.key === "ArrowDown" && direction != -width) {
        direction = +width; // down the snake head will instantly appear 10 divs below from the current div
      }  
    }
    controlCalledThisTick = true;
  }


function replay() {
    resetBoard();
    startGame();
    popup.style.display = "none";
  }