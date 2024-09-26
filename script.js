const gameboard = (function () {

    // Create our board as a 2D array
    let rows = 3;
    let columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0); // place cell in here later
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
    const printBoard = () => {console.table(board)};

    return { placeMarker, getBoard, printBoard };
})();

gameboard.printBoard();



