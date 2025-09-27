import React, { useState } from "react";
import Square from "../Square/Square";
import type { Cell } from "../../types/Cell";
import { buildBoard } from "./buildBoard";
import { revealEmptyCells } from "./revealEmptyCells";

const Field: React.FC<{ rows?: number; cols?: number; mines?: number }> = ({
    rows = 16,
    cols = 16,
    mines = 40,
}) => {
    const [board, setBoard] = useState<Cell[][] | null>(null);

    const revealSquare = (row: number, col: number) => {
        if (!board) {
            const newBoard = buildBoard(rows, cols, mines, {
                safeRow: row,
                safeCol: col,
            });
            const revealedBoard = revealEmptyCells(newBoard, row, col);
            setBoard(revealedBoard);
            return;
        }

        if (board[row][col].isRevealed) return;

        const newBoard = revealEmptyCells(board, row, col);
        setBoard(newBoard);
    };

    const flagSquare = (row: number, col: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (!board) return;
        const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
        const cell = newBoard[row][col];
        if (cell.isRevealed) return;

        cell.isFlagged = !cell.isFlagged;
        setBoard(newBoard);
    };

    if (!board) {
        return (
            <div
                className="grid justify-center"
                style={{ gridTemplateColumns: `repeat(${cols}, 32px)` }}
            >
                {Array.from({ length: rows }).map((_, rIndex) =>
                    Array.from({ length: cols }).map((_, cIndex) => (
                        <Square
                            key={`${rIndex}-${cIndex}`}
                            data={{
                                isMine: false,
                                minesAround: 0,
                                isRevealed: false,
                                isFlagged: false,
                            }}
                            onClick={() => revealSquare(rIndex, cIndex)}
                            onRightClick={(e) => flagSquare(rIndex, cIndex, e)}
                        />
                    ))
                )}
            </div>
        );
    }

    return (
        <div
            className="grid justify-center"
            style={{ gridTemplateColumns: `repeat(${cols}, 32px)` }}
        >
            {board.map((row, rIndex) =>
                row.map((cell, cIndex) => (
                    <Square
                        key={`${rIndex}-${cIndex}`}
                        data={cell}
                        onClick={() => revealSquare(rIndex, cIndex)}
                        onRightClick={(e) => flagSquare(rIndex, cIndex, e)}
                    />
                ))
            )}
        </div>
    );
};

export default Field;
