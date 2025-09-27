export type Cell = {
  isMine: boolean;
  minesAround: number;
  isRevealed: boolean;
  isFlagged: boolean;
}