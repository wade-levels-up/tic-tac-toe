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

        let marker = prompt('Enter x or o: ');
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

gameboard.printBoard();



