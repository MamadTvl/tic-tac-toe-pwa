const randomInt = (min, max) => {
    return Math.floor((Math.random() * max) + min);
}

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

export const robotPlayHard = (board) => {

}
