const grid = document.getElementById("grid");
let mine = document.getElementById("mines-remaining");
let result = document.getElementById("result");
let resetBtn = document.getElementById('reset-btn');
let board = [];
let numberBombs = 0;
let value;

resetBtn.addEventListener("click", reset);

function reset() {
    location.reload();
}

window.onload = function() {
    createBoard();
    plantBombs();
    numberOfBombs();
}

function createBoard() {
    for (let line = 0; line < 16; ++line) {
        let row = [];
        for (let column = 0; column < 16; ++column) {
            let cell = document.createElement("div");
            cell.style.border = "1px solid rgb(90, 90, 90)";
            cell.style.color = "rgb(172, 172, 172)";
            grid.appendChild(cell);
            row.push(cell);
            cell.addEventListener("click", press, {once:true});
            cell.addEventListener("contextmenu", rightClick);
        }
        board.push(row);
    } 
}

function rightClick(event) {
    event.preventDefault();
    if (this.innerHTML != "🚩") {
        value = this.innerHTML;
        this.innerHTML = "🚩";
        --mine.innerHTML;
    } else if (this.innerHTML == "🚩") {
        this.innerHTML = value;
        ++mine.innerHTML;
    }
    let bombsRemaining = 0;
    for(let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board.length; ++j) {
            if (board[i][j].innerHTML == "B") {
                ++bombsRemaining;
            }
        }
    }
    if (bombsRemaining == 0) {
        result.innerHTML = "You win!";
        result.style.color = "green";
    }
}

function press() {
    if (this.innerHTML == "B") {
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board.length; ++j) {
                if (board[i][j].innerHTML == "B") {
                    board[i][j].innerHTML = "💣";
                    board[i][j].style.backgroundColor = "red";
                    result.innerHTML = "You lost!";
                    result.style.color = "red";
                }
            }
        }
    } else if (this.innerHTML == "") {
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board.length; ++j) {
                if (board[i][j].innerHTML == "") {
                    board[i][j].style.backgroundColor = "white";
                    
                } 
            }
        }
    } else {
        this.style.color = 'black';
        this.style.backgroundColor = 'white';
    }
}

function plantBombs() {
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < 2; ++j) {
            board[i][Math.floor(Math.random() * board.length)].innerHTML = "B";
        }
    }
}

function numberOfBombs() {
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board.length; ++j) {
            if (board[i][j].innerHTML == "B") {
                ++numberBombs;
                let line = i - 1;
                let column = j - 1;
                let lineSize = i + 1;
                let columnSize = j + 1;
                if (i == 0 && j == 0) {  
                    line = i;
                    column = j;
                    lineSize = i + 1;
                    columnSize = j + 1;
                } else if (i == 0 && j == board.length - 1) {
                    line = i;
                    column = j - 1;
                    lineSize = i + 1;
                    columnSize = j;
                } else if (i == board.length - 1 && j == 0) {
                    line = i - 1;
                    column = j;
                    lineSize = i;
                    columnSize = j + 1;
                } else if (i == board.length - 1 && j == board.length - 1) {
                    line = i - 1;
                    column = j - 1;
                    lineSize = i;
                    columnSize = j;
                } else if (i == 0 && j > 0) {
                    line = i;
                    column = j - 1;
                    lineSize = i + 1;
                    columnSize = j + 1;
                } else if (i > 0 && j == 0) {
                    line = i - 1;
                    column = j;
                    lineSize = i + 1;
                    columnSize = j + 1;
                } else if (i == board.length - 1 && j > 0) {
                    line = i - 1;
                    column = j - 1;
                    lineSize = i;
                    columnSize = j + 1;
                } else if (i > 0 && j == board.length - 1) {
                    line = i - 1;
                    column = j - 1;
                    lineSize = i + 1;
                    columnSize = j;
                }
                for (let a = line; a <= lineSize; ++a) {
                    for (let b = column; b <= columnSize; ++b) {
                        if (board[a][b].innerHTML != "B") {
                            ++board[a][b].innerHTML;
                        }
                    }
                }
            }
        }
    }
    mine.innerHTML = numberBombs;
}