const gameboard = (function () {

    let board = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]];

    const placeMarker = function(currentMarker = 'x') {
        let x = prompt('Enter row 1 2 or 3: ');
        let y = prompt('Enter column 1 2 or 3: ');
        board[x-1][y-1] = currentMarker;
    }
    const getBoard = () => board;
    const printBoard = () => {console.table(board)};

    return { placeMarker, getBoard, printBoard };
})();

gameboard.printBoard();



