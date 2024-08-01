const gameBoard = (function() {
    let board = [[], [], []];
    const update = (symbol, x, y) => board[x][y] = symbol;
    return {board, update};
})();

function createPlayer(name, symbol) {
    const update = function(name) { this.name = name };
    return {name, symbol, update};
}

let playerOne = createPlayer("Player 1", "X");
let playerTwo = createPlayer("Player 2", "O");

let playerOneTurn = true;
let gameOver = true;

let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let btnContainer = document.querySelector(".button-container");
let winText = document.getElementById("winner");

function play(x, y) {
    if (gameBoard.board[x][y] != "" || gameOver) {
        return;
    }
    if (playerOneTurn) {
        gameBoard.update(playerOne.symbol, x, y);
        playerOneTurn = false;
    } else {
        gameBoard.update(playerTwo.symbol, x, y);
        playerOneTurn = true;
    }
    checkWin();
    if (gameOver) {
        declareWinner();
    } else {
        updateDisplay();
    }
}

function checkWin() {
    let rv = false;
    for (let i = 0; i < 3; i++) {
        if (gameBoard.board[i][0] === gameBoard.board[i][1] && 
            gameBoard.board[i][1] === gameBoard.board[i][2] &&
            gameBoard.board[i][0] != "") {
                rv = true;
            }
        if (gameBoard.board[0][i] === gameBoard.board[1][i] && 
            gameBoard.board[1][i] === gameBoard.board[2][i] &&
            gameBoard.board[0][i] != "") {
                rv = true;
            }
    }

    if (gameBoard.board[0][0] === gameBoard.board[1][1] && 
        gameBoard.board[1][1] === gameBoard.board[2][2] &&
        gameBoard.board[0][0] != "") {
            rv = true;
        }
    if (gameBoard.board[0][2] === gameBoard.board[1][1] && 
        gameBoard.board[1][1] === gameBoard.board[2][0] &&
        gameBoard.board[2][0] != "") {
            rv = true;
        }
    
    gameOver = rv;
    declareWinner();
}

function declareWinner() {
    if (!gameOver) {
        return;
    }
    if (!playerOneTurn) {
        winText.innerHTML = `${playerOne.name} won!`;
        console.log(`${playerOne.name} won!`)
    } else {
        winText.innerHTML = `${playerTwo.name} won!`;
        console.log(`${playerTwo.name} won!`)
    }
}

function resetBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard.update("", i, j);
        }
    }
    clearDisplay();
    gameOver = true;
}

function testGame() {
    play(0, 0);
    play(1, 0);
    play(0, 1);
    play(1, 1);
    play(0, 2);
}

function cellClick(e) {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    play(x, y);
    if (gameBoard.board[x][y] != "") {
        e.target.innerHTML = gameBoard.board[x][y];
        e.target.classList.remove("unfilled");
    }
}

function setUpBoard() {
    if (!gameOver) {
        return;
    }
    resetBoard();
    let cells = document.getElementsByClassName("cell");
    console.log("Adding event and class")
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", cellClick);
        cells[i].classList.add("unfilled")
    }
    gameOver = false;
    updateDisplay();
}

function clearDisplay() {
    let cells = document.getElementsByClassName("cell");
    console.log("Removing event and class")
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove("unfilled")
        cells[i].removeEventListener("click", cellClick);
    }

    winText.innerHTML = "";
}

function updateDisplay() {
    if (playerOneTurn) {
        winText.innerHTML = `${playerOne.name}'s turn`
    } else {
        winText.innerHTML = `${playerTwo.name}'s turn`
    }
}

function changeP1Name() {
    let new_name = document.getElementById("playerOneName");
    let html_change = document.querySelector(".player-info .name")
    html_change.innerText = `${new_name.value} - X`;
    playerOne.update(new_name.value);
    new_name.value = "";
}

function changeP2Name() {
    let new_name = document.getElementById("playerTwoName");
    let html_change = document.querySelector(".player-info#two .name")
    html_change.innerText = `${new_name.value} - O`;
    playerTwo.update(new_name.value);
    new_name.value = "";
}

startBtn.addEventListener("click", setUpBoard);
resetBtn.addEventListener("click", resetBoard);

let p1NameBtn = document.getElementById("playerOneBtn")
let p2NameBtn = document.getElementById("playerTwoBtn")

p1NameBtn.addEventListener("click", changeP1Name)
p2NameBtn.addEventListener("click", changeP2Name)