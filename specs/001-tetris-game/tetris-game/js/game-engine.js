/**
 * Game Engine Module
 * Orchestrates game loop, timing, and coordinates all modules
 */

import { Board } from './board.js';
import { PieceQueue } from './piece-queue.js';
import { GameState } from './state.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';
import { getShapeCoords, rotate } from './tetromino.js';

// eslint-disable-next-line import/prefer-default-export
export class GameEngine {
  constructor(canvas, nextCanvas) {
    this.board = new Board();
    this.pieceQueue = new PieceQueue();
    this.state = new GameState();
    this.renderer = new Renderer(canvas, nextCanvas);
    this.input = new InputHandler(this);

    this.activePiece = null;
    this.lastFallTime = 0;
    this.isRunning = false;
    this.animationFrameId = null;
    this.lastTime = 0;
  }

  /**
   * Starts the game
   */
  start() {
    this.board.reset();
    this.pieceQueue.reset();
    this.state.reset();
    this.renderer.hideGameOver();
    this.renderer.hidePause();

    this.state.setState('PLAYING');
    this.spawnNextPiece();

    this.isRunning = true;
    this.lastTime = performance.now();
    this.lastFallTime = 0;

    // Initialize input handler
    this.input.init();

    this.gameLoop(this.lastTime);
  }

  /**
   * Main game loop
   * @param {number} currentTime - Current timestamp from requestAnimationFrame
   */
  gameLoop(currentTime) {
    if (!this.isRunning) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  /**
   * Updates game logic
   * @param {number} deltaTime - Time since last update (ms)
   */
  update(deltaTime) {
    if (this.state.status !== 'PLAYING') return;

    // Update input handler (DAS/ARR timing)
    this.input.update();

    // Apply gravity
    this.lastFallTime += deltaTime;
    const fallInterval = this.state.getFallInterval();

    if (this.lastFallTime >= fallInterval) {
      this.moveActivePieceDown();
      this.lastFallTime = 0;
    }
  }

  /**
   * Moves the active piece down one row
   */
  moveActivePieceDown() {
    const moved = this.tryMovePiece(0, 1);
    if (!moved) {
      this.lockActivePiece();
    }
  }

  /**
   * Tries to move the active piece
   * @param {number} dx - Horizontal delta
   * @param {number} dy - Vertical delta
   * @returns {boolean} True if move was successful
   */
  tryMovePiece(dx, dy) {
    if (!this.activePiece) return false;

    const coords = getShapeCoords(this.activePiece);
    const newX = this.activePiece.x + dx;
    const newY = this.activePiece.y + dy;

    if (!this.board.checkCollision(coords, newX, newY)) {
      this.activePiece.x = newX;
      this.activePiece.y = newY;
      return true;
    }

    return false;
  }

  /**
   * Tries to rotate the active piece
   * @returns {boolean} True if rotation was successful
   */
  tryRotate() {
    if (!this.activePiece) return false;
    return rotate(this.activePiece, this.board);
  }

  /**
   * Locks the active piece into the board
   */
  async lockActivePiece() {
    if (!this.activePiece) return;

    const coords = getShapeCoords(this.activePiece);
    this.board.lockPiece(
      coords,
      this.activePiece.x,
      this.activePiece.y,
      this.activePiece.color,
    );

    const result = this.board.clearLines();
    if (result.linesCleared > 0) {
      // Show line clear animation
      await this.renderer.animateLineClear(result.lineData, result.linesCleared);
      this.state.addScore(result.linesCleared);
    }

    this.spawnNextPiece();
  }

  /**
   * Spawns the next piece from the queue
   */
  spawnNextPiece() {
    this.activePiece = this.pieceQueue.getNext();

    // Check if piece can spawn (game over if blocked)
    const coords = getShapeCoords(this.activePiece);
    if (
      this.board.checkCollision(
        coords,
        this.activePiece.x,
        this.activePiece.y,
      )
    ) {
      this.gameOver();
    }
  }

  /**
   * Handles game over
   */
  gameOver() {
    this.state.setState('GAME_OVER');
    this.isRunning = false;
    this.renderer.showGameOver(this.state.score);
  }

  /**
   * Handles input actions
   * @param {string} action - Action to perform
   */
  handleInput(action) {
    if (this.state.status !== 'PLAYING') {
      if (action === 'PAUSE' && this.state.status === 'PAUSED') {
        this.resume();
      }
      return;
    }

    switch (action) {
      case 'MOVE_LEFT':
        this.tryMovePiece(-1, 0);
        break;
      case 'MOVE_RIGHT':
        this.tryMovePiece(1, 0);
        break;
      case 'SOFT_DROP':
        if (this.tryMovePiece(0, 1)) {
          this.state.addScore(0, 'soft');
        }
        break;
      case 'HARD_DROP':
        this.hardDrop();
        break;
      case 'ROTATE':
        this.tryRotate();
        break;
      case 'PAUSE':
        this.pause();
        break;
      default:
        break;
    }
  }

  /**
   * Performs a hard drop (instant drop to bottom)
   */
  hardDrop() {
    let dropDistance = 0;
    while (this.tryMovePiece(0, 1)) {
      dropDistance += 1;
    }
    // Award points for hard drop (2 points per cell)
    this.state.addScore(0, 'hard', dropDistance);
    this.lockActivePiece();
  }

  /**
   * Pauses the game
   */
  pause() {
    this.state.setState('PAUSED');
    this.renderer.showPause();
  }

  /**
   * Resumes the game
   */
  resume() {
    this.state.setState('PLAYING');
    this.renderer.hidePause();
    this.lastTime = performance.now();
    this.lastFallTime = 0;
  }

  /**
   * Restarts the game
   */
  restart() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.start();
  }

  /**
   * Renders the current game state
   */
  render() {
    // Create collision checker for ghost piece
    const checkCollision = (x, y) => {
      const grid = this.board.getGrid();
      if (x < 0 || x >= 10 || y >= 20) return true;
      if (y < 0) return false;
      return grid[y][x] !== null;
    };

    this.renderer.drawBoard(this.board.getGrid(), this.activePiece, checkCollision);
    this.renderer.drawUI(this.state);
    this.renderer.drawNextPiece(this.pieceQueue.peek());
  }
}
