import type { Cell } from "../../../types/Cell";

export const revealEmptyCells = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map(r => r.map(cell => ({ ...cell })));
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const floodFill = (r: number, c: number) => {
    const cell = newBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    if (cell.minesAround > 0) return;

    directions.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) floodFill(nr, nc);
    });
  };

  floodFill(row, col);
  return newBoard;
};
