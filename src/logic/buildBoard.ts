import type { TCell } from "../types/Cell";

export const buildBoard = (
  rows: number,
  cols: number,
  minesQuant: number,
  safeCell: { safeRow: number; safeCol: number }
): TCell[][] => {
  const board: TCell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      minesAround: 0,
      isRevealed: false,
      isFlagged: false,
    }))
  );

  const gameStartCells = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  const gameStartArea = new Set(
    gameStartCells
      .map(([offsetRow, offsetColumn]) => {
        const r = safeCell.safeRow + offsetRow;
        const c = safeCell.safeCol + offsetColumn;
        return r >= 0 && r < rows && c >= 0 && c < cols ? `${r},${c}` : null;
      })
      .filter(Boolean) as string[]
  );

  const generateMines = () => {
    let placedMines = 0;
    while (placedMines < minesQuant) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      const key = `${row},${col}`;

      if (!board[row][col].isMine && !gameStartArea.has(key)) {
        board[row][col].isMine = true;
        placedMines++;
      }
    }
  };

  const calculateMinesAround = () => {
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
        for (const [rowAround, colAround] of cellsAround) {
          const neighboringRow = row + rowAround;
          const neighboringColumn = col + colAround;
          if (
            (neighboringRow >= 0 && neighboringRow < rows) &&
            (neighboringColumn >= 0 && neighboringColumn < cols)
          ) {
            if (board[neighboringRow][neighboringColumn].isMine) minesAround++;
          }
        }
        currentCell.minesAround = minesAround;
      }
    }
    return board;
  };

  generateMines();
  return calculateMinesAround();
};
