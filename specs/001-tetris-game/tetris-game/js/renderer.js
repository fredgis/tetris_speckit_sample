/**
 * Renderer Module
 * Handles canvas rendering and DOM updates for the game
 */

// eslint-disable-next-line import/prefer-default-export
export class Renderer {
  constructor(canvas, nextCanvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.nextCanvas = nextCanvas;
    this.nextCtx = this.nextCanvas ? this.nextCanvas.getContext('2d') : null;

    this.cellSize = 30; // pixels per grid cell
    this.gridColor = '#333';
    this.lockedPieceColor = '#555';
  }

  /**
   * Clears the entire canvas
   */
  clear() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the game board grid
   * @param {Array<Array<string|null>>} grid - Board grid state
   */
  drawGrid(grid) {
    // Draw grid lines
    this.ctx.strokeStyle = this.gridColor;
    this.ctx.lineWidth = 1;

    for (let row = 0; row <= grid.length; row += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, row * this.cellSize);
      this.ctx.lineTo(grid[0].length * this.cellSize, row * this.cellSize);
      this.ctx.stroke();
    }

    for (let col = 0; col <= grid[0].length; col += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(col * this.cellSize, 0);
      this.ctx.lineTo(col * this.cellSize, grid.length * this.cellSize);
      this.ctx.stroke();
    }
  }

  /**
   * Draws locked pieces on the board
   * @param {Array<Array<string|null>>} grid - Board grid state
   */
  drawLockedPieces(grid) {
    for (let row = 0; row < grid.length; row += 1) {
      for (let col = 0; col < grid[row].length; col += 1) {
        if (grid[row][col]) {
          this.drawCell(col, row, grid[row][col]);
        }
      }
    }
  }

  /**
   * Draws the ghost piece (shadow showing where piece will land)
   * @param {Object} piece - Active piece object
   * @param {Function} checkCollision - Collision check function
   */
  drawGhostPiece(piece, checkCollision) {
    if (!piece) return;

    // Find ghost position by moving piece down until collision
    let ghostY = piece.y;
    const shape = piece.shape[piece.rotation];
    
    while (true) {
      let collision = false;
      for (let row = 0; row < shape.length; row += 1) {
        for (let col = 0; col < shape[row].length; col += 1) {
          if (shape[row][col]) {
            if (checkCollision(piece.x + col, ghostY + row + 1)) {
              collision = true;
              break;
            }
          }
        }
        if (collision) break;
      }
      if (collision) break;
      ghostY += 1;
    }

    // Draw ghost piece with transparency
    if (ghostY !== piece.y) {
      this.ctx.save();
      this.ctx.globalAlpha = 0.3;
      for (let row = 0; row < shape.length; row += 1) {
        for (let col = 0; col < shape[row].length; col += 1) {
          if (shape[row][col]) {
            this.drawCell(piece.x + col, ghostY + row, piece.color, false);
          }
        }
      }
      this.ctx.restore();
    }
  }

  /**
   * Draws the active piece
   * @param {Object} piece - Active piece object
   */
  drawActivePiece(piece) {
    if (!piece) return;

    const shape = piece.shape[piece.rotation];
    for (let row = 0; row < shape.length; row += 1) {
      for (let col = 0; col < shape[row].length; col += 1) {
        if (shape[row][col]) {
          this.drawCell(piece.x + col, piece.y + row, piece.color, true);
        }
      }
    }
  }

  /**
   * Draws a single cell
   * @param {number} x - Grid column
   * @param {number} y - Grid row
   * @param {string} color - Cell color
   * @param {boolean} isActive - Whether this is an active piece cell
   */
  drawCell(x, y, color, isActive = false) {
    const pixelX = x * this.cellSize;
    const pixelY = y * this.cellSize;

    // Fill cell
    this.ctx.fillStyle = color;
    this.ctx.fillRect(pixelX, pixelY, this.cellSize, this.cellSize);

    // Add border for active pieces
    if (isActive) {
      this.ctx.strokeStyle = '#fff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        pixelX + 1,
        pixelY + 1,
        this.cellSize - 2,
        this.cellSize - 2,
      );
    }
  }

  /**
   * Draws the complete board with grid, locked pieces, ghost piece, and active piece
   * @param {Array<Array<string|null>>} grid - Board grid state
   * @param {Object} activePiece - Active piece object
   * @param {Function} checkCollision - Collision check function for ghost piece
   */
  drawBoard(grid, activePiece, checkCollision = null) {
    this.clear();
    this.drawGrid(grid);
    this.drawLockedPieces(grid);
    if (checkCollision) {
      this.drawGhostPiece(activePiece, checkCollision);
    }
    this.drawActivePiece(activePiece);
  }

  /**
   * Updates the UI with current game state
   * @param {Object} state - Game state object
   */
  drawUI(state) {
    // Update score
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
      scoreElement.textContent = state.score.toString();
    }

    // Update level
    const levelElement = document.getElementById('level-display');
    if (levelElement) {
      levelElement.textContent = state.level.toString();
    }

    // Update lines
    const linesElement = document.getElementById('lines-display');
    if (linesElement) {
      linesElement.textContent = state.lines.toString();
    }
  }

  /**
   * Draws the next piece preview
   * @param {Object} nextPiece - Next piece object
   */
  drawNextPiece(nextPiece) {
    if (!this.nextCtx || !nextPiece) return;

    // Clear canvas
    this.nextCtx.fillStyle = '#000';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

    const shape = nextPiece.shape[0]; // Always show rotation 0
    const previewCellSize = 20; // Smaller cells for preview

    // Center the preview
    const offsetX = (this.nextCanvas.width - shape[0].length * previewCellSize) / 2;
    const offsetY = (this.nextCanvas.height - shape.length * previewCellSize) / 2;

    for (let row = 0; row < shape.length; row += 1) {
      for (let col = 0; col < shape[row].length; col += 1) {
        if (shape[row][col]) {
          this.nextCtx.fillStyle = nextPiece.color;
          this.nextCtx.fillRect(
            offsetX + col * previewCellSize,
            offsetY + row * previewCellSize,
            previewCellSize,
            previewCellSize,
          );
        }
      }
    }
  }

  /**
   * Shows the game over overlay
   * @param {number} finalScore - Final score to display
   */
  showGameOver(finalScore) {
    const overlay = document.getElementById('game-over-overlay');
    const scoreDisplay = document.getElementById('final-score');

    if (overlay) {
      overlay.hidden = false;
    }

    if (scoreDisplay) {
      scoreDisplay.textContent = `Final Score: ${finalScore}`;
    }
  }

  /**
   * Hides the game over overlay
   */
  hideGameOver() {
    const overlay = document.getElementById('game-over-overlay');
    if (overlay) {
      overlay.hidden = true;
    }
  }

  /**
   * Shows the pause overlay
   */
  showPause() {
    const overlay = document.getElementById('pause-overlay');
    if (overlay) {
      overlay.hidden = false;
    }
  }

  /**
   * Hides the pause overlay
   */
  hidePause() {
    const overlay = document.getElementById('pause-overlay');
    if (overlay) {
      overlay.hidden = true;
    }
  }

  /**
   * Animates line clear effect with particle explosion
   * @param {Array<Object>} lineData - Data of lines being cleared (y position and cells)
   * @param {number} lineCount - Number of lines cleared (1-4)
   * @returns {Promise} Resolves when animation completes
   */
  animateLineClear(lineData, lineCount) {
    return new Promise((resolve) => {
      const particles = [];
      const isTetris = lineCount === 4;
      
      // Create particles from each cell in cleared lines
      lineData.forEach((line) => {
        for (let col = 0; col < 10; col++) {
          const cellColor = line.cells[col];
          const count = isTetris ? 8 : 3; // More particles for Tetris!
          const speedMultiplier = isTetris ? 2 : 1;
          
          for (let i = 0; i < count; i++) {
            particles.push({
              x: col * this.cellSize + this.cellSize / 2,
              y: line.y * this.cellSize + this.cellSize / 2,
              vx: (Math.random() - 0.5) * 8 * speedMultiplier,
              vy: (Math.random() - 0.5) * 8 * speedMultiplier - (isTetris ? 4 : 2),
              size: Math.random() * (isTetris ? 6 : 4) + 2,
              life: 1.0,
              color: cellColor || `hsl(${Math.random() * 60 + 40}, 100%, 60%)`,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.3,
            });
          }
        }
      });

      const duration = isTetris ? 900 : 600; // Longer animation for Tetris
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Update and draw particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.3; // gravity
          p.rotation += p.rotationSpeed;
          p.life = 1 - progress;

          if (p.life > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      animate();
    });
  }
}
