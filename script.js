const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 19;
let score = 0;
let lastPrintTime = 0;
let snake = [{x: 13,y: 15}]
let food = { x: 6, y: 7 };
let inputDir = { x: 0, y: 0 };

// musicSound.play();

function main(time) {
    window.requestAnimationFrame(main);
    if ((time - lastPrintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPrintTime = time;
    gameEngine();
}

function isCollide() {
    for (let index = 1; index < snake.length; index++) {
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    if (isCollide()) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!");
        snake = [{ x: 13, y: 15 }];
        score = 0;
    }
    
    if (snake[0].y === food.y && snake[0].x === food.x) {
        foodSound.play();
        score += 1; 
        if (score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            hiscoreBox.innerHTML = "HiScore: " + hiScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += inputDir.x;
    snake[0].y += inputDir.y;

    board.innerHTML = "";
    snake.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal))
}else{
    hiScoreVal = JSON.parse(hiScore);
    hiscoreBox.innerHTML = "HiScore: " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});