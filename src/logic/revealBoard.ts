import type { TCell } from "../types/Cell";

export const revealBoard = (board: TCell[][]): TCell[][] =>
    board.map(row =>
        row.map(cell =>
            ({ ...cell, isRevealed: true }))
    );

