import type { Cell } from "../../types/Cell";

/* Cria um tabuleiro de Cell[][] com minas distribuídas aleatoriamente
e calcula o número de minas vizinhas para cada célula.*/

export const buildBoard = (
  rows: number,
  cols: number,
  minesQuant: number,
  safeCell: { safeRow: number; safeCol: number }
): Cell[][] => {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      minesAround: 0,
      isRevealed: false,
      isFlagged: false,
    }))
  );

  let placedMines = 0;
  while (placedMines < minesQuant) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (!board[row][col].isMine && !(safeCell && row === safeCell.safeRow && col === safeCell.safeCol)) {
      board[row][col].isMine = true;
      placedMines++;
    }
  }

  const cellsAround = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentCell = board[row][col];
      if (currentCell.isMine) continue;

      let minesAround = 0;
      for (const [rowOffset, colOffset] of cellsAround) {
        const neighborRow = row + rowOffset;
        const neighborCol = col + colOffset;
        const isInsideBoard =
          neighborRow >= 0 && neighborRow < rows &&
          neighborCol >= 0 && neighborCol < cols;

        if (isInsideBoard && board[neighborRow][neighborCol].isMine) {
          minesAround++;
        }
      }
      currentCell.minesAround = minesAround;
    }
  }

  return board;
};
