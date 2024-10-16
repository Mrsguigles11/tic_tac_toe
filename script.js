
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

    const checkForWinner = function (board) {
        // Vertical Rows //
        if (board[0] === board[3] && board[0] === board[6]) {
            dom.displayWinner(0);
        }
        else if (board[1] === board[4] && board[1] === board[7]) {
            dom.displayWinner(1);
        }
        else if (board[2] === board[5] && board[2] === board[8]) {
            dom.displayWinner(2);
        }
        // Horizontal Rows //
        else if (board[0] === board[1] && board[0] === board[2]) {
            dom.displayWinner(0);
        }
        else if (board[3] === board[4] && board[3] === board[5]) {
            dom.displayWinner(3);
        }
        else if (board[6] === board[7] && board[6] === board[8]) {
            dom.displayWinner(6);
        }
        // Diagonal Rows //
        else if (board[0] === board[4] && board[0] === board[8]) {
            dom.displayWinner(0);
        }
        else if (board[2] === board[4] && board[2] === board[6]) {
            dom.displayWinner(2);
        }
    }

    const checkForDraw = function () {
        if (game.turnCount === 9) {
            dom.displayWinner("draw");
            dom.resetBoard();
        }
    }

    const setBoard = function (input, square) {
        game.board.splice(square, 1, input);
        dom.displayBoard();
        game.turnCount++;
        checkForWinner(game.board);
        checkForDraw(game.board); 
        }

    return{setBoard};

})();

const dom = (function () {

    const cacheDom = {
        gameBoard : document.querySelector(".board_container"),
        inputPlayerOne : document.querySelector("#player_one"),
        inputPlayerTwo : document.querySelector("#player_two"),
        buttonPlayerOne : document.querySelector("#button_player_one"),
        buttonPlayerTwo : document.querySelector("#button_player_two"),
        playerOneNameDisplay : document.querySelector("#player_one_name"),
        playerTwoNameDisplay : document.querySelector("#player_two_name"),
        resetButton : document.querySelector(".reset_button"), 
        gameStateDisplay : document.querySelector("#game_state"),
    }

    const bindEvents = function () {
        cacheDom.buttonPlayerOne.addEventListener('click', () => { 
            game.playerOne = createPlayer(cacheDom.inputPlayerOne.value, "X");
            cacheDom.playerOneNameDisplay.textContent = "Crosses: " + cacheDom.inputPlayerOne.value;
            cacheDom.inputPlayerOne.value = "";
        });
        cacheDom.buttonPlayerTwo.addEventListener('click', () => { 
            game.playerTwo = createPlayer(cacheDom.inputPlayerTwo.value, "O");
            cacheDom.playerTwoNameDisplay.textContent = "Noughts: " + cacheDom.inputPlayerTwo.value;
            cacheDom.inputPlayerTwo.value = "";
        });
        cacheDom.resetButton.addEventListener('click', () => {
            dom.resetBoard();
            displayBoard();
        })
    }
    
    const displayBoard = function () {
        cacheDom.gameBoard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.setAttribute("class", "board_square");
        if (typeof(game.board[i]) === 'string') {
            boardSquare.textContent = game.board[i];
        }
        boardSquare.addEventListener('click', () => {
            if ((game.playerOne === "") || (game.playerTwo === "")) {
                cacheDom.gameStateDisplay.textContent = "Must enter two player names!";
            }
            else if (typeof(game.board[i]) === "string") {
                cacheDom.gameStateDisplay.textContent = "Already moved there!";
            }
            else if (game.turnCount % 2 === 0) {
                cacheDom.gameStateDisplay.textContent = "";
                game.playerOne.takeTurn(i);
                
            }
            else {
                cacheDom.gameStateDisplay.textContent = "";
                game.playerTwo.takeTurn(i);
            }
        })
        cacheDom.gameBoard.appendChild(boardSquare);
        }
        }
    
    const resetBoard = () => {
        game.turnCount = 0;
        game.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        cacheDom.gameStateDisplay.textContent = "";
    }

    const displayWinner = function(index) {
        if (index === "draw") {
            cacheDom.gameStateDisplay.textContent = "It's a draw!";
        }
        else if (game.board[index] === "X") {
            cacheDom.gameStateDisplay.textContent = ("You Win " + game.playerOne.name + "!");
            dom.resetBoard();
        }
        else {
            cacheDom.gameStateDisplay.textContent = ("You Win " + game.playerTwo.name + "!");
            dom.resetBoard();
        }
    }

   displayBoard();
   bindEvents();
   return{displayBoard, resetBoard, displayWinner};

})();




