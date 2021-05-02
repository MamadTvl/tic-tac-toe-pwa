const randomInt = (min, max) => {
    return Math.floor((Math.random() * max) + min);
}
// play random
export const robotPlayEasy = (board) => {
    let row = -1
    let col = -1
    let found = false
    // Try a random position
    for (let i = 0; i < 10; i++) {
        let r = randomInt(0, 2);
        let c = randomInt(0, 2);
        if (board[r][c] === 0) {
            row = r;
            col = c;
            found = true;
            break;
        }
    }

    // If could not find a valid random position get the first valid position from the table
    if (!found) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) {
                    row = i;
                    col = j;
                    found = true;
                    break;
                }
            }
            if (found === true) {
                break;
            }
        }
    }
    return [row, col]
}

// trying to win the game or stop the other player to win
// if there is no way pick a random choose
export const robotPlayHard = (board) => {
    let row = -1
    let column = -1
    let found = false
    // search in rows
    for (let i = 0; i < board.length; i++) {
        const hasEmpty = board[i].includes(0)
        const countOfX = board[i].filter(block => block === 'x').length
        const countOfO = board[i].filter(block => block === 'o').length
        if (hasEmpty) {
            if (countOfO === 2) {
                row = i
                column = board[i].indexOf(0)
                found = true
                break
            } else if (countOfX === 2) {
                row = i
                column = board[i].indexOf(0)
                found = true
                break
            }
        }
    }
    // search in column
    const columns = [[], [], []]
    for (let i = 0; i < board.length; i++) {
        columns[i].push(board[0][i])
        columns[i].push(board[1][i])
        columns[i].push(board[2][i])
    }
    for (let i = 0; i < columns.length; i++) {
        const hasEmpty = columns[i].includes(0)
        const countOfX = columns[i].filter(block => block === 'x').length
        const countOfO = columns[i].filter(block => block === 'o').length
        if (hasEmpty) {
            if (countOfO === 2) {
                row = columns[i].indexOf(0)
                column = i
                found = true
                break
            } else if (countOfX === 2) {
                row = columns[i].indexOf(0)
                column = i
                found = true
                break
            }
        }
    }
    // search in Diagonals
    const diagonals = [[], []]
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (i === j) {
                diagonals[0].push({
                    element: board[i][j],
                    row: i,
                    col: j
                })
                if (i === 1 && j === 1) {
                    diagonals[1].push({
                        element: board[i][j],
                        row: i,
                        col: j
                    })
                }
            }
            if ((i === 0 && j === 2) || (j === 0 && i === 2)) {
                diagonals[1].push({
                    element: board[i][j],
                    row: i,
                    col: j
                })
            }
        }
    }
    for (let i = 0; i < diagonals.length; i++) {
        const hasEmpty = diagonals[i].filter(block => block.element === 0).length !== 0
        const countOfX = diagonals[i].filter(block => block.element === 'x').length
        const countOfO = diagonals[i].filter(block => block.element === 'o').length
        if (hasEmpty) {
            if (countOfO === 2) {
                const block = diagonals[i].find(block => block.element === 0)
                row = block.row
                column = block.col
                found = true
                break
            } else if (countOfX === 2) {
                const block = diagonals[i].find(block => block.element === 0)
                row = block.row
                column = block.col
                found = true
                break
            }
        }
    }

    if (found) {
        return [row, column]
    } else {
        return robotPlayEasy(board)
    }
}
