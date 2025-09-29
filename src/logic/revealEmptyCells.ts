import type { TCell } from "../types/Cell";

export const revealEmptyCells = (board: TCell[][], row: number, col: number): TCell[][] => {
  const newBoard = board.map(r => r.map(cell => ({ ...cell })));
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  const cellsAround = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const floodFill = (r: number, c: number) => {
    const cell = newBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.minesAround > 0 || cell.isMine) return;

    cellsAround.forEach(([offsetRow, offsetColumn]) => {
      const neighboringRow = r + offsetRow;
      const neighboringCol = c + offsetColumn;
      if ((neighboringRow >= 0 && neighboringRow < rows) &&
        (neighboringCol >= 0 && neighboringCol < cols)
      ) floodFill(neighboringRow, neighboringCol);
    });
  };

  floodFill(row, col);
  return newBoard;
};
