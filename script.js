
const game = {
   board : [0, 1, 2, 3, 4, 5, 6, 7, 8],
   playerOne : "",
   playerTwo : "",
   turnCount : 0
};

function createPlayer (name, input) {
    const takeTurn = function (square) {gameControl.setBoard(input, square);}
    return {name, input, takeTurn};
}

const gameControl = (function () {

    const gameStateDisplay = document.querySelector("#game_state");

    const displayWinner = function(index) {
        if (game.board[index] === "X") {
            gameStateDisplay.textContent = "You Win " + game.playerOne.name + "!";
            game.turnCount = 0;
            game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
        else {
            gameStateDisplay.textContent = "You Win " + game.playerTwo.name + "!";
            game.turnCount = 0;
            game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
    }

    const checkVerticalRows = function (board) {
        if ((board[0] === board[3]) && (board[0] === board[6])) {
            displayWinner(0);
        }
        else if ((board[1] === board[4]) && (board[1] === board[7])) {
            displayWinner(1);
        }
        else if ((board[2] === board[5]) && (board[2] === board[8])) {
            displayWinner(2);
        }
    }

    const checkHorizontalRows = function (board) {
        if ((board[0] === board[1]) && (board[0] === board[2])) {
            displayWinner(0);
        }
        else if ((board[3] === board[4]) && (board[3] === board[5])) {
            displayWinner(3);
        }
        else if ((board[6] === board[7]) && (board[6] === board[8])) {
            displayWinner(6);
        }
    }

    const checkDiagonalRows = function (board) {
        if ((board[0] === board[4]) && (board[0] === board[8])) {
            displayWinner(0);
        }
        else if ((board[2] === board[4]) && (board[2] === board[6])) {
            displayWinner(2);
        }
    }

    const checkForDraw = function () {
        if (game.turnCount === 9) {
            gameStateDisplay.textContent = "It's a draw!";
            game.turnCount = 0;
            game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
    }

    const setBoard = function (input, square) {
        if (typeof(game.board[square]) === "string") {
            gameStateDisplay.textContent = "Already moved there!";
        }
        else {
        gameStateDisplay.textContent = "";
        game.board.splice(square, 1, input);
        dom.displayBoard();
        game.turnCount++;
        checkVerticalRows(game.board);
        checkHorizontalRows(game.board);
        checkDiagonalRows(game.board);
        checkForDraw(game.board); 
        }
    }

    const clickSquare = function (square) {
        if ((game.playerOne === "") || (game.playerTwo === "")) {
            gameStateDisplay.textContent = "Must enter two player names!";
        }
        else if (game.turnCount % 2 === 0) {
            game.playerOne.takeTurn(square);
            console.log(square);
            
        }
        else {
            game.playerTwo.takeTurn(square);
            console.log(square);
        }
    }

    return{setBoard, clickSquare};

})();

const dom = (function () {

    const gameBoard = document.querySelector(".board_container");
    const inputPlayerOne = document.querySelector("#player_one");
    const inputPlayerTwo = document.querySelector("#player_two");
    const buttonPlayerOne = document.querySelector("#button_player_one");
    const buttonPlayerTwo = document.querySelector("#button_player_two");
    const playerOneNameDisplay = document.querySelector("#player_one_name");
    const playerTwoNameDisplay = document.querySelector("#player_two_name");
    const resetButton = document.querySelector(".reset_button");

    const bindEvents = function () {
        buttonPlayerOne.addEventListener('click', () => { 
            game.playerOne = createPlayer(inputPlayerOne.value, "X");
            playerOneNameDisplay.textContent = "Crosses: " + inputPlayerOne.value;
            inputPlayerOne.value = "";
        });
        buttonPlayerTwo.addEventListener('click', () => { 
            game.playerTwo = createPlayer(inputPlayerTwo.value, "O");
            playerTwoNameDisplay.textContent = "Noughts: " + inputPlayerTwo.value;
            inputPlayerTwo.value = "";
        });
        resetButton.addEventListener('click', () => {
            game.turnCount = 0;
            game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            displayBoard();
        })
    }
    
    const displayBoard = function () {
        gameBoard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.setAttribute("class", "board_square");
        if (typeof(game.board[i]) === 'string') {
            boardSquare.textContent = game.board[i];
        }
        boardSquare.addEventListener('click', () => {
            gameControl.clickSquare(i);
        })
        gameBoard.appendChild(boardSquare);
        }
        }

   displayBoard();
   bindEvents();
   return{displayBoard};

})();




