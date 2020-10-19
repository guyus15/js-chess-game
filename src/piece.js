const piece = (pieceName, pieceTeam) => {
  let symbol;
  let moveCounter = 0;

  switch (pieceName.toLowerCase()) {
    case "king":
      pieceTeam.toLowerCase() == "white" ? symbol = "♔" : symbol = "♚"
      break;
    case "queen":
      pieceTeam.toLowerCase() == "white" ? symbol = "♕" : symbol = "♛"
      break;
    case "bishop":
      pieceTeam.toLowerCase() == "white" ? symbol = "♗" : symbol = "♝"
      break;
    case "knight":
      pieceTeam.toLowerCase() == "white" ? symbol = "♘" : symbol = "♞"
      break;
    case "rook":
      pieceTeam.toLowerCase() == "white" ? symbol = "♖" : symbol = "♜"
      break;
    default: //Pawn
      pieceTeam.toLowerCase() == "white" ? symbol = "♙" : symbol = "♟︎"
      break;
  }

  const getPieceName = () => { return pieceName }

  const getSymbol = () => { return symbol }

  const getTeam = () => { return pieceTeam }

  const getMovePath = (posArray, targetPos) => {
    let path = [];
    let negative = false;

    //Vertical move path
    if (posArray[0] == targetPos[0]) {
      let difference = posArray[1] - targetPos[1];
      if (difference < 0) {
        negative = true;
        difference *= -1;
      }
      for (let i = 1; i <= difference; i++) {
        negative ? path.push([posArray[0], posArray[1] + i]) : 
                   path.push([posArray[0], posArray[1] - i]);
      }
      //Horizontal move path
    } else if (posArray[1] === targetPos[1]) {
      let difference = posArray[0] - targetPos[0];
      if (difference < 0) {
        negative = true;
        difference *= -1;
      }
      for (let i = 1; i <= difference; i++) {
        negative ? path.push([posArray[0] + i, posArray[1]]) :
                   path.push([posArray[0] - i, posArray[1]])
      }
      //Diagonal move path
    } else {
      let xDifference = posArray[0] - targetPos[0];
      let yDifference = posArray[1] - targetPos[1];

      let xNegative = false;
      let yNegative = false;

      if (xDifference < 0) {
        xNegative = true;
        xDifference *= -1;
      } 
      if (yDifference < 0) {
        yNegative = true;
        yDifference *= -1;
      }

      for(let i = 1; i <= xDifference; i++) {
        if (!xNegative && !yNegative) {
          path.push([posArray[0] - i, posArray[1] - i]);
        } else if (!xNegative && yNegative) {
          path.push([posArray[0] - i, posArray[1] + i]);
        } else if (xNegative && yNegative) {
          path.push([posArray[0] + i, posArray[1] + i]);
        } else if (xNegative && !yNegative) {
          path.push([posArray[0] + i, posArray[1] - i]);
        }
      }
    }

    return path
  }

  const getPossibleMoves = (posArray, board) => {
    let possibleMoves = []

    switch (pieceName.toLowerCase()) {
      case "king":
        possibleMoves.push([posArray[0] + 1, posArray[1]]);
        possibleMoves.push([posArray[0] - 1, posArray[1]]);
        possibleMoves.push([posArray[0], posArray[1] + 1]);
        possibleMoves.push([posArray[0], posArray[1] - 1]);
        possibleMoves.push([posArray[0] + 1, posArray[1] + 1]);
        possibleMoves.push([posArray[0] - 1, posArray[1] - 1]);
        possibleMoves.push([posArray[0] + 1, posArray[1] - 1]);
        possibleMoves.push([posArray[0] - 1, posArray[1] + 1]);
        break;
      case "queen":
        for (let i = 0; i < 8; i++){
          if (JSON.stringify([i, posArray[1]]) != JSON.stringify([posArray[0], posArray[1]])) {
            possibleMoves.push([i, posArray[1]]);
          }
          if (JSON.stringify([posArray[0], i]) != JSON.stringify([posArray[0], posArray[1]])) {
            possibleMoves.push([posArray[0], i]);
          }
        }
        for (let i = 1; i < (8 - posArray[0]); i++) {
          possibleMoves.push([posArray[0] + i, posArray[1] + i]);
          possibleMoves.push([posArray[0] + i, posArray[1] - i]);
        }
        for (let i = 1; i < posArray[0] + 1; i++) {
          possibleMoves.push([posArray[0] - i, posArray[1] + i]);
          possibleMoves.push([posArray[0] - i, posArray[1] - i]);
        }
        break;
      case "bishop":
        for (let i = 1; i < (8 - posArray[0]); i++) {
          possibleMoves.push([posArray[0] + i, posArray[1] + i]);
          possibleMoves.push([posArray[0] + i, posArray[1] - i]);
        }
        for (let i = 1; i < posArray[0] + 1; i++) {
          possibleMoves.push([posArray[0] - i, posArray[1] + i]);
          possibleMoves.push([posArray[0] - i, posArray[1] - i]);
        }
        break;
      case "knight":
        possibleMoves.push([posArray[0] - 2, posArray[1] + 1]);
        possibleMoves.push([posArray[0] - 1, posArray[1] + 2]);
        possibleMoves.push([posArray[0] + 1, posArray[1] + 2]);
        possibleMoves.push([posArray[0] + 2, posArray[1] + 1]);
        possibleMoves.push([posArray[0] + 2, posArray[1] - 1]);
        possibleMoves.push([posArray[0] + 1, posArray[1] - 2]);
        possibleMoves.push([posArray[0] - 1, posArray[1] - 2]);
        possibleMoves.push([posArray[0] - 2, posArray[1] - 1]);
        break;
      case "rook":
        for (let i = 0; i < 8; i++){
          if (JSON.stringify([i, posArray[1]]) != JSON.stringify([posArray[0], posArray[1]])) {
            possibleMoves.push([i, posArray[1]]);
          }
          if (JSON.stringify([posArray[0], i]) != JSON.stringify([posArray[0], posArray[1]])) {
            possibleMoves.push([posArray[0], i]);
          }
        }
        break;
      default: //Pawn
        if (pieceTeam === "white"){
          if(moveCounter === 0 ){
            if (!board.occupiedPos([posArray[0], posArray[1] - 1])) possibleMoves.push([posArray[0], posArray[1] - 1]);
            if (!board.occupiedPos([posArray[0], posArray[1] - 2])) possibleMoves.push([posArray[0], posArray[1] - 2]);
          } else {
            if (!board.occupiedPos([posArray[0], posArray[1] - 1])) possibleMoves.push([posArray[0], posArray[1] - 1]);
          }

          if (board.occupiedPos([posArray[0] + 1, posArray[1] - 1])) {
            let pieceOnTile = board.getPieceFromPos([posArray[0] + 1, posArray[1] - 1]);

            if (pieceOnTile.getTeam() === 'black') possibleMoves.push([posArray[0] + 1, posArray[1] - 1]);
          } 
          if (board.occupiedPos([posArray[0] - 1, posArray[1] - 1])) {
            let pieceOnTile = board.getPieceFromPos([posArray[0] - 1, posArray[1] - 1]);

            if (pieceOnTile.getTeam() === 'black') possibleMoves.push([posArray[0] - 1, posArray[1] - 1]);
          }

        } else {
          if(moveCounter === 0 ){
            if (!board.occupiedPos([posArray[0], posArray[1] + 1])) possibleMoves.push([posArray[0], posArray[1] + 1]);
            if (!board.occupiedPos([posArray[0], posArray[1] + 2])) possibleMoves.push([posArray[0], posArray[1] + 2]);
          } else {
            if (!board.occupiedPos([posArray[0], posArray[1] + 1])) possibleMoves.push([posArray[0], posArray[1] + 1]);
          }

          if (board.occupiedPos([posArray[0] + 1, posArray[1] + 1])) {
            let pieceOnTile = board.getPieceFromPos([posArray[0] + 1, posArray[1] + 1]);

            if (pieceOnTile.getTeam() === 'white') possibleMoves.push([posArray[0] + 1, posArray[1] + 1]);
          }
          if (board.occupiedPos([posArray[0] - 1, posArray[1] + 1])) {
            let pieceOnTile = board.getPieceFromPos([posArray[0] - 1, posArray[1] + 1]);

            if (pieceOnTile.getTeam() === 'white') possibleMoves.push([posArray[0] - 1, posArray[1] + 1]);
          }
        }
        break;
    }

    let currentPiece = board.getPieceFromPos(posArray);
    let currentTeam = currentPiece.getTeam();

    let finalPMoves = [];
    
    if (currentPiece.getPieceName() != "knight") {
      possibleMoves.forEach(move => {
        let valid = true;
        let pieceCounter = 0;
        
        //Removes negatives from the possible moves
        if ((move[0] <= 7 && move[0] >= 0) && (move[1] <= 7 && move[1] >= 0)){
          let movePath = getMovePath(posArray, move);
  
          movePath.forEach(pathPos => {
            //Check if the move path contains a piece that is not part of
            //current team
            if ((board.occupiedPos(pathPos) && board.getPieceFromPos(pathPos).getTeam() === currentTeam) || pieceCounter > 0) {
              valid = false;
            }
  
            if (board.occupiedPos(pathPos)) pieceCounter++;
          });
        } else {
          valid = false;
        }
        
        if (valid) finalPMoves.push(move);
      });
    } else {
      possibleMoves.forEach(move => {
        let valid = true;

        if ((move[0] <= 7 && move[0] >= 0) && (move[1] <= 7 && move[1] >= 0)) {
          let currentTileCoords = [[move[0]],[move[1]]]; 

          if (board.occupiedPos(currentTileCoords)) {
            let pieceOnTile = board.getPieceFromPos(currentTileCoords);

            if (pieceOnTile.getTeam() == currentPiece.getTeam()) {
              valid = false;
            }
          }
        }

        if (valid) finalPMoves.push(move);
      });
    }

    return finalPMoves
  }

  const incrementMoveCounter = () => { moveCounter++ }

  return {
    getPieceName,
    getSymbol,
    getTeam,
    getPossibleMoves,
    incrementMoveCounter
  }
}

export default piece