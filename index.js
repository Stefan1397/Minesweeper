const container = document.getElementById("grid");
let flags = document.getElementById("flags-remaining");
let reset = document.getElementById("reset-btn");
let result = document.getElementById("result");
let board = [];
let bombsPosition = [];
let nrBombs = 40;
let bombRemaining = 0;
let value;

window.onload = function() {
    createTable();
    plantBombs();
}

function createTable() {
    for (let line = 0; line < 16; ++line) {
        let row = [];
        for (let column = 0; column < 16; ++column) {
            let cell = document.createElement("div");
            cell.style.border = "1px solid black";
            container.appendChild(cell)
            cell.id = line.toString() + " " + column.toString();
            cell.addEventListener("click", clickCell);
            cell.addEventListener("contextmenu", rightClick);
            row.push(cell);
        }
        board.push(row);
    }
}

function plantBombs() {
    flags.innerHTML = nrBombs;
    let bombPlanting = nrBombs;
    while (bombPlanting > 0) {
        let row = Math.floor(Math.random() * board.length);
        let column = Math.floor(Math.random() * board.length);
        let cellBomb = row.toString() + " " + column.toString();
        if (!bombsPosition.includes(cellBomb)) {
            bombsPosition.push(cellBomb);
            bombPlanting -= 1;
        }
    }
}

function rightClick(event) {
    event.preventDefault();
    if (this.innerHTML != "🚩") {
        value = this.innerHTML;
        this.innerHTML = "🚩";
        --flags.innerHTML;
    } else if (this.innerHTML == "🚩") {
        this.innerHTML = value;
        ++flags.innerHTML;
    }
    if (bombsPosition.includes(this.id)) {
        ++bombRemaining;
    }
    if (bombRemaining == nrBombs) {
        result.innerHTML = "You Win!";
        result.style.color = "green";
    }
}

function clickCell() {
    let position = this.id.split(" ")
    let lineIndex = parseInt(position[0]);
    let columnIndex = parseInt(position[1])
    numberOfBombs(lineIndex, columnIndex);
    if (bombsPosition.includes(this.id)) {
        revealBombs();
    }
}

function revealBombs() {
    for (let line = 0; line < board.length; ++line) {
        for (let column = 0; column < board.length; ++column) {
            let currentPosition = board[line][column];
            if (bombsPosition.includes(currentPosition.id)) {
                board[line][column].innerHTML = "💣";
                board[line][column].style.backgroundColor = "red";
                result.innerHTML = "You Lost!";
                result.style.color = "red";
            }
        }
    }
}

function numberOfBombs(lineIndex, columnIndex) {
    if (lineIndex < 0 || lineIndex >= board.length || columnIndex < 0 || columnIndex >= board.length) {
        return;
    }
    if (board[lineIndex][columnIndex].classList.contains("clicked")) {
        board[lineIndex][columnIndex].style.backgroundColor = "white";
        return;
    }
    board[lineIndex][columnIndex].classList.add("clicked");
    let numberBombs = 0;
    for (let line = lineIndex - 1; line <= lineIndex + 1; ++line) {
        for (let column = columnIndex - 1; column <= columnIndex + 1; ++column) {
            numberBombs += checkBombs(line, column);
            
        }
    }
    if (numberBombs > 0) {
        board[lineIndex][columnIndex].innerHTML = numberBombs;
        board[lineIndex][columnIndex].style.backgroundColor = "white";
    } else {
        for (let line = lineIndex - 1; line <= lineIndex + 1; ++line) {
            for (let column = columnIndex - 1; column <= columnIndex + 1; ++column) {
                numberOfBombs(line, column);
            }
        }
    }
}

function checkBombs(line, column) {
    if (line < 0 || line >= board.length || column < 0 || column >= board.length) {
        return 0;
    }
    if (bombsPosition.includes(line.toString() + " " + column.toString())) {
        return 1;
    }
    return 0;
}

reset.addEventListener("click", resetGame);

function resetGame() {
    location.reload();
}