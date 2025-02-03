import './style.css';

    const app = document.getElementById('app');

    // Create background layer for parallax effect
    const backgroundLayer = document.createElement('div');
    backgroundLayer.classList.add('background-layer');
    app.appendChild(backgroundLayer);

    // Create info text
    const infoText = document.createElement('div');
    infoText.classList.add('info');
    infoText.textContent = 'Current Player: X';
    app.appendChild(infoText);

    // Create game board
    const board = document.createElement('div');
    board.classList.add('board');
    app.appendChild(board);

    // Create cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      board.appendChild(cell);
    }

    // Create restart button
    const restartButton = document.createElement('button');
    restartButton.classList.add('restart-button');
    restartButton.textContent = 'Restart Game';
    app.appendChild(restartButton);

    // Create winner text container
    const winnerContainer = document.createElement('div');
    winnerContainer.classList.add('winner-container');
    app.appendChild(winnerContainer);

    // Create winner text element
    const winnerText = document.createElement('div');
    winnerText.classList.add('winner-text');
    winnerContainer.appendChild(winnerText);

    // Game variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Event listeners
    board.addEventListener('click', handleCellClick);
    restartButton.addEventListener('click', handleRestartClick);

    // Parallax effect
    document.addEventListener('mousemove', (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      backgroundLayer.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });

    function handleCellClick(event) {
      const cell = event.target;
      const index = cell.dataset.index;

      if (gameBoard[index] !== '' || !gameActive) {
        return;
      }

      gameBoard[index] = currentPlayer;
      cell.dataset.content = currentPlayer;

      if (checkWin()) {
        winnerText.textContent = `${currentPlayer} Wins!`;
        winnerContainer.classList.add('show');
        gameActive = false;

        // Add blur to background elements
        backgroundLayer.classList.add('blur');
        infoText.classList.add('blur');
        board.classList.add('blur');

        // Reposition and style the restart button
        restartButton.classList.add('repositioned');
        restartButton.classList.remove('blur');

        return;
      }

      if (checkDraw()) {
        winnerText.textContent = 'Draw!';
        winnerContainer.classList.add('show');
        gameActive = false;

        // Add blur to background elements
        backgroundLayer.classList.add('blur');
        infoText.classList.add('blur');
        board.classList.add('blur');

        // Reposition and style the restart button
        restartButton.classList.add('repositioned');
        restartButton.classList.remove('blur');

        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      infoText.textContent = `Current Player: ${currentPlayer}`;
    }

    function checkWin() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return true;
        }
      }

      return false;
    }

    function checkDraw() {
      return gameBoard.every(cell => cell !== '');
    }

    function handleRestartClick() {
      // Set background to wipe color
      document.body.style.backgroundColor = '#0d1117';

      // Create wipe animation element
      const wipe = document.createElement('div');
      wipe.classList.add('wipe-animation');
      app.appendChild(wipe);

      // Reset and hide winner text
      winnerText.textContent = '';
      winnerContainer.classList.remove('show');

      // Remove blur from all elements
      backgroundLayer.classList.remove('blur');
      infoText.classList.remove('blur');
      board.classList.remove('blur');
      restartButton.classList.remove('blur');

      // Reset position and style of the restart button
      restartButton.classList.remove('repositioned');

      // Set initial opacity for fade-in
      backgroundLayer.style.opacity = 0;
      infoText.style.opacity = 0;
      board.style.opacity = 0;
      restartButton.style.opacity = 0;

      setTimeout(() => {
        // Reset game variables
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        infoText.textContent = 'Current Player: X';

        // Clear cell content
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
          cell.dataset.content = '';
        });

        // Remove wipe animation element
        app.removeChild(wipe);

        // Fade in elements
        backgroundLayer.style.opacity = 1;
        infoText.style.opacity = 1;
        board.style.opacity = 1;
        restartButton.style.opacity = 1;

        // Reset background to default color
        document.body.style.backgroundColor = '#0d1117';
      }, 1000);
    }
