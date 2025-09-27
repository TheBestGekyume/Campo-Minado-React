import type { Cell } from "../../types/Cell";

export const revealEmptyCells = (board: Cell[][], row: number, col: number) => {
  const newBoard = board.map(r => r.map(cell => ({ ...cell })));
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const floodFill = (r: number, c: number) => {
    const cell = newBoard[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;

    // se tiver minas ao redor, para por aqui
    if (cell.minesAround > 0) return;

    // se não tiver minas ao redor, revela os vizinhos
    directions.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        floodFill(nr, nc);
      }
    });
  };

  floodFill(row, col);
  return newBoard;
};
