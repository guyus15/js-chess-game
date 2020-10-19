import domManager from './domManager.js'
import gameboard from './gameboard.js'
import piece from './piece.js'

const gameManager = () => {
  let dom = domManager();
  let board = gameboard();

  const boardEle = document.querySelector('.chess-board');

  let currentTeam = 'white';
  
  let takenPieces = [];

  const initiateBoard = () => {
    //initiates key variables, positions pieces in there starting positions.
    dom.createBoardElement();

    board.updatePos([4, 7], piece("king", "white"));
    board.updatePos([3, 7], piece("queen", "white"));
    board.updatePos([2, 7], piece("bishop", "white"));
    board.updatePos([5, 7], piece("bishop", "white"));
    board.updatePos([1, 7], piece("knight", "white"));
    board.updatePos([6, 7], piece("knight", "white"));
    board.updatePos([0, 7], piece("rook", "white"));
    board.updatePos([7, 7], piece("rook", "white"));

    board.updatePos([4, 0], piece("king", "black"));
    board.updatePos([3, 0], piece("queen", "black"));
    board.updatePos([2, 0], piece("bishop", "black"));
    board.updatePos([5, 0], piece("bishop", "black"));
    board.updatePos([1, 0], piece("knight", "black"));
    board.updatePos([6, 0], piece("knight", "black"));
    board.updatePos([0, 0], piece("rook", "black"));
    board.updatePos([7, 0], piece("rook", "black"));

    for (let i = 0; i < 8; i++) {
      board.updatePos([i, 1], piece("pawn", "black"));
      board.updatePos([i, 6], piece("pawn", "white"));
    }
 
    dom.updateBoardElement(board.getBoard());
  }

  const displayPossibleMoves = (e) => {
    let piecePos = e.detail.selectedTile;

    if (board.occupiedPos(piecePos)) {
      let piece = board.getPieceFromPos(piecePos);

      //Resetting selected tile move highlights
      dom.resetHighlights();

      //Only lets a player display the possible moves for their pieces.
      if (piece.getTeam() === currentTeam) {
        let possibleMoves = piece.getPossibleMoves(piecePos, board);
        dom.highlightTiles(possibleMoves);
      }
    }
  }

  const playerTurn = (e) => {
    let movedPieceData = e.detail.lastMovedPiece;
    let dropEvent = e.detail.dropEvent;

    let validMove = true;
    if (movedPieceData[1][0] == undefined) validMove = false;

    let movedPiece = board.getPieceFromPos(movedPieceData[0]);

    if (movedPiece.getTeam() == currentTeam && validMove) {
      let targetTilePos = [];
      targetTilePos.push(Number(dropEvent.target.getAttribute('tile-position')[0]));
      targetTilePos.push(Number(dropEvent.target.getAttribute('tile-position')[1]));

      let piecePossibleMoves = movedPiece.getPossibleMoves(movedPieceData[0], board);

      //Limits the the movement of a piece to the piece's possible moves.
      if (JSON.stringify(piecePossibleMoves).includes(JSON.stringify(targetTilePos))) {
        let takenPiece = null;
                
        //Saves a copy of the taken piece if the target position contains an enemy's piece.
        if (board.occupiedPos(targetTilePos)) {
          takenPiece = board.getPieceFromPos(targetTilePos);
          takenPieces.push(takenPiece);

          let targetTileElement = document.querySelector(`#tile-${targetTilePos[0]}${targetTilePos[1]}`);
          targetTileElement.innerHTML = "";

          dom.updateTakenPieces(currentTeam, takenPieces);
        }
      
        let data = dropEvent.dataTransfer.getData('text');
        dropEvent.target.appendChild(document.getElementById(data));

        board.updatePos(movedPieceData[0], null);
        board.updatePos(movedPieceData[1], movedPiece);

        //Increase the move counter for that piece
        movedPiece.incrementMoveCounter();

        currentTeam === 'white' ? currentTeam = 'black' : currentTeam = 'white';
        
        checkForCheck(currentTeam);

        //Display who's turn it is
        dom.displayCurrentTeam(currentTeam);

        //Resetting selected tile move highlights
        dom.resetHighlights();
      }
    }
  }

  const checkForCheck = (team) => {
    let kingPiece = null;

    board.getAllPieces().forEach(piece => {
      if (piece.getTeam() === team && piece.getPieceName() === 'king') {
        kingPiece = piece;
      }
    });

    let kingPos = board.getPosFromPiece(kingPiece);

    
    board.getAllPieces().forEach(piece => {
      if (piece.getTeam() !== team) {
        let piecePos = board.getPosFromPiece(piece);

        if (JSON.stringify(piece.getPossibleMoves(piecePos, board)).includes(JSON.stringify(kingPos))){
          console.log("CHECK!");
        }
        
      }
    });
    
  }

  const play = () => {
    initiateBoard();
  }

  boardEle.addEventListener('startMove', displayPossibleMoves);
  boardEle.addEventListener('moveSent', playerTurn)
  boardEle.addEventListener('tileSelected', displayPossibleMoves);

  return {
    play
  }
}

export default gameManager