const gameboard = () => {
  let board = [[null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null],
               [null, null, null, null, null, null, null, null]];

  const getBoard = () => { return board }

  const updatePos = (posArray, value) => {
    board[posArray[1]][posArray[0]] = value; 
  }

  const getPieceFromPos = (posArray) => { return board[posArray[1]][posArray[0]] }

  const getPosFromPiece = (piece) => {
    let posArray = [];

    board.forEach((row, rIndex) => {
      row.forEach((column, cIndex) => {
        if (board[rIndex][cIndex] === piece) {
          posArray = [cIndex, rIndex];
        }
      });
    });

    return posArray
  }

  const getAllPieces = () => {
    let pieces = [];

    board.forEach(row => {
      row.forEach(column => {
        if (column) pieces.push(column); 
      });
    });

    return pieces
  }

  const occupiedPos = (posArray) => {
    //console.log(`OCCUPIED POS: (${posArray})`)

    if (board[posArray[1]][posArray[0]]) {
      return true
    } else {
      return false
    }
  } 

  return {
    getBoard,
    updatePos,
    getPieceFromPos,
    getPosFromPiece,
    getAllPieces,
    occupiedPos
  }
}

export default gameboard