import type { Cell } from "../../../types/Cell";

export const checkLose = (board: Cell[][], row:number, col:number): boolean =>board[row][col].isMine;
