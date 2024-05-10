const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart-btn");
const input1El = document.getElementById("input1-el");
const input2El = document.getElementById("input2-el");
const homeBtn = document.getElementById("homePage")
let input1 = "";
let input2 = "";
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "";
let cellValue = "x";
let running = false;

document.getElementById("playGame").addEventListener("click", startGame);

function startGame() {
    input1 = input1El.value;
    input2 = input2El.value;

    if (input1 === "" || input2 === "") {
        alert("Please enter player names.");
        return;
    }

    document.getElementById("playerNames").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    currentPlayer = input1;
    initialiseGame();
}

function initialiseGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");//gets the cellIndex valuefrom html file
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    changePlayer();
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = cellValue;
    cell.textContent = cellValue;
}

function changePlayer() {
    cellValue = (cellValue == "x") ? "o" : "x";
    currentPlayer = (currentPlayer == input1) ? input2 : input1;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break; // Exit the loop if a win condition is found
        }
    }
    if (roundWon) {
        previousPlayer = currentPlayer;
        currentPlayer = (currentPlayer === input1)? input2 : input1
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = input1;
    cellValue = "x";
    running = true;
    cells.forEach(cell => {
        cell.textContent = "";
    });
    statusText.textContent = `${currentPlayer}'s turn`;
}
homeBtn.addEventListener("click",
    function(){
        document.getElementById("gameContainer").style.display ="none"
        document.getElementById("playerNames").style.display ="block"

    }
)
function displayWinner() {
   
    document.getElementById("cellContainer").style.display = "none";


    const winnerElement = document.getElementById("winner");
    const winnerText = currentPlayer === input1? input2: input1;
    winnerElement.textContent = `${winnerText} has won`;
    winnerElement.style.display = "block";

    
    setTimeout(function() {
       
        document.getElementById("cellContainer").style.display = "grid";
        winnerElement.style.display = "none";
        restart(); 
    }, 5000);
}
