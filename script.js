const gameboard = (function () {

    let rows = 3;
    let columns = 3;
    let board = [];

    // Creates a 2D array (grid) for our game area.
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            let cell = createCell();
            cell.addMarker(0);
            board[i].push(cell); 
        }
    }

    const placeMarker = function(player) {

        let marker = '';
        if (player === 'player 1') {
            marker = 'x';
        } else if (player === 'player 2') {
            marker = 'o';
        } 
        let x = prompt('Enter row 1 2 or 3: ');
        let y = prompt('Enter column 1 2 or 3: ');

        // Handles if position on board is available or not
        if (board[x-1][y-1].getValue() === 0) {
            board[x-1][y-1].addMarker(marker);
        } else {
            alert('Position already taken. Please choose again');
            placeMarker(currentMarker);
        }
    }

    // Returns the board as a 2D array filled with cell objects
    const getBoard = () => board;

    const printBoard = () => {
        let mappedBoard = board.map((row) => {
            let mappedRow = row.map((item) => item.getValue())
            return mappedRow;
        })
        return console.table(mappedBoard);
    };

    return { placeMarker, getBoard, printBoard };
})();

function createCell() {
    let value = 0;
    const addMarker = (player) => { value = player; };
    const getValue = () => value;
    return { addMarker, getValue };
}

const gameController = (function() {

    let player1 = 'player 1';
    let player2 = 'player 2';
    let activePlayer = player1;

    function playRound() {
        console.log(`It's ${activePlayer}'s turn`);
        gameboard.placeMarker(activePlayer);
        gameboard.printBoard();
        checkWinCondition();
        switchPlayerTurn();
        playRound();
    }

    function checkWinCondition() {
        let board = gameboard.getBoard();
        let row1 = '';
        let row2 = '';
        let row3 = '';
        for (let i = 0; i < 3; i++) {
            row1 += board[0][i].getValue();
            row2 += board[1][i].getValue(); 
            row3 += board[1][i].getValue(); 
        }
        if (row1 === 'xxx' || row2 === 'xxx' || row3 === 'xxx') {
            alert(`${activePlayer} wins!`);
        }
    }

    function switchPlayerTurn() {
        if (activePlayer === player1) {
            activePlayer = player2;
        } else if (activePlayer === player2) {
            activePlayer = player1;
        }
    }

    function getActivePlayer() { return activePlayer; }

    return { getActivePlayer, playRound }
})();

gameboard.printBoard();




