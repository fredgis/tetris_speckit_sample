/**
 * Unit Tests: Board Module
 * Tests grid initialization, collision detection, piece locking, and line clearing
 */

import { Board } from '../../js/board';

describe('Board Unit Tests', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  describe('Grid Initialization', () => {
    test('creates 10x20 grid', () => {
      expect(board.width).toBe(10);
      expect(board.height).toBe(20);
    });

    test('initializes all cells to null', () => {
      const grid = board.getGrid();
      grid.forEach((row) => {
        row.forEach((cell) => {
          expect(cell).toBeNull();
        });
      });
    });

    test('grid is accessible via getGrid()', () => {
      const grid = board.getGrid();
      expect(grid).toHaveLength(20);
      expect(grid[0]).toHaveLength(10);
    });
  });

  describe('Collision Detection - Boundaries', () => {
    test('detects left boundary collision', () => {
      const shape = [[0, 0]]; // Single cell at origin
      expect(board.checkCollision(shape, -1, 0)).toBe(true);
    });

    test('detects right boundary collision', () => {
      const shape = [[0, 0]];
      expect(board.checkCollision(shape, 10, 0)).toBe(true);
    });

    test('detects bottom boundary collision', () => {
      const shape = [[0, 0]];
      expect(board.checkCollision(shape, 0, 20)).toBe(true);
    });

    test('detects top boundary collision (negative y)', () => {
      const shape = [[0, 0]];
      expect(board.checkCollision(shape, 0, -1)).toBe(true);
    });

    test('allows valid positions within bounds', () => {
      const shape = [[0, 0]];
      expect(board.checkCollision(shape, 0, 0)).toBe(false);
      expect(board.checkCollision(shape, 5, 10)).toBe(false);
      expect(board.checkCollision(shape, 9, 19)).toBe(false);
    });
  });

  describe('Collision Detection - Locked Pieces', () => {
    test('detects collision with locked piece', () => {
      // Lock a piece at (0, 0)
      board.lockPiece([[0, 0]], 0, 0, '#ff0000');

      // Check collision at same position
      const shape = [[0, 0]];
      expect(board.checkCollision(shape, 0, 0)).toBe(true);
    });

    test('allows placement next to locked piece', () => {
      board.lockPiece([[0, 0]], 0, 0, '#ff0000');

      // Adjacent positions should be valid
      const shape = [[0, 0]];
      expect(board.checkCollision(shape, 1, 0)).toBe(false);
      expect(board.checkCollision(shape, 0, 1)).toBe(false);
    });

    test('handles multi-cell shape collisions', () => {
      board.lockPiece([[0, 0]], 2, 2, '#ff0000');

      const shape = [
        [0, 0],
        [1, 0],
      ]; // Horizontal 2-cell
      expect(board.checkCollision(shape, 2, 2)).toBe(true); // Overlaps locked
      expect(board.checkCollision(shape, 3, 2)).toBe(false); // Clear
    });
  });

  describe('Lock Piece', () => {
    test('adds single cell to grid', () => {
      board.lockPiece([[0, 0]], 5, 10, '#00ff00');
      const grid = board.getGrid();
      expect(grid[10][5]).toBe('#00ff00');
    });

    test('adds multi-cell piece to grid', () => {
      const shape = [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]; // 2x2 O-piece
      board.lockPiece(shape, 0, 0, '#ffff00');

      const grid = board.getGrid();
      expect(grid[0][0]).toBe('#ffff00');
      expect(grid[0][1]).toBe('#ffff00');
      expect(grid[1][0]).toBe('#ffff00');
      expect(grid[1][1]).toBe('#ffff00');
    });

    test('preserves existing locked pieces', () => {
      board.lockPiece([[0, 0]], 0, 0, '#ff0000');
      board.lockPiece([[0, 0]], 1, 1, '#00ff00');

      const grid = board.getGrid();
      expect(grid[0][0]).toBe('#ff0000');
      expect(grid[1][1]).toBe('#00ff00');
    });
  });

  describe('Clear Lines - Single Line', () => {
    test('clears a complete line', () => {
      // Fill bottom row
      for (let x = 0; x < 10; x++) {
        board.lockPiece([[0, 0]], x, 19, '#ff0000');
      }

      const cleared = board.clearLines();
      expect(cleared).toBe(1);

      const grid = board.getGrid();
      expect(grid[19].every((cell) => cell === null)).toBe(true);
    });

    test('returns 0 when no lines are complete', () => {
      // Fill 9 cells (not complete)
      for (let x = 0; x < 9; x++) {
        board.lockPiece([[0, 0]], x, 19, '#ff0000');
      }

      const cleared = board.clearLines();
      expect(cleared).toBe(0);
    });

    test('shifts rows down after clearing', () => {
      // Fill bottom row
      for (let x = 0; x < 10; x++) {
        board.lockPiece([[0, 0]], x, 19, '#ff0000');
      }

      // Add marker piece in row above
      board.lockPiece([[0, 0]], 0, 18, '#00ff00');

      board.clearLines();

      const grid = board.getGrid();
      expect(grid[19][0]).toBe('#00ff00'); // Shifted down
      expect(grid[18][0]).toBeNull(); // Empty above
    });
  });

  describe('Clear Lines - Multiple Lines', () => {
    test('clears 2 lines simultaneously', () => {
      // Fill rows 18 and 19
      for (let x = 0; x < 10; x++) {
        board.lockPiece([[0, 0]], x, 18, '#ff0000');
        board.lockPiece([[0, 0]], x, 19, '#00ff00');
      }

      const cleared = board.clearLines();
      expect(cleared).toBe(2);
    });

    test('clears 3 lines simultaneously', () => {
      for (let x = 0; x < 10; x++) {
        board.lockPiece([[0, 0]], x, 17, '#ff0000');
        board.lockPiece([[0, 0]], x, 18, '#00ff00');
        board.lockPiece([[0, 0]], x, 19, '#0000ff');
      }

      const cleared = board.clearLines();
      expect(cleared).toBe(3);
    });

    test('clears 4 lines simultaneously (Tetris)', () => {
      for (let x = 0; x < 10; x++) {
        board.lockPiece([[0, 0]], x, 16, '#ff0000');
        board.lockPiece([[0, 0]], x, 17, '#00ff00');
        board.lockPiece([[0, 0]], x, 18, '#0000ff');
        board.lockPiece([[0, 0]], x, 19, '#ffff00');
      }

      const cleared = board.clearLines();
      expect(cleared).toBe(4);
    });
  });

  describe('Clear Lines - No Complete Lines', () => {
    test('does not modify grid when no lines complete', () => {
      // Fill partial row
      for (let x = 0; x < 5; x++) {
        board.lockPiece([[0, 0]], x, 19, '#ff0000');
      }

      const gridBefore = JSON.stringify(board.getGrid());
      board.clearLines();
      const gridAfter = JSON.stringify(board.getGrid());

      expect(gridBefore).toBe(gridAfter);
    });
  });

  describe('Reset', () => {
    test('clears all locked pieces', () => {
      // Lock several pieces
      board.lockPiece([[0, 0]], 0, 0, '#ff0000');
      board.lockPiece([[0, 0]], 5, 10, '#00ff00');
      board.lockPiece([[0, 0]], 9, 19, '#0000ff');

      board.reset();

      const grid = board.getGrid();
      grid.forEach((row) => {
        row.forEach((cell) => {
          expect(cell).toBeNull();
        });
      });
    });

    test('maintains grid dimensions after reset', () => {
      board.reset();
      expect(board.width).toBe(10);
      expect(board.height).toBe(20);
      expect(board.getGrid()).toHaveLength(20);
      expect(board.getGrid()[0]).toHaveLength(10);
    });
  });
});
