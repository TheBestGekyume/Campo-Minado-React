import type { Cell } from "../../../types/Cell";

export const revealBoard = (board: Cell[][]): Cell[][] =>
    board.map(row =>
        row.map(cell =>
            ({ ...cell, isRevealed: true }))
    );

