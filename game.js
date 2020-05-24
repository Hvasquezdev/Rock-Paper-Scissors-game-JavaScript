class Game {
  constructor (scoreEl, homeBoard, resultBoard, playerOne, playerTwo) {
    this._isPlaying = false;
    this._winner = undefined;
    this._scoreEl = scoreEl;
    this._homeBoard = homeBoard;
    this._resultBoard = resultBoard;
    this._playerOne = playerOne;
    this._playerTwo = playerTwo;
  }

  getStatus () {
    return this._isPlaying;
  }

  setStatus (status) {
    this._isPlaying = status;
  }

  getWinner () {
    return this._winner;
  }

  setWinner () {
    if (this._playerOne.getSelection() === this._playerTwo.getSelection()) {
      this._winner = 'Deuce';
    } else {
      const selectionWinner = this.getSelectionWinner(this._playerOne.getSelection(), this._playerTwo.getSelection());

      if (selectionWinner === this._playerOne.getSelection()) {
        this._winner = this._playerOne.getName();
      } else {
        this._winner = this._playerTwo.getName();
      }
    }
  }

  getSelectionWinner (selectionOne, selectionTwo) {
    let output = undefined;

    switch (selectionOne) {
      case 'rock':
        output = (['scissor']).includes(selectionTwo) ? selectionOne : selectionTwo;
        break;

      case 'paper':
        output = (['rock']).includes(selectionTwo) ? selectionOne : selectionTwo;
        break;
    
        case 'scissor':
        output = (['paper']).includes(selectionTwo) ? selectionOne : selectionTwo;
        break;
    }

    return output;
  }

  updateScreen () {
    const currentScreenScore = parseInt(document.querySelector('.banner__right__score').innerText);
    // Update counter only if the value changes
    if (currentScreenScore !== this._playerOne.getScore()) {
      this._scoreEl.innerText = this._playerOne.getScore();
    }

    // Toggle result and home screen depending of the game status
    if (!game.getStatus() && game.getWinner() !== undefined) {
      this._homeBoard.classList.toggle('d-none', true);
      this._resultBoard.classList.toggle('d-none', false);
      const resultBoardButtons = this._resultBoard.children[0].children;
      const resultBoardMessage = this._resultBoard.children[1].children[0];

      // Clean rock, paper, scissor classes of the buttons
      for (const btn of resultBoardButtons) {
        btn.classList.forEach((className) => {
          if (['rock', 'paper', 'scissor'].includes(className)) {
            btn.classList.remove(className)
          }
        });
      }

      // Set class rock, paper or scissor to show 
      // The correct icon in center of the button
      resultBoardButtons[0].classList.add(this._playerOne.getSelection());
      resultBoardButtons[1].classList.add(this._playerTwo.getSelection());

      // Show message with the game current winner
      switch (this.getWinner()) {
        case this._playerOne.getName():
          resultBoardMessage.innerHTML = 'You Win!';
          break;

        case this._playerTwo.getName():
          resultBoardMessage.innerHTML = 'You Lose!';
          break;
      
        default:
          resultBoardMessage.innerHTML = 'Deuce!';
          break;
      }

      return;
    }
  
    this._homeBoard.classList.toggle('d-none', false);
    this._resultBoard.classList.toggle('d-none', true);
    return;
  }

  updateCounter () {
    switch (this.getWinner()) {
      case this._playerOne.getName():
        this._playerOne.incrementScore();
        break;
  
      case this._playerTwo.getName():
        this._playerTwo.incrementScore();
        break;
    }
  }

  resetGame () {
    this._isPlaying = true;
    this._winner = undefined;

    this.updateScreen();
  }
}