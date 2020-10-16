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

  const occupiedPos = (posArray) => {
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
    occupiedPos
  }
}

export default gameboard