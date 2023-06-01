const playerElement = document.querySelector('.player');
const gameArea = document.querySelector('.container');

const movePlayer = (direction) => {
    // new position of the player
    const newPosition = playerElement.offsetLeft + direction * 20;
    // get position of the game area
    const {left, right} = gameArea.getBoundingClientRect();
    // size of the game area
    const minLeft = playerElement.offsetWidth;
    const maxRight = right - left - minLeft;
    // if player is inside the game area - move player
    if (newPosition >= 0 && newPosition < maxRight) {
        playerElement.style.left = `${newPosition}px`;
    }
};

const handleKeyboard = (e) => {
    // console.log(e.keyCode);
    switch (e.code) {
        case 'ArrowLeft': movePlayer(-1); break;
        case 'ArrowRight': movePlayer(1); break;
    }
}

window.addEventListener('keydown', handleKeyboard);