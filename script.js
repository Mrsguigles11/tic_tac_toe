
const gameBoard = (function () {
   let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
   return {board};
})();

const gameControl = (function () {

    let turnCount = 0;

    const checkWinner = function(index) {
        if (gameBoard.board[index] === "X") {
            console.log("You Win " + playerOne.name);
            turnCount = 0;
            gameBoard.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
        else {
            console.log("You Win" + playerTwo.name);
            turnCount = 0;
            gameBoard.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
    }

    const checkVerticalRows = function (board) {
        if ((board[0] === board[3]) && (board[0] === board[6])) {
            checkWinner(0);
        }
        else if ((board[1] === board[4]) && (board[1] === board[7])) {
            checkWinner(1);
        }
        else if ((board[2] === board[5]) && (board[2] === board[8])) {
            checkWinner(2);
        }
    }
    const checkHorizontalRows = function (board) {
        if ((board[0] === board[1]) && (board[0] === board[2])) {
            checkWinner(0);
        }
        else if ((board[3] === board[4]) && (board[3] === board[5])) {
            checkWinner(3);
        }
        else if ((board[6] === board[7]) && (board[6] === board[8])) {
            checkWinner(6);
        }
    }
    const checkDiagonalRows = function (board) {
        if ((board[0] === board[4]) && (board[0] === board[8])) {
            checkWinner(0);
        }
        else if ((board[2] === board[4]) && (board[2] === board[6])) {
            checkWinner(2);
        }
    }
    const checkForDraw = function (board) {
        if (turnCount === 9) {
            console.log("Its a draw");
        }
    }
    const setBoard = function (input, square) {
        gameBoard.board.splice(square, 1, input);
        console.log(gameBoard.board);
        checkVerticalRows(gameBoard.board);
        checkHorizontalRows(gameBoard.board);
        checkDiagonalRows(gameBoard.board);
        turnCount++;
        checkForDraw(gameBoard.board);
    }

    return{setBoard};

})();

function createPlayer (name, input) {
    const takeTurn = function (square) {gameControl.setBoard(input, square);}
    return {name, input, takeTurn};
}

const playerOne = createPlayer("Harry", "X");
const playerTwo = createPlayer("Bob", "O");


