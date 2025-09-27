import React, { useState } from "react";
import Square from "../Square/Square";
import type { Cell } from "../../types/Cell";
import { buildBoard } from "./buildBoard";

const Field: React.FC<{ rows?: number; cols?: number; mines?: number }> = ({
    rows = 10,
    cols = 10,
    mines = 20,
}) => {
    const [board, setBoard] = useState<Cell[][]>(() =>
        buildBoard(rows, cols, mines)
    );

    const revealSquare = (r: number, c: number) => {
        if (board[r][c].isRevealed) return;

        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        newBoard[r][c].isRevealed = true;
        setBoard(newBoard);
    };

    const flagSquare = (r: number, c: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (board[r][c].isRevealed) return;

        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  
        if (newBoard[r][c].isRevealed) return;
        newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
        setBoard(newBoard);
    };

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
