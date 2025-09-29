import type { TCell } from "../../../../types/Cell";

export const checkWin = (board: TCell[][], mines: number): boolean => {
  const totalCells = board.length * board[0].length;
  const revealedCount = board.flat().filter((cell) => cell.isRevealed).length;
  const windCondition = revealedCount === totalCells - mines;
  return windCondition;
};
