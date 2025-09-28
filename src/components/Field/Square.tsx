import React from "react";
import type { Cell } from "../../types/Cell";

interface SquareProps {
    data: Cell; // isMine: boolean; minesAround: number; isRevealed: boolean
    onClick: () => void;
    onRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Square: React.FC<SquareProps> = ({ data, onClick, onRightClick }) => {
    let content = "";

    if (data.isRevealed) {
        if (data.isMine) content = "💣";
        else if (data.minesAround > 0) content = data.minesAround.toString();
        else content = "";
    } else if (data.isFlagged) {
        content = "🚩";
    }
    const squareStyle = () => {
        if (!data.isRevealed) return "bg-slate-700";  
        if (data.isMine) return "bg-white";

        switch (data.minesAround) {
            case 0:
                return "bg-neutral-500 border-black";
            case 1:
                return "bg-lime-500";
            case 2:
                return "bg-yellow-400";
            case 3:
                return "bg-amber-600";
            case 4:
                return "bg-orange-700";
            case 5:
                return "bg-red-800";
            case 6:
                return "bg-purple-800";
            case 7:
                return "bg-purple-950";
            case 8:
                return "bg-stone-950";
        }
    };

    return (
        <div
            onClick={onClick}
            onContextMenu={onRightClick}
            className={`w-6 h-6 border flex items-center border-transparent hover:border-white
                justify-center cursor-pointer font-bold text-lg
        ${squareStyle()}`}
        >
            {content}
        </div>
    );
};

export default Square;
