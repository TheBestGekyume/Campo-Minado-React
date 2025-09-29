import { useEffect, useState } from "react";
import type { TCell } from "../../types/Cell";

interface CellProps {
    data: TCell;
    onClick: () => void;
    onRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    rIndex: number;
    cIndex: number;
    lastClicked: { row: number; col: number } | null;
}

export const Cell: React.FC<CellProps> = ({
    data,
    onClick,
    onRightClick,
    rIndex,
    cIndex,
    lastClicked,
}) => {
    let content = "";
    const [isRevealing, setIsRevealing] = useState(false);

    useEffect(() => {
        if (data.isRevealed) {
            setIsRevealing(true);
        }
    }, [data.isRevealed]);

    if (data.isRevealed) {
        if (data.isMine) content = "💣";
        else if (data.minesAround > 0) content = data.minesAround.toString();
        else content = "";
    } else if (data.isFlagged) {
        content = "🚩";
    }

    const handleClick = () => {
        if (!data.isRevealed && !data.isFlagged) {
            setIsRevealing(true);
        }
        onClick();
    };

    const distance =
        lastClicked != null
            ? Math.abs(rIndex - lastClicked.row) +
              Math.abs(cIndex - lastClicked.col)
            : 0;

    const delayMs = data.isRevealed ? distance * 50 : 0;

    const cellStyle = () => {
        if (!data.isRevealed) return "bg-slate-700";
        if (data.isMine) return "bg-red-600";

        switch (data.minesAround) {
            case 0:
                return "bg-neutral-500 border-black";
            case 1:
                return "bg-lime-500";
            case 2:
                return "bg-lime-700";
            case 3:
                return "bg-yellow-500";
            case 4:
                return "bg-orange-500";
            case 5:
                return "bg-red-800";
            case 6:
                return "bg-purple-800";
            case 7:
                return "bg-purple-950";
            case 8:
                return "bg-stone-950";
            default:
                return "";
        }
    };

    return (
        <div
            onClick={data.isRevealed ? undefined : handleClick}
            onContextMenu={data.isRevealed ? undefined : onRightClick}
            style={{ transitionDelay: `${delayMs}ms` }}
            className={`w-6 h-6 border-1 flex items-center border-transparent justify-center font-bold text-lg 
                ${
                    data.isRevealed
                        ? ""
                        : "hover:border-white cursor-pointer z-1"
                } 
                transition-all duration-300 ease-out transform ${
                    isRevealing ? "scale-105" : ""
                }
        ${cellStyle()}`}
        >
            {content}
        </div>
    );
};
