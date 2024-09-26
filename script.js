const gameboard = (function () {

    // Create our board as a 2D array
    let cell = createCell();
    let rows = 3;
    let columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            cell.addMarker(0);
            board[i].push(cell); // place cell in here later
        }
    }

    const placeMarker = function(currentMarker) {

        let marker = prompt('Enter x or o: ');
        let x = prompt('Enter row 1 2 or 3: ');
        let y = prompt('Enter column 1 2 or 3: ');

        // Handles if position on board is available or not
        if (board[x-1][y-1] === 0) {
            board[x-1][y-1] = marker;
        } else {
            alert('Position already taken. Please choose again');
            placeMarker(currentMarker);
        }
    }
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



