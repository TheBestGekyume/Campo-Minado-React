import type { Cell } from "../../../types/Cell";

export const flagSquare = (board: Cell[][] | null, row: number, col: number): Cell[][] | null => {
  if (!board) return null;

  const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
  const cell = newBoard[row][col];
  if (cell.isRevealed) return board;

  cell.isFlagged = !cell.isFlagged;
  return newBoard;
};
