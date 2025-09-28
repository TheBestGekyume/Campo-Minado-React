import { useState, useMemo } from "react";
import type { Cell } from "../../../types/Cell";
import { revealSquare } from "../utils/reveals/revealSquare";
import { toggleFlag } from "../utils/toggleFlag";
import { checkWin } from "../utils/games/checkWin";
import { checkLose } from "../utils/games/checkLose";
import { revealBoard } from "../utils/reveals/revealBoard";

export const useField = (rows = 10, cols = 10, mines = 10) => {
    const [board, setBoard] = useState<Cell[][] | null>(null);
    const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

    const flagsCount = board?.flat().filter((c) => c.isFlagged).length ?? 0;
    const minesLeft = ["won", "lost"].includes(gameStatus) ? 0 : mines - flagsCount;

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
        if (newBoard) setBoard(newBoard);
    };

    const displayBoard = useMemo(() => {
        return (
            board ||
            Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => ({
                    isMine: false,
                    minesAround: 0,
                    isRevealed: false,
                    isFlagged: false,
                }))
            )
        );
    }, [board, rows, cols]);

    return { board: displayBoard, gameStatus, minesLeft, handleReveal, handleFlag };
};
