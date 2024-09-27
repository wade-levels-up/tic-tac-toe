const gameboard = (function () {

    let rows = 3;
    let columns = 3;
    let board = [];

     const setBoard = function() {
        // Creates a 2D array (grid) for our game area.
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                let cell = createCell();
                cell.addMarker(0);
                board[i].push(cell); 
            }
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

    return { placeMarker, getBoard, printBoard, setBoard };
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
    let gameWon = false;

    function startGame() {
        gameboard.setBoard();
        gameboard.printBoard();
        playRound();
    }

    function playRound() {
        console.log(`It's ${activePlayer}'s turn`);
        gameboard.placeMarker(activePlayer);
        gameboard.printBoard();
        checkWinCondition();
        if (gameWon === true) {
            gameWon = false;
        } else {
            switchPlayerTurn();
            playRound();
        }
    }

    function gameOver() {
        alert(`${activePlayer} wins!`);
        gameboard.setBoard();
    }

    function checkWinCondition() {
        let board = gameboard.getBoard();
        // Looks through rows for 'xxx' or 'ooo'
        for (row in board) {
            if ((board[row][0].getValue() === 'x' && board[row][1].getValue() === 'x' && board[row][2].getValue() === 'x')
                || (board[row][0].getValue() === 'o' && board[row][1].getValue() === 'o' && board[row][2].getValue() === 'o')) 
            {
                gameOver(); gameWon = true; 
            }
        }
        // Looks through columns for 'xxx' or 'ooo'
        for (let i = 0; i < 3; i++) {
            if (board[0][i].getValue() === 'x' && board[1][i].getValue() === 'x' && board[2][i].getValue() === 'x') {
                gameOver(); ; gameWon = true; 
            }
        }

        // Looks for diagonal win conditions
        switch (true) {
            case (board[0][0].getValue() ==='x' && board[1][1].getValue() === 'x' && board[2][2].getValue() === 'x'):
                gameOver(); ; gameWon = true; 
                break
            case (board[0][2].getValue() ==='x' && board[1][1].getValue() === 'x' && board[2][0].getValue() === 'x'):
                gameOver(); ; gameWon = true; 
                break
            case (board[0][0].getValue() ==='o' && board[1][1].getValue() === 'o' && board[2][2].getValue() === 'o'):
                gameOver(); ; gameWon = true; 
                break
            case (board[0][2].getValue() ==='o' && board[1][1].getValue() === 'o' && board[2][0].getValue() === 'o'):
                gameOver(); ; gameWon = true; 
                break
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

    return { getActivePlayer, playRound, startGame }
})();

gameController.startGame





