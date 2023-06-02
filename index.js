const playerElement = document.querySelector('#player');
const boardElement = document.querySelector('#game-board');

const balls = [];

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


const createBalls = () => {
    // Create balls randomly
    const shouldCreateBalls = Math.round(Math.random());
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
    // Move the balls to the down position
        ball.style.top = `${ball.offsetTop + 10}px`;
    // If the player catches the ball, remove it
    if (ball.offsetTop >= boardElement.offsetHeight) {
        balls.splice(i, 1);
        ball.remove();
        document.body.innerHTML = `<h1 class="game-over">Game Over</h1>`;
        }
    }
}

// Intervals
setInterval(createBalls, 2000);
setInterval(moveBalls, 300)

window.addEventListener('keydown', handleKeyboard);