import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { useField } from "../hooks/useField";
import { FaBomb } from "react-icons/fa";
import { MdTimer } from "react-icons/md";

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

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer: number | null = null;

        if (gameStatus === "playing") {
            timer = window.setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameStatus]);

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (totalSeconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    useEffect(() => {
        if (gameStatus === "playing") {
            setSeconds(0);
        }
    }, [rows, cols, mines, gameStatus]);

    useEffect(() => {
        onStatusChange?.(gameStatus);
    }, [gameStatus, onStatusChange]);

    const handleCellClick = (r: number, c: number) => {
        setLastClicked({ row: r, col: c });
        handleReveal(r, c);
    };

    return (
        <section className="flex flex-col rounded-sm bg-slate-700 border-10 border-gray-600">
            <div className="flex flex-row bg-black justify-evenly items-center ">
                <div className="flex  items-baseline gap-1 text-red-600 counter-font">
                    <span>{minesLeft.toString().padStart(2, "0")} </span>
                    <FaBomb className="w-6 h-auto fill-neutral-300" />
                </div>

                <div className="flex  bg-black gap-1 counter-font">
                    <span>{formatTime(seconds)}</span>
                    <MdTimer className="w-6 h-auto fill-neutral-300" />
                </div>
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
        </section>
    );
};
