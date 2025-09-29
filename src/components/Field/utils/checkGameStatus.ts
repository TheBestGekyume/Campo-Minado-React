import type { TCell } from "../../../types/Cell";

const checkLose = (board: TCell[][], row: number, col: number): boolean => board[row][col].isMine;

const checkWin = (board: TCell[][], mines: number): boolean => {
    const totalCells = board.length * board[0].length;
    const revealedCount = board.flat().filter((cell) => cell.isRevealed).length;
    const windCondition = revealedCount === totalCells - mines;
    return windCondition;
};

export const checkGameStatus = (
    board: TCell[][],
    row: number,
    col: number,
    mines: number
): "playing" | "won" | "lost" => {
    if (checkWin(board, mines)) return 'won';
    return checkLose(board, row, col) ? 'lost' : 'playing';
}


