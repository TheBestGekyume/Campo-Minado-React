import type { Cell } from "../../../../types/Cell";
import { buildBoard } from "../buildBoard";
import { revealEmptyCells } from "./revealEmptyCells";

export const revealSquare = (
  board: Cell[][] | null,
  row: number,
  col: number,
  rows: number,
  cols: number,
  mines: number
): Cell[][] => {

  if (!board) {
    const newBoard = buildBoard(rows, cols, mines, { safeRow: row, safeCol: col });
    return revealEmptyCells(newBoard, row, col);
  }

  if (board[row][col].isRevealed) return board;

  return revealEmptyCells(board, row, col);
};
