import type { Cell } from "../../types/Cell";

/* Cria um tabuleiro de Cell[][] com minas distribuídas aleatoriamente
e calcula o número de minas vizinhas para cada célula.*/

export const buildBoard = (rows: number, cols: number, minesQuant: number): Cell[][] => {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      minesAround: 0,
      isRevealed: false,
      isFlagged: false
    }))
  );

  const generateMines = (): void => {
    let placedMines = 0; //contador de minas
    while (placedMines < minesQuant) {
      const row = Math.floor(Math.random() * rows); //pega uma linha aleatoria
      const col = Math.floor(Math.random() * cols); //pega uma coluna aleatoria
      if (!board[row][col].isMine) {
        board[row][col].isMine = true; //coloca a mina no campo selecionado randomicamente
        placedMines++;
      }
    }
  }

  const calculateMinesAround = (): Cell[][] => {
    const cellsAround = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], /*[0, 0]*/[0, 1],
      [1, -1], [1, 0], [1, 1],
    ]; //layout das celulas ao redor de uma "celula [0,0]"
    

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) { //percorre as celulas do board
        
        const currentCell = board[row][col];
        if (currentCell.isMine) continue; 

        for (const [rowOffset, columnOffset] of cellsAround) { //percorre as celulas ao redor do atual
          const neighborRow = row + rowOffset; //soma o linha atual com o desvio de cellsAround
          const neighborCol = col + columnOffset; //soma o couluna atual com o desvio de cellsAround

          const isInsideBoard = //verifica se a celula vizinha existe
            neighborRow >= 0 && neighborRow < rows &&
            neighborCol >= 0 && neighborCol < cols;

          if (isInsideBoard && board[neighborRow][neighborCol].isMine) {
            currentCell.minesAround++;
          }
        }

      }
    }

    return board;
  };

  generateMines()
  return calculateMinesAround();
}