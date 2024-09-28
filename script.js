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


    validMoveMade = false;

    const getValidMove = function() { return validMoveMade };

    const placeMarker = function(player, xPos, yPos) {

        let marker = '';
        const validXYInput = ['1','2','3'];

        if      (player.id === 'player 1') { marker = 'x'; } 
        else if (player.id === 'player 2') { marker = 'o'; } 
        let x = +xPos - 1; 
        let y = +yPos - 1;

        // Handles if position on board is available or not
        if (board[x][y].getValue() === 0) {
            board[x][y].addMarker(marker);
            validMoveMade = true;
        } else {
            displayController.setGameStateDisplay('Try another spot...');
            validMoveMade = false;
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

    return { placeMarker, getBoard, printBoard, setBoard, getValidMove };
})();

function createCell() {
    let value = 0;
    const addMarker = (player) => { value = player; };
    const getValue = () => value;
    return { addMarker, getValue };
}


// GAME CONTROLLER
const gameController = (function() {

    let p1 = { id: 'player 1', name: 'Player 1'};
    let p2 = { id: 'player 2', name: 'Player 2'};
    let activePlayer = p1;
    let roundOver = false;
    let draw = false;

    function setPlayerNames() {
        p1.name = displayController.getPlayerName('p1');
        p2.name = displayController.getPlayerName('p2');
    }

    function startGame(xPos, yPos) {
        gameboard.setBoard();
    }

    function playRound(xPos, yPos) {
        gameboard.placeMarker(activePlayer, xPos, yPos);
        let validMove = gameboard.getValidMove();
        if (validMove) {
            checkWinCondition();
            if (roundOver === true) {
                roundOver = false;
            } else {
                switchPlayerTurn();
                displayController.setGameStateDisplay(`It's ${getActivePlayer().name}'s turn`);
            }
        }  
    }

    function gameOver() {
        if (draw) {
            displayController.setGameStateDisplay('Draw!');
            draw = false;
            displayController.setPlayEnabled(false);
        } else {
            displayController.setGameStateDisplay(`${activePlayer.name} wins!`);
            displayController.setPlayEnabled(false);
        }
    }

    function checkWinCondition() {
        let board = gameboard.getBoard();


        // Looks through rows for 'xxx' or 'ooo'
        function checkRows() {
            for (row in board) {
                if ((board[row][0].getValue() === 'x' && board[row][1].getValue() === 'x' && board[row][2].getValue() === 'x')
                    || (board[row][0].getValue() === 'o' && board[row][1].getValue() === 'o' && board[row][2].getValue() === 'o')) 
                {
                    gameOver(); roundOver = true; 
                }
            }
        }
        checkRows();
  
        // Looks through columns for 'xxx' or 'ooo'
        function checkCols() {
            for (let i = 0; i < 3; i++) {
                if ((board[0][i].getValue() === 'x' && board[1][i].getValue() === 'x' && board[2][i].getValue() === 'x')
                    || (board[0][i].getValue() === 'o' && board[1][i].getValue() === 'o' && board[2][i].getValue() === 'o')) {
                    gameOver(); 
                    roundOver = true;
                }
            }
        }
        checkCols();
     

        // Looks for diagonal win conditions
        function checkDiags(){
            switch (true) {
                case (board[0][0].getValue() ==='x' && board[1][1].getValue() === 'x' && board[2][2].getValue() === 'x'):
                    roundOver = true;
                    gameOver();  
                    break
                case (board[0][2].getValue() ==='x' && board[1][1].getValue() === 'x' && board[2][0].getValue() === 'x'):
                     roundOver = true;
                    gameOver();  
                    break
                case (board[0][0].getValue() ==='o' && board[1][1].getValue() === 'o' && board[2][2].getValue() === 'o'):
                    roundOver = true;
                    gameOver(); 
                    break
                case (board[0][2].getValue() ==='o' && board[1][1].getValue() === 'o' && board[2][0].getValue() === 'o'):
                     roundOver = true;
                    gameOver();  
                    break
            }
        }
        checkDiags()
 

        // Check for draw
        let mappedBoard = gameboard.getBoard().map((row) => {
            let mappedRow = row.map((item) => item.getValue())
            return mappedRow;
        })
        let flatBoard = mappedBoard.flat();
        if (!flatBoard.includes(0) && roundOver === false) {
            draw = true;
            roundOver = true;
            gameOver();
        }
    }

    function switchPlayerTurn() {
        if (activePlayer === p1) {
            activePlayer = p2;
        } else if (activePlayer === p2) {
            activePlayer = p1;
        }
    }

    function getActivePlayer() { return activePlayer; }

    return { getActivePlayer, playRound, startGame, setPlayerNames }
})();


// Controls what is displayed in HTML and the DOM
const displayController = (function() {
    
    let gameboardDOM = document.querySelector('#gameboard');
    let cellListDOM = Array.from(document.querySelectorAll('.cell'));
    let flatBoard;
    let gameStateDisp = document.querySelector('#game-state');
    const startBtn = document.querySelector('#start');
    const nameInp = document.querySelector('#name-input');
    const p1Input = document.querySelector('#p1name');
    const p2Input = document.querySelector('#p2name');
    let p1name = 'Player 1';
    let p2name = 'Player 2';
    let playEnabled = true;

    function setPlayEnabled(bool) { playEnabled = bool };

    startBtn.addEventListener('click', ()=>{
        nameInp.style.visibility = 'hidden';
        if (!p1Input.value.split('').includes(' ') && p1Input.value) { p1name = p1Input.value; gameController.setPlayerNames(); }
        if (!p2Input.value.split('').includes(' ') && p2Input.value) { p2name = p2Input.value; gameController.setPlayerNames(); }
        displayController.setGameStateDisplay(`${gameController.getActivePlayer().name} goes first`)
    })

    function getPlayerName(player) {
        if (player === 'p1') { return p1name; } 
        if (player === 'p2') { return p2name; }
    }

    function processBoardIntoFlat() {
        let mappedBoard = gameboard.getBoard().map((row) => {
            let mappedRow = row.map((item) => item.getValue())
            return mappedRow;
        })
        flatBoard = mappedBoard.flat();
    }

    function populateGrid() {
        for (let i = 0; i < 9; i++) {
            if (flatBoard[i] === 0) {
                cellListDOM[i].textContent = '';
            } else {
                cellListDOM[i].textContent = `${flatBoard[i]}`;
            }
        }
    }

    const setGameStateDisplay = function(text) {
        gameStateDisp.textContent = text;
    }

    gameboardDOM.addEventListener('click', (e)=>{
        if (playEnabled) {
            if (e.target.getAttribute('class') === 'cell') {
                let row = e.target.getAttribute('data-row');
                let col = e.target.getAttribute('data-col');
                gameController.playRound(row, col);
                processBoardIntoFlat();
                populateGrid();
            }
        }
    })

    const button = document.querySelector('#playAgain');
    button.addEventListener('click', ()=> {
    displayController.setPlayEnabled(true);
    displayController.setGameStateDisplay(`${gameController.getActivePlayer().name} goes first`);
    gameboard.setBoard();
    displayController.processBoardIntoFlat();
    displayController.populateGrid();
})

    
    return { populateGrid, processBoardIntoFlat, setGameStateDisplay, getPlayerName, setPlayEnabled };
})();



//displayController.setGameStateDisplay(`${gameController.getActivePlayer()} goes first`);
gameController.startGame();
displayController.processBoardIntoFlat();
displayController.populateGrid();







