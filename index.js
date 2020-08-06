const readlineSync = require('readline-sync');

class TicTacToe {
  constructor () {
    this.user1_name = '',
    this.user2_name = '',
    this.players = ['',''];
    this.activePlayer = '';
    this.table = [1,2,3,4,5,6,7,8,9];
    this.borderLine = ` ------------- \n`;
    this.firstRow = ` | ${this.table[0]} | ${this.table[1]} | ${this.table[2]} |\n`;
    this.secondRow = ` | ${this.table[3]} | ${this.table[4]} | ${this.table[5]} |\n`;
    this.thirdRow = ` | ${this.table[6]} | ${this.table[7]} | ${this.table[8]} |\n`;
    this.initBoard = this.borderLine + this.firstRow + this.borderLine + this.secondRow + this.borderLine + this.thirdRow + this.borderLine;
    this.gameIsRunning = false;
    this.countMoves = 0;
  }

  promptNames () {
    this.user1_name = readlineSync.question('Enter user1 name:  ')
    this.user1_name = this.user1_name.toUpperCase()
    this.players[0] = this.user1_name;
    this.user2_name = readlineSync.question('Enter user2 name:  ')
    this.user2_name = this.user2_name.toUpperCase()
    this.players[1] = this.user2_name;
    this.activePlayer = this.players[0];
    this.gameIsRunning = true;
  }

  logNames () {
    console.log(this.user1_name, this.user2_name)
  }

  logBoard () {
    console.log(this.initBoard)
  }

  logPlayers () {
    console.log(this.players)
  }

  checkWinner (player) {
    let symbol = this.getSymbol(player);
    if (this.countMoves < 9) {
      let checkHoriz = this.checkHoriz();
      let checkVert = this.checkVert();
      let checkDiag = this.checkDiag();
      if (checkHoriz || checkVert || checkDiag) {
        this.gameIsRunning = false;
        console.log(`CONGRATULATIONS ${player}, YOU WIN THIS GAME!!!`)
        this.newGamePrompt()
      }
    } else {
      this.gameIsRunning = false;
      console.log(`IT'S A DRAW!!! NOBODY WINS!!!`)
      this.newGamePrompt()
    }
  }

  checkDiag () {
    let checkMinor = this.checkLine([this.table[0], this.table[4], this.table[8]]);
    let checkMajor = this.checkLine([this.table[6], this.table[4], this.table[2]]);
    if (checkMinor || checkMajor) {
      return true;
    }
    return false;
  }

  checkVert () {
    for (let i = 0; i < 3; i++) {
      let chunk = [this.table[i], this.table[i+3], this.table[i+6]]
      let check = this.checkLine(chunk);
      if (check) {
        return true
      }
    }
    return false;
  }

  checkHoriz () {
    for(let i = 0; i < this.table.length; i += 3) {
      let chunk = this.table.slice(i, i+3);
      let check = this.checkLine(chunk);
      if (check) {
        return true
      }
    }
    return false;
  }

  checkLine (array) {
    if(array.length === 0 || array.length < 3 || !array) {
      return false;
    }
    if(array[0] === array[1] & array[1] === array[2]) {
      return true;
    }
    return false;
  }

  newGamePrompt () {
    let answer;
      while(!answer) {
        answer = readlineSync.question(`DO YOU WANT TO PLAY AGAIN (Y/N)`)

      if (answer[0].toLowerCase() === 'y') {
        answer = true;
        this.init()
      } else if (answer[0].toLowerCase() === 'n'){
        answer = true;
        console.log('------------------------\nTHANK YOU FOR PLAYING!!!\n------------------------')
      } else {
        console.log('[ INVALID INPUT ], please type "Y" or "N"')
        answer = false;
      }
    }
  }

  playerMove () {
    let player = this.activePlayer;
    let move;
    while (!move && this.gameIsRunning) {
      move = readlineSync.question(`${this.activePlayer}'s move, please type cell number:  `)
      if (!move || !parseInt(move)) {
        console.log('[ INVALID INPUT ], make sure you use numbers from 1 to 9')
        move = undefined;
      } else {
        console.log('Input submitted, thank you!');
        this.countMoves++;
        this.modifyBoard(player, parseInt(move));
        this.checkWinner(player);
        this.switchPlayer();
        this.playerMove();
      }
    }
  }

  getSymbol (player) {
    return this.players.indexOf(player) === 0 ? 'X' : 'O';
  }

  modifyBoard (player, move) {
    let symbol = this.getSymbol(player);
    this.table[move - 1] = symbol;
    this.firstRow = ` | ${this.table[0]} | ${this.table[1]} | ${this.table[2]} |\n`;
    this.secondRow = ` | ${this.table[3]} | ${this.table[4]} | ${this.table[5]} |\n`;
    this.thirdRow = ` | ${this.table[6]} | ${this.table[7]} | ${this.table[8]} |\n`;
    this.initBoard = this.borderLine + this.firstRow + this.borderLine + this.secondRow + this.borderLine + this.thirdRow + this.borderLine;
    this.logBoard();
  }

  switchPlayer () {
    if (this.players.indexOf(this.activePlayer) === 0) {
      this.activePlayer = this.players[1];
    } else {
      this.activePlayer = this.players[0];
    }
  }

  logRules() {
    console.log(`Hi, ${this.players[0]} and ${this.players[1]}!!! This is a simple TicTacToe game, you will make your moves one by one,\n${this.players[0]} will start first with "X" , all cells are ranged from 1 to 9.\nTo put you symbol, please type the number of the cell!\n-----------------------------------------------------------------------------`)
  }

  init () {
    this.table = [1,2,3,4,5,6,7,8,9];
    this.firstRow = ` | ${this.table[0]} | ${this.table[1]} | ${this.table[2]} |\n`;
    this.secondRow = ` | ${this.table[3]} | ${this.table[4]} | ${this.table[5]} |\n`;
    this.thirdRow = ` | ${this.table[6]} | ${this.table[7]} | ${this.table[8]} |\n`;
    this.initBoard = this.borderLine + this.firstRow + this.borderLine + this.secondRow + this.borderLine + this.thirdRow + this.borderLine;
    this.countMoves = 0;
    this.promptNames()
    this.logBoard()
    this.logRules()
    this.playerMove()
  }

}

let game = new TicTacToe ();
game.promptNames()
game.logBoard()
game.logRules()
game.playerMove()

