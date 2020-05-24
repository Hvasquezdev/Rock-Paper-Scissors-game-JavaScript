class Player {
  constructor (name) {
    this._name = name;
    this._score = 0;
    this._selection = undefined;
  }

  incrementScore () {
    this._score++;
  }

  decrementScore () {
    this._score--;
  }

  getScore () {
    return this._score;
  }

  getName () {
    return this._name;
  }

  setName () {
    this._name = name;
  }

  getSelection () {
    return this._selection;
  }

  setSelection (val) {
    this._selection = val;
  }

  setRandomSelection () {
    const options = ['rock', 'paper', 'scissor'];
    const index = Math.round(Math.random() * (options.length - 1));
    this._selection = options[index];
  }
}