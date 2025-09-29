import { useState } from "react";
import { Field } from "./Field";

type Difficulty = { rows: number; cols: number; mines: number };

const difficulties = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 },
};

function Game() {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
        "playing"
    );

    const handleRetry = () => {
        setGameStatus("playing");
        setDifficulty(null);
    };

    if (!difficulty) {
        return (
            <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border-2 border-red-900 p-10">
                <button
                    className="rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
                    onClick={() => setDifficulty(difficulties.easy)}
                >
                    Fácil
                </button>
                <button
                    className="rounded-lg bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-600"
                    onClick={() => setDifficulty(difficulties.medium)}
                >
                    Médio
                </button>
                <button
                    className="rounded-lg bg-rose-600 px-6 py-3 font-bold text-white hover:bg-rose-700"
                    onClick={() => setDifficulty(difficulties.hard)}
                >
                    Difícil
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className={`${gameStatus === "playing" ? "z-20 " : "z-10"}`}>
                <Field
                    rows={difficulty.rows}
                    cols={difficulty.cols}
                    mines={difficulty.mines}
                    onStatusChange={setGameStatus}
                />
            </div>

            <div
                className={`fixed inset-0 flex items-center justify-center z-10 
                    transition-opacity duration-500 ease-in-out
                    ${gameStatus !== "playing" ? "opacity-95" : "opacity-0"}
                    `}
            >
                <div
                    className={`bg-neutral-900 border-2 rounded-lg p-8 max-w-sm w-75 mx-4 shadow-2xl
                        transform transition-all duration-300
                        ${
                            gameStatus === "won"
                                ? "border-green-600 scale-105"
                                : "border-red-600 scale-100"
                        }`}
                >
                    <div className="flex flex-col items-center gap-6 text-center">
                        <p
                            className={`text-2xl font-bold ${
                                gameStatus === "won"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {gameStatus === "won"
                                ? "Você venceu! 🎉"
                                : "Game Over 💥"}
                        </p>
                        <button
                            onClick={handleRetry}
                            className="bg-zinc-800 hover:bg-zinc-950 text-white 
                                font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Jogar novamente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
