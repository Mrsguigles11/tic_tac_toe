
const game = {
   board : [0, 1, 2, 3, 4, 5, 6, 7, 8],
   playerOne : "",
   playerTwo : "",
};

function createPlayer (name, input) {
    const takeTurn = function (square) {gameControl.setBoard(input, square);}
    return {name, input, takeTurn};
}

const gameControl = (function () {

    let turnCount = 0;

    const winSequence = function(index) {
        if (game.board[index] === "X") {
            console.log("You Win " + game.playerOne.name);
            turnCount = 0;
            game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
        else {
            console.log("You Win" + game.playerTwo.name);
            turnCount = 0;
            game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
    }

    const checkVerticalRows = function (board) {
        if ((board[0] === board[3]) && (board[0] === board[6])) {
            winSequence(0);
        }
        else if ((board[1] === board[4]) && (board[1] === board[7])) {
            winSequence(1);
        }
        else if ((board[2] === board[5]) && (board[2] === board[8])) {
            winSequence(2);
        }
    }

    const checkHorizontalRows = function (board) {
        if ((board[0] === board[1]) && (board[0] === board[2])) {
            winSequence(0);
        }
        else if ((board[3] === board[4]) && (board[3] === board[5])) {
            winSequence(3);
        }
        else if ((board[6] === board[7]) && (board[6] === board[8])) {
            winSequence(6);
        }
    }

    const checkDiagonalRows = function (board) {
        if ((board[0] === board[4]) && (board[0] === board[8])) {
            winSequence(0);
        }
        else if ((board[2] === board[4]) && (board[2] === board[6])) {
            winSequence(2);
        }
    }

    const checkForDraw = function (board) {
        if (turnCount === 9) {
            console.log("Its a draw");
        }
    }

    const setBoard = function (input, square) {
        if (typeof(game.board[square]) === "string") {
            console.log("Already moved there!");
            return;
        }
        else {
        game.board.splice(square, 1, input);
        console.log(game.board);
        checkVerticalRows(game.board);
        checkHorizontalRows(game.board);
        checkDiagonalRows(game.board);
        turnCount++;
        checkForDraw(game.board); 
        dom.displayBoard();
        }
    }

    const playerTurn = function (square) {
        if (turnCount % 2 === 0) {
            game.playerOne.takeTurn(square);
        }
        else {
            game.playerTwo.takeTurn(square);
        }
    }

    return{setBoard, playerTurn};

})();

const dom = (function () {

    const gameBoard = document.querySelector(".board_container");
    const inputPlayerOne = document.querySelector("#player_one");
    const inputPlayerTwo = document.querySelector("#player_two");
    const buttonPlayerOne = document.querySelector("#button_player_one");
    const buttonPlayerTwo = document.querySelector("#button_player_two");

    const bindEvents = function () {
        buttonPlayerOne.addEventListener('click', () => { 
            game.playerOne = createPlayer(inputPlayerOne.value, "X");
            inputPlayerOne.value = "";
        });
        buttonPlayerTwo.addEventListener('click', () => { 
            game.playerTwo = createPlayer(inputPlayerTwo.value, "O");
            inputPlayerTwo.value = "";
        });
    }
    
    const displayBoard = function () {
        gameBoard.innerHTML = "";
        for (const square of game.board) {
        const boardSquare = document.createElement("div");
        boardSquare.setAttribute("class", "board_square");
        if (typeof(square) === 'string') {
            boardSquare.textContent = square;
        }
        boardSquare.addEventListener('click', () => {
            gameControl.playerTurn(game.board.indexOf(square));
        })
        gameBoard.appendChild(boardSquare);
        }
        }

   displayBoard();
   bindEvents();
   return{displayBoard};

})();




