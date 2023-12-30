const GameBoard = function() {
    let board = [['', '', ''], ['', '', ''], ['', '', '']]
    let numTurns = 0

    const getBoard = () => board

    const canInsert = (x, y) => {
        // can insert if empty string there
        return (0 < x < 2 && 0 < y < 2 && board[y][x] == '')
    } 

    const insert = (shape, x, y) => {
        // x, y represent position in board
        // x is row/nested list, y is column/index of list in board
        if (canInsert(x, y)) {
            board[y][x] = shape 
            numTurns++
        }
    }

    const isRoundOver = () => {
        // board = [['o', '', 'x'], ['', 'x', ''], ['x', 'o', '']] //test board
        // CHECK HORIZONTAL WINNER
        let horiWin
        len = board.length

        for (let row = 0; row < len; row++) {
            horiWin = true
            for (let col = 0; col< len-1; col++) {
                if (board[row][col] == '' || board[row][col] != board[row][col+1]) {
                    horiWin = false
                }
            }
            if (horiWin) break 
        }

        // CHECK VERTICAL WINNER
        let vertWin
        for (let col = 0; col < len; col++) {
            vertWin = true
            for (let row = 0; row< len-1; row++) {
                if (board[row][col] == '' || board[row][col] != board[row+1][col]) {
                    vertWin = false
                }
            }
            if (vertWin) break
        }

        // CHECK DIAGONAL WINNER
        let diagWin = true
        for (let pos = 0; pos < len - 1; pos++) {
            if (board[pos][pos] == '' || board[pos][pos] != board[pos+1][pos+1]){
                diagWin = false
                break
            }
        }
        
        // CHECK ANTI-DIAGONAL
        let antiDiagwin = true
        for (let pos = 0; pos < len-1; pos++) {
            if (board[pos][len-pos-1] == '' || board[pos][len-pos-1] != board[pos+1][len-pos-2]) {
                antiDiagwin = false
                break
            }
        }

        return numTurns == 9 || diagWin || antiDiagwin || vertWin || horiWin
    }

    return {getBoard, insert, isRoundOver}
    
}


let g = GameBoard()
g.getWinner()



const Game = (function(gBoard) {
    p1 = true
    while (!gBoard.isDone()) {
        input = prompt("enter position (ie. 1,2)")
        [parseInt(x), ignore, parseInt(y)] = input
        if (p1) {
            p1 = !p1
            gBoard.insert('x', x, y)

        } else {
            gBoard.insert('o', x, y)
        }
    }
    console.log('round compelte')

    }
)
//(GameBoard)
const allEqual = arr => arr.every(val => val === arr[0]);

// console.log(GameBoard.board) 
// let board = [["x", "x", "x"], ["", "", ""],["", "", ""]]
// for (let i; i < board.length; i++) {
//     if (allEqual(board[i]) && board[i][0] != '') {
//         // horizontal win
//         // return true
//         console.log('won')
//     }