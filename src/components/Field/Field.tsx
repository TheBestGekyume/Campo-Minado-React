import { useState } from "react";
import Square from "./Square";
import type { Cell } from "../../types/Cell";
import { revealSquare } from "./utils/revealSquare";
import { toggleFlag } from "./utils/toggleFlag";
import { checkWin } from "./utils/checkWin";
import { checkLose } from "./utils/checkLose";
import { revealBoard } from "./utils/reavealBoard";

const Field: React.FC<{ rows?: number; cols?: number; mines?: number }> = ({
    rows = 10,
    cols = 10,
    mines = 10,
}) => {
    const [board, setBoard] = useState<Cell[][] | null>(null);
    const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
        "playing"
    );
    const flagsCount = board?.flat().filter((c) => c.isFlagged).length ?? 0;
    const minesLeft = mines - flagsCount;

    const handleReveal = (row: number, col: number) => {
        const newBoard = revealSquare(board, row, col, rows, cols, mines);
        setBoard(newBoard);

        if (checkWin(newBoard, mines)) {
            setGameStatus("won");
            setBoard(revealBoard(newBoard));
        }

        if (checkLose(newBoard, row, col)) {
            setGameStatus("lost");
            setBoard(revealBoard(newBoard));
        }
    };

    const handleFlag = (row: number, col: number, e: React.MouseEvent) => {
        e.preventDefault();
        const newBoard = toggleFlag(board, row, col);
        if (newBoard) {
            setBoard(newBoard);
        }
    };

    const displayBoard =
        board ||
        Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                isMine: false,
                minesAround: 0,
                isRevealed: false,
                isFlagged: false,
            }))
        );

    return (
        <div className="flex flex-col rounded-sm bg-slate-700 border-10 border-gray-600">
            <div className="flex">
                <h1 className="bg-black text-red-600 mx-auto px-1 my-2 counter-font">
                    {minesLeft.toString().padStart(3, "0")}
                </h1>
                <h1>{gameStatus}</h1>
            </div>

            <div className="border-t-10 border-gray-600">
                <div
                    className="grid justify-center rounded-sm border-gray-600"
                    style={{ gridTemplateColumns: `repeat(${cols}, 24px)` }}
                >
                    {displayBoard.map((row, rIndex) =>
                        row.map((cell, cIndex) => (
                            <Square
                                key={`${rIndex}-${cIndex}`}
                                data={cell}
                                onClick={() => handleReveal(rIndex, cIndex)}
                                onRightClick={(e) =>
                                    handleFlag(rIndex, cIndex, e)
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Field;
