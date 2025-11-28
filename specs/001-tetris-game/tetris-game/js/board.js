/**
 * Board Module
 * Manages the game board grid, collision detection, and line clearing
 */

import { BOARD_WIDTH, BOARD_HEIGHT } from './utils.js';

// eslint-disable-next-line import/prefer-default-export
export class Board {
  constructor() {
    this.width = BOARD_WIDTH;
    this.height = BOARD_HEIGHT;
    this.grid = this.createEmptyGrid();
  }

  /**
   * Creates an empty grid filled with null values
   * @returns {Array<Array<string|null>>} 2D grid array
   */
  createEmptyGrid() {
    const createRow = () => Array.from({ length: this.width }, () => null);
    return Array.from({ length: this.height }, createRow);
  }

  /**
   * Checks if a shape at the given position collides with boundaries or locked pieces
   * @param {Array<Array<number>>} shape - Array of [x, y] relative coordinates
   * @param {number} x - X position of piece origin
   * @param {number} y - Y position of piece origin
   * @returns {boolean} True if collision detected, false otherwise
   */
  checkCollision(shape, x, y) {
    for (let i = 0; i < shape.length; i++) {
      const [dx, dy] = shape[i];
      const newX = x + dx;
      const newY = y + dy;

      // Check boundaries
      if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) {
        return true;
      }

      // Check collision with locked pieces
      if (this.grid[newY][newX] !== null) {
        return true;
      }
    }

    return false;
  }

  /**
   * Locks a piece into the grid at the specified position
   * @param {Array<Array<number>>} shape - Array of [x, y] relative coordinates
   * @param {number} x - X position of piece origin
   * @param {number} y - Y position of piece origin
   * @param {string} color - Color to use for the locked cells
   */
  lockPiece(shape, x, y, color) {
    shape.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
        this.grid[newY][newX] = color;
      }
    });
  }

  /**
   * Clears all complete lines and shifts rows down
   * @returns {Object} Object with linesCleared count and lineData array
   */
  clearLines() {
    let linesCleared = 0;
    const lineData = [];

    // Check from bottom to top to find complete lines
    for (let y = this.height - 1; y >= 0; y--) {
      const isComplete = this.grid[y].every((cell) => cell !== null);
      if (isComplete) {
        // Store line data before removing
        lineData.push({
          y,
          cells: [...this.grid[y]],
        });
      }
    }

    // Remove complete lines
    lineData.forEach(() => {
      // Find and remove the first complete line
      for (let y = this.height - 1; y >= 0; y--) {
        if (this.grid[y].every((cell) => cell !== null)) {
          this.grid.splice(y, 1);
          this.grid.unshift(Array.from({ length: this.width }, () => null));
          linesCleared += 1;
          break;
        }
      }
    });

    return { linesCleared, lineData };
  }

  /**
   * Resets the board to empty state
   */
  reset() {
    this.grid = this.createEmptyGrid();
  }

  /**
   * Gets the current grid state
   * @returns {Array<Array<string|null>>} Current grid
   */
  getGrid() {
    return this.grid;
  }
}
