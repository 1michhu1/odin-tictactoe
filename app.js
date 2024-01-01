const GameBoard = function() {
    let board = [['', '', ''], ['', '', ''], ['', '', '']]

    const getBoard = () => board

    const canInsert = (x, y) => {
        // can insert if empty string there
        return (0 <= x <= 2 && 0 <= y <= 2 && board[y][x] == '')
    } 

    const insert = (shape, x, y) => {
        // x, y represent position in board
        // x is row/nested list, y is column/index of list in board
        if (canInsert(x, y)) {
            board[y][x] = shape 
        }
    }

    return {getBoard, insert, canInsert}
    
}


const Game = function() {
    let numTurns = 0
    let winner

    const board = GameBoard()
    const players = [
        {
            name: "Player 1",
            shape: 'X',
        },
        {
            name: "Player 2",
            shape: 'O',
        }
    ]

    let activePlayer = players[0]
    
    const switchPlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0]
    const getActivePlayer = () => activePlayer

    const isThereWinner = () => {
        let boardList = board.getBoard()
        for (let i = 0; i < boardList.length; i++ ) {
            if (boardList[i][0] == boardList[i][1] && boardList[i][1] == boardList[i][2] && boardList[i][0] != '') {
                return true

            } else if (boardList[0][i] == boardList[1][i] && boardList[1][i] == boardList[2][i] && boardList[2][i] != '') {
                return true

            } 
        }

        if (boardList[0][0] == boardList[1][1] && boardList[1][1] == boardList[2][2] && boardList[2][2] != '') {
            return true

        } else if (boardList[0][2] == boardList[1][1]  && boardList[1][1] == boardList[2][0] && boardList[2][0] != '') {
            return true
        }

        return false

        // null means no winner, could be draw or game not over
        
    }

    const isDraw = () => numTurns == 9
    const getWinner = () => winner

    const getValidPos = () => {
        let input = prompt("enter position (ie. 1,2): ")
        let pos = [parseInt(input[0]), parseInt(input[2])]
        
        while (!board.canInsert(pos[0], pos[1]) && input != "cancel") {
            input = prompt("enter position (ie. 1,2): ")
            pos = [parseInt(input[0]), parseInt(input[2])]
        }
        return pos
    }
    
    const playRound = (x,y) => {
        if (!board.canInsert(x,y)) return
        board.insert(getActivePlayer().shape, x, y)
        numTurns++

        if (isThereWinner()) {
            winner = getActivePlayer().name

        }
        else if (isDraw()) { 
            winner = "draw"
        }
        else {
            switchPlayer()
        }
        
    }



    return {playRound, getActivePlayer, getWinner, getValidPos, getBoard: board.getBoard}
}

function ScreenController() {
    const game = Game()
    const boardDiv = document.querySelector('.grid')
    const heading = document.querySelector("h1")

    const generateGrid = () => {
        const activePlayer =game.getActivePlayer()
        const board = game.getBoard()

        heading.textContent = activePlayer.name + "'s turn"
        for (let i=0; i < board.length; i++) {
            for (let j=0; j < board.length; j++){
                cell = document.createElement('button')
                cell.setAttribute(`data-x`, j)
                cell.setAttribute(`data-y`, i)
                cell.setAttribute('type', 'button')
                boardDiv.appendChild(cell)
            }
        }
    }

    const updateScreen = () => {
        const board = game.getBoard()
        // let board = [['x', 'x', 'o'], ['o', 'o', 'x'], ['x', 'x', 'o']]\
        let result = game.getWinner()
        const activePlayer = game.getActivePlayer()

        for (let i=0; i < board.length; i++) {
            for (let j=0; j < board.length; j++){
                cell = document.querySelector(`[data-x="${j}"][data-y="${i}"]`)
                cell.textContent = board[i][j]
            }
        }
        if (result == undefined) {
            heading.textContent = activePlayer.name + "'s turn"
        } else if (result.name == 'draw') {
            heading.textContent = "Draw!"
        } else {
            heading.textContent = result + " has won!"
        }
    }

    function clickHandlerBoard(e) {
        const selectedCell = e.target

        // exit if button not pressed
        if (selectedCell.tagName != "BUTTON") return

        if (!game.getWinner()) {
            game.playRound(selectedCell.dataset.x, selectedCell.dataset.y)
            updateScreen();
  
        } 
    }

    boardDiv.addEventListener("click", clickHandlerBoard)
    generateGrid()

}


ScreenController()