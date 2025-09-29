import type { TCell } from "../../../../types/Cell";

export const checkLose = (board: TCell[][], row:number, col:number): boolean =>board[row][col].isMine;
