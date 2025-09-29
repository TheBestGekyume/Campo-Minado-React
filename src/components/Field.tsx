import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { useField } from "../hooks/useField";

export const Field: React.FC<{
    rows: number;
    cols: number;
    mines: number;
    onStatusChange?: (status: "playing" | "won" | "lost") => void;
}> = ({ rows, cols, mines, onStatusChange }) => {
    const { board, gameStatus, minesLeft, handleReveal, handleFlag } = useField(
        rows,
        cols,
        mines
    );

    const [lastClicked, setLastClicked] = useState<{
        row: number;
        col: number;
    } | null>(null);

    useEffect(() => {
        onStatusChange?.(gameStatus);
    }, [gameStatus, onStatusChange]);

    const handleCellClick = (r: number, c: number) => {
        setLastClicked({ row: r, col: c });
        handleReveal(r, c);
    };

    return (
        <div className="flex flex-col rounded-sm bg-slate-700 border-10 border-gray-600">
            <div className="flex">
                <h1 className="bg-black text-red-600 mx-auto px-1 my-2 counter-font">
                    {minesLeft.toString().padStart(3, "0")}
                </h1>
            </div>

            <div className="border-t-10 border-gray-600">
                <div
                    className="grid justify-center rounded-sm border-gray-600"
                    style={{ gridTemplateColumns: `repeat(${cols}, 24px)` }}
                >
                    {board.map((row, rIndex) =>
                        row.map((cell, cIndex) => (
                            <Cell
                                key={`${rIndex}-${cIndex}`}
                                data={cell}
                                rIndex={rIndex}
                                cIndex={cIndex}
                                lastClicked={lastClicked}
                                onClick={() => handleCellClick(rIndex, cIndex)}
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
