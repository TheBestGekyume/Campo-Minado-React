import { Square } from "./Square";
import { useField } from "./hooks/useField";

export const Field: React.FC<{ rows?: number; cols?: number; mines?: number }> = ({ rows = 10, cols = 10, mines = 10 }) => {
    const { board, gameStatus, minesLeft, handleReveal, handleFlag } = useField(rows, cols, mines);

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
                    {board.map((row, rIndex) =>
                        row.map((cell, cIndex) => (
                            <Square
                                key={`${rIndex}-${cIndex}`}
                                data={cell}
                                onClick={() => handleReveal(rIndex, cIndex)}
                                onRightClick={(e) => handleFlag(rIndex, cIndex, e)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
