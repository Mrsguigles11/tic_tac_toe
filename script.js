
const gameBoard = {
    board : [1, 2, 3, 4, 5, 6, 7, 8, 9]
}

const gameControl = {
    checkVerticalRows : function (board) {
        if (board[0] === board[3] && board[6]) {
            console.log("Winner");
        }
        else if (board[1] === board[4] && board[7]) {
            console.log("Winner");
        }
        else if (board[2] === board[5] && board[8]) {
            console.log("WinnerV");
        }
    },
    checkHorizontalRows : function (board) {
        if (board[0] === board[1] && board[2]) {
            console.log("Winner");
        }
        else if (board[3] === board[4] && board[5]) {
            console.log("Winner");
        }
        else if (board[6] === board[7] && board[8]) {
            console.log("WinnerH");
        }
    },
    checkDiagonalRows : function (board) {
        if ((board[0] === board[4]) && (board[0] === board[8])) {
            console.log("WinnerD");
        }
        else if (board[2] === board[4] && board[6]) {
            console.log("Winner");
        }
    },
    setBoard : function (input, square) {
        gameBoard.board.splice(square, 1, input);
        console.log(gameBoard.board);
        this.checkVerticalRows(gameBoard.board);
        this.checkHorizontalRows(gameBoard.board);
        this.checkDiagonalRows(gameBoard.board);
    },
}

function createPlayer (name, input) {
    const takeTurn = function (square) {gameControl.setBoard(input, square);}
    return {name, input, takeTurn};
}

const playerOne = createPlayer("Harry", "X");
const playerTwo = createPlayer("Bob", "O");

playerOne.takeTurn(0);
playerOne.takeTurn(4);
playerOne.takeTurn(8);
