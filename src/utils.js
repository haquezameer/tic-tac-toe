export function getBoard(boardSize) {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
}

export function checkRows({ curGameState, curPlayer, boardSize }) {
    const comparedValue = curPlayer === 0 ? 1 : 2;

    for (let i = 0; i < boardSize; i++) {
        let rowComplete = false;
        rowComplete = curGameState[i].every(item => {
            return item === comparedValue
        });
        if (rowComplete) {
            return [true, i];
        }
    }
    return [false, -1];
}

export function checkColumns({ curGameState, curPlayer, boardSize }) {
    const comparedValue = curPlayer === 0 ? 1 : 2;

    for (let j = 0; j < boardSize; j++) {
        let columnComplete = true;
        for (let i = 0; i < boardSize; i++) {
            if (curGameState[i][j] !== comparedValue) {
                columnComplete = false;
                break;
            }
        }
        if (columnComplete) {
            return [true, j];
        }
    }
    return [false, -1];
}

export function checkDiagonal({ curGameState, curPlayer, boardSize }) {
    const comparedValue = curPlayer === 0 ? 1 : 2;

    let diagonal = true;

    for (let i = 0, j = 0; i < boardSize && j < boardSize; i++, j++) {
        if (curGameState[i][j] !== comparedValue) {
            diagonal = false;
            break;
        }
    }

    return diagonal;
}

export function checkAntiDiagonal({ curGameState, curPlayer, boardSize }) {
    const comparedValue = curPlayer === 0 ? 1 : 2;

    let antiDiagonal = true;

    for (let i = 0, j = boardSize - 1; i < boardSize && j >= 0; i++, j--) {
        if (curGameState[i][j] !== comparedValue) {
            antiDiagonal = false;
            break;
        }
    }

    return antiDiagonal;
}