const playerElement = document.querySelector('.player');
const boardElement = document.querySelector('.game-board');
const highScoreElement = document.querySelector('.counter');
const titleElement = document.querySelector('.title');

const balls = [];
let score = 0;

const movePlayer = (directionX, directionY) => {
    // new player position in the board
    const newPosX = playerElement.offsetLeft + directionX * 50;
    const newPosY = playerElement.offsetTop + directionY * 50;

    const { left, right, top, bottom } = boardElement.getBoundingClientRect();
    const minLeft = playerElement.offsetWidth / 2;
    const maxRight = right - left - minLeft;
    const minTop = playerElement.offsetHeight / 2;
    const maxBottom = bottom - top - minTop;

    // Move the player if is inside the game board
    if (newPosX >= minLeft && newPosX < maxRight && newPosY >= minTop && newPosY < maxBottom) {
        playerElement.style.left = `${newPosX}px`;
        playerElement.style.top = `${newPosY}px`;
    }
};

const handleKeyboard = (e) => {
    console.log(e.code);
    // Moving player
    switch (e.code) {
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
    }
};

let shouldCreateBalls = true;

const createBalls = () => {
    if (!shouldCreateBalls) return;
    // Create balls
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.top = -40 + 'px';
    ball.style.left = `${Math.floor(Math.random() * (boardElement.offsetWidth - 80) + 40)}px`;
    // Add the ball to the game board
    boardElement.appendChild(ball);
    balls.push(ball);
}

const moveBalls = () => {
    // Move the balls
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        // Move the balls down
        ball.style.top = `${ball.offsetTop + 1}px`;

        // If the ball reaches the bottom, game over
        if (ball.offsetTop >= boardElement.offsetHeight) {
            balls.splice(i, 1);
            ball.remove();
            gameOverScreen();
        }
        // Check for collision with player
        if (isCollision(playerElement, ball)) {
            balls.splice(i, 1);
            ball.remove();
            score++;
            highScoreElement.textContent = `${score}`;
        }
    }
};

const isCollision = (element1, element2) => {
    // Get the bounding rects of the two elements
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
};

const gameOverScreen = () => {
    const gameOverDiv = document.createElement('div');
    gameOverDiv.classList.add('game-over');

    boardElement.innerHTML = '';
    boardElement.classList.remove('game-board')
    boardElement.appendChild(gameOverDiv);

    shouldCreateBalls = false;

    titleElement.textContent = 'Game Over';
    titleElement.classList.add('end-title');

    const startAgainButton = document.createElement('button');
    startAgainButton.textContent = 'Start Again';
    boardElement.appendChild(startAgainButton);
    startAgainButton.classList.add('start-again-btn');
    startAgainButton.addEventListener('click', () => {
         location.reload();
    });
}


// Intervals
setInterval(createBalls, 700);
setInterval(moveBalls, 10)

window.addEventListener('keydown', handleKeyboard);