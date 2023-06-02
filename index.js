const playerElement = document.querySelector('#player');
const boardElement = document.querySelector('#game-board');

const balls = [];

const movePlayer = (direction) => {
    // new position of the player
    const newPosition = playerElement.offsetLeft + direction * 10;
    // position of the board
    const { left, right } = boardElement.getBoundingClientRect();
    const minLeft = playerElement.offsetWidth / 2;
    const maxRight = right - left - minLeft;
    // move the player if it is in the board
    if (newPosition >= minLeft && newPosition < maxRight) {
        playerElement.style.left = `${newPosition}px`;
    }
}

const handleKeyboard = (e) => {
    console.log(e.code);
    // move player based on the key
    switch (e.code) {
        case 'ArrowLeft': movePlayer(-1); break;
        case 'ArrowRight': movePlayer(1);
    }
}

const createBalls = () => {
    // create balls randomly
    const shouldCreateBalls = Math.round(Math.random());
    if (!shouldCreateBalls) return;
    // create balls
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.top = -40 + 'px';
    ball.style.left = `${Math.floor(Math.random() * (boardElement.offsetWidth - 80) + 40)}px`;
    // add the ball to the game board
    boardElement.appendChild(ball);
    balls.push(ball);
}

const moveBalls = () => {
    // move the balls
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
    // move the balls to the down position
        ball.style.top = `${ball.offsetTop + 10}px`;
    // if the player catches the ball, remove it
    if (ball.offsetTop >= boardElement.offsetHeight) {
        balls.splice(i, 1);
        ball.remove();
        document.body.innerHTML = `<h1 class="game-over">Game Over</h1>`;
        }
    }
}

//Intervals
setInterval(createBalls, 500);
setInterval(moveBalls, 300)

window.addEventListener('keydown', handleKeyboard);