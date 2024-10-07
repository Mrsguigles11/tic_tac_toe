
const gameBoard = {
    board : [null, null, null, null, null, null, null, null, null]
}

const gameControl = {
    setBoard : function (input, square) {
        gameBoard.board.splice(square, 1, input);
        console.log(gameBoard.board);
    }
}

function createPlayer (name, input) {
    const takeTurn = function (square) {gameControl.setBoard(input, square);}
    return {name, input, takeTurn};
}

const playerOne = createPlayer("Harry", "X");
const playerTwo = createPlayer("Bob", "O");


