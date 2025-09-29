import { useEffect, useState } from "react";
import type { TCell } from "../../types/Cell";

interface SquareProps {
    data: TCell; // isMine: boolean; minesAround: number; isRevealed: boolean
    onClick: () => void;
    onRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Cell: React.FC<SquareProps> = ({
    data,
    onClick,
    onRightClick,
}) => {
    let content = "";
    const [isRevealing, setIsRevealing] = useState(false);

    useEffect(() => {
        if (data.isRevealed && !isRevealing) {
            setIsRevealing(true);
        }
    }, [data.isRevealed, isRevealing]);

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
            // Pequeno delay para a animação completar antes da lógica
            setTimeout(() => {
                onClick();
            }, 150);
        } else {
            onClick();
        }
    };

    const squareStyle = () => {
        if (!data.isRevealed) return "bg-slate-700";
        if (data.isMine) return "bg-white";

        const transitionClass = isRevealing
            ? "transition-all duration-300 ease-out transform scale-105"
            : "";

        switch (data.minesAround) {
            case 0:
                return `bg-neutral-500 border-black ${transitionClass}`;
            case 1:
                return `bg-lime-500 ${transitionClass}`;
            case 2:
                return `bg-yellow-400 ${transitionClass}`;
            case 3:
                return `bg-amber-600 ${transitionClass}`;
            case 4:
                return `bg-orange-700 ${transitionClass}`;
            case 5:
                return `bg-red-800 ${transitionClass}`;
            case 6:
                return `bg-purple-800 ${transitionClass}`;
            case 7:
                return `bg-purple-950 ${transitionClass}`;
            case 8:
                return `bg-stone-950 ${transitionClass}`;
        }
    };

    return (
        <div
            onClick={data.isRevealed ? undefined : handleClick}
            onContextMenu={data.isRevealed ? undefined : onRightClick}
            className={`w-6 h-6 border flex items-center border-transparent justify-center font-bold text-lg 
                ${
                    data.isRevealed
                        ? null
                        : "hover:border-white cursor-pointer"
                } 
        ${squareStyle()}`}
        >
            {content}
        </div>
    );
};
