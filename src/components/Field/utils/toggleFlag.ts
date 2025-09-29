import type { TCell } from "../../../types/Cell";

export const toggleFlag = (board: TCell[][] | null, row: number, col: number): TCell[][] | null => {
  if (!board) return null;

  let cell = board[row][col];
  if (cell.isRevealed) return board;

  const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
  cell = newBoard[row][col];

  cell.isFlagged = !cell.isFlagged;
  return newBoard;
};
