// Game.tsx
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
                    className="transform rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    onClick={() => setDifficulty(difficulties.easy)}
                >
                    Fácil
                </button>

                <button
                    className="transform rounded-lg bg-amber-500 px-6 py-3 font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-amber-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    onClick={() => setDifficulty(difficulties.medium)}
                >
                    Médio
                </button>

                <button
                    className="transform rounded-lg bg-rose-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-rose-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    onClick={() => setDifficulty(difficulties.hard)}
                >
                    Difícil
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <Field
                rows={difficulty.rows}
                cols={difficulty.cols}
                mines={difficulty.mines}
                onStatusChange={setGameStatus}
            />

            {gameStatus !== "playing" && (
                <div className="flex flex-col items-center gap-2">
                    <p>
                        {gameStatus === "won"
                            ? "Você venceu! 🎉"
                            : "Game Over 💥"}
                    </p>
                    <button onClick={handleRetry}>Jogar novamente</button>
                </div>
            )}
        </div>
    );
}

export default Game;
