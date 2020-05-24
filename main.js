const playerButtons = document.querySelectorAll('.game__player-button');
const tryAgainButton = document.querySelector('.try-again__button');
const scoreEl = document.querySelector('.banner__right__score');
const resultBoard = document.querySelector('.game__results');
const homeBoard = document.querySelector('.game__home');

const playerOne = new Player('Hector');
const playerTwo = new Player('Home');
const game = new Game(scoreEl, homeBoard, resultBoard, playerOne, playerTwo);
let playerTwoTimeOut = undefined;

game.setStatus(true);

tryAgainButton.addEventListener('click', () => game.resetGame(), false);

playerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!game.getStatus()) { return; }

    game.setStatus(false);
    playerOne.setSelection(button.dataset.selection);

    playerTwoTimeOut = setTimeout(() => {
      playerTwo.setRandomSelection();
    
      game.setWinner({
        playerOne: {
          name: playerOne.getName(),
          selection: playerOne.getSelection()
        },
        playerTwo: {
          name: playerTwo.getName(),
          selection: playerTwo.getSelection()
        }
      });

      game.updateCounter()
      game.updateScreen()

      clearTimeout(playerTwoTimeOut);
    }, 500);
  }, false);
});

