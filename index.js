const playerElement = document.querySelector('#player');
const boardElement = document.querySelector('#game-board');

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

window.addEventListener('keydown', handleKeyboard);