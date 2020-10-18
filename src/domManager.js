const domManager = () => {
  const chessBoard = document.querySelector('.chess-board');

  let lastMoveStartCoords = [];

  let highlightedTiles = [];

  const createEventListeners = () => {
    const tiles = document.querySelectorAll('.chess-board-tile');
    
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
          chessBoard.dispatchEvent(new CustomEvent('tileSelected', {
            detail: {
              selectedTile: [Number(tile.getAttribute('tile-position')[0]), 
                            Number(tile.getAttribute('tile-position')[1])]
            }
          }));
      })
    })
  }

  const createBoardElement = () => {
    let startWithWhite = false;

    const chessBoard = document.querySelector('.chess-board');
    chessBoard.innerHTML = "";

    for (let row = 0; row < 8; row++) {
      startWithWhite = !startWithWhite;
      for (let column = 0; column < 8; column++){
        let currentTile = document.createElement('div');
        currentTile.classList.add('chess-board-tile');
        currentTile.id = `tile-${column}${row}`;
        currentTile.setAttribute('tile-position', `${column}${row}`);

        currentTile.addEventListener('dragover', dragoverHandler);
        currentTile.addEventListener('drop', dropHandler);

        //Offsets the black and white pattern on the board
        if (startWithWhite) {
          (column + 1) % 2 == 0 ? currentTile.style.backgroundColor = '#555' 
                            : currentTile.style.backgroundColor = 'white';
        } else {
          (column) % 2 == 0 ? currentTile.style.backgroundColor = '#555' 
                            : currentTile.style.backgroundColor = 'white';
        }

        chessBoard.appendChild(currentTile);
      }
    }

    createEventListeners();
  }

  const updateBoardElement = (boardArray) => {
    let pieceNum = 0;

    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++){
        let currentTile = document.querySelector(`#tile-${column}${row}`);
        
        if (boardArray[row][column] != null) {
          pieceNum++;
          let draggablePiece = document.createElement('p');
          draggablePiece.textContent = boardArray[row][column].getSymbol();
          draggablePiece.draggable = "true";
          draggablePiece.id = `piece-${pieceNum}`;
          draggablePiece.addEventListener('dragstart', dragstartHandler);

          currentTile.appendChild(draggablePiece);   
        } else {
          currentTile.innerHTML = "";
        }
      }
    }
  }

  const updateTakenPieces = (team, piecesArray) => {
    const pieceContainer = document.querySelector(`.piece-container.${team}`);
    pieceContainer.innerHTML = "";

    piecesArray.forEach(piece => {
      if(piece.getTeam() != team) {
        let pieceElement = document.createElement('p')
        pieceElement.textContent = piece.getSymbol();

        pieceContainer.appendChild(pieceElement);
      }
    })
  }

  const dragstartHandler = (e) => {
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.dropEffect = "move";

    let parentNode = e.target.parentNode;

    lastMoveStartCoords = [];

    if (parentNode.getAttribute('tile-position') != null){
      lastMoveStartCoords.push(Number(parentNode.getAttribute('tile-position')[0]));
      lastMoveStartCoords.push(Number(parentNode.getAttribute('tile-position')[1]));
    }

    chessBoard.dispatchEvent(new CustomEvent('startMove', {
      detail: {
        selectedTile: lastMoveStartCoords
      }
    }));
  }

  const dragoverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  const dropHandler = (e) => {
    e.preventDefault();

    //var data = e.dataTransfer.getData("text");
    //e.target.appendChild(document.getElementById(data));
    
    let lastMoveDetails = []

    let lastMoveEndCoords = [];

    if (e.target.getAttribute('tile-position') != null){
      lastMoveEndCoords.push(Number(e.target.getAttribute('tile-position')[0]));
      lastMoveEndCoords.push(Number(e.target.getAttribute('tile-position')[1]));
    }

    lastMoveDetails.push(lastMoveStartCoords);
    lastMoveDetails.push(lastMoveEndCoords);

    chessBoard.dispatchEvent(new CustomEvent('moveSent', {
      detail: { 
        dropEvent: e, 
        lastMovedPiece: lastMoveDetails 
      }
    }));
  }

  const displayCurrentTeam = (team) => {
    let turnIndicator = document.querySelector('#turn-indicator');

    if (team === 'white') {
      turnIndicator.textContent = "- White's Turn -";
    } else {
      turnIndicator.textContent = "- Black's Turn - ";
    }
  }

  const highlightTiles = (movesArray) => {                         
    //Responsible for highlighting the possible moves available for each piece.
    movesArray.forEach(tile => {
      let tileElement = document.getElementById(`tile-${tile[0]}${tile[1]}`);
      if (tileElement != undefined) { 
        highlightedTiles.push(
          [
            tile,
            tileElement.style.backgroundColor
          ]
        );
        tileElement.style.backgroundColor = "rgba(50, 255, 50)";
      }
    })
  }

  const resetHighlights = () => {
    //Responsible for cancelling the highlighting of the possible moves of a piece.
    highlightedTiles.forEach(tile => {
      let tileElement = document.getElementById(`tile-${tile[0][0]}${tile[0][1]}`);
      tileElement.style.backgroundColor = tile[1];
    })

    highlightedTiles = [];
  }

  return {
    createBoardElement,
    updateBoardElement,
    updateTakenPieces,
    displayCurrentTeam,
    highlightTiles,
    resetHighlights
  }
}

export default domManager