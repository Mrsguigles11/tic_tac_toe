
const gameBoard = {
    board : ["", "", "", "", "", "", "", "", ""],
}

const player = {
    takeTurn : function () {
        gameControl.setBoard();
    }
}

const gameControl = {
    playerInput : "X",
    setBoard : function () {
        const randomNo = Math.floor(Math.random() * 9);
        gameBoard.board.splice(randomNo, 1, this.playerInput);
        this.playerInput = "O";
        console.log(gameBoard.board);
    }
}