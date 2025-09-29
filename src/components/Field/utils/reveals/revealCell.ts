import type { TCell } from "../../../../types/Cell";
import { buildBoard } from "../buildBoard";
import { revealEmptyCells } from "./revealEmptyCells";

export const revealCell = (
  board: TCell[][] | null,
  row: number,
  col: number,
  rows: number,
  cols: number,
  mines: number
): TCell[][] => {

  if (!board) {
    const newBoard = buildBoard(rows, cols, mines, { safeRow: row, safeCol: col });
    return revealEmptyCells(newBoard, row, col);
  }

  if (board[row][col].isRevealed) return board;

  return revealEmptyCells(board, row, col);
};
