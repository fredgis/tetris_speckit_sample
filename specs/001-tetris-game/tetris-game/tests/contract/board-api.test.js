/**
 * Contract Test: Board Module API
 * Validates that Board module exports the correct public interface
 */

import { Board } from '../../js/board';

describe('Board Contract Tests', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  describe('Constructor', () => {
    test('creates a Board instance with width and height properties', () => {
      expect(board).toBeInstanceOf(Board);
      expect(board.width).toBe(10);
      expect(board.height).toBe(20);
    });

    test('initializes empty grid', () => {
      const grid = board.getGrid();
      expect(grid).toHaveLength(20); // 20 rows
      expect(grid[0]).toHaveLength(10); // 10 columns
    });
  });

  describe('checkCollision(shape, x, y)', () => {
    test('method exists and accepts three parameters', () => {
      expect(typeof board.checkCollision).toBe('function');
      expect(board.checkCollision.length).toBe(3);
    });

    test('returns boolean value', () => {
      const shape = [
        [0, 0],
        [0, 1],
      ];
      const result = board.checkCollision(shape, 0, 0);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('lockPiece(shape, x, y, color)', () => {
    test('method exists and accepts four parameters', () => {
      expect(typeof board.lockPiece).toBe('function');
      expect(board.lockPiece.length).toBe(4);
    });

    test('modifies board grid state', () => {
      const shape = [[0, 0]];
      board.lockPiece(shape, 0, 0, '#ff0000');
      const grid = board.getGrid();
      expect(grid[0][0]).toBe('#ff0000');
    });
  });

  describe('clearLines()', () => {
    test('method exists with no required parameters', () => {
      expect(typeof board.clearLines).toBe('function');
      expect(board.clearLines.length).toBe(0);
    });

    test('returns number of lines cleared', () => {
      const result = board.clearLines();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('reset()', () => {
    test('method exists', () => {
      expect(typeof board.reset).toBe('function');
    });

    test('clears all locked pieces', () => {
      // Lock a piece
      board.lockPiece([[0, 0]], 0, 0, '#ff0000');
      expect(board.getGrid()[0][0]).toBe('#ff0000');

      // Reset
      board.reset();
      const grid = board.getGrid();

      // Verify all cells are empty
      grid.forEach((row) => {
        row.forEach((cell) => {
          expect(cell).toBeNull();
        });
      });
    });
  });

  describe('getGrid()', () => {
    test('method exists with no parameters', () => {
      expect(typeof board.getGrid).toBe('function');
      expect(board.getGrid.length).toBe(0);
    });

    test('returns 2D array matching board dimensions', () => {
      const grid = board.getGrid();
      expect(Array.isArray(grid)).toBe(true);
      expect(grid).toHaveLength(20);
      grid.forEach((row) => {
        expect(Array.isArray(row)).toBe(true);
        expect(row).toHaveLength(10);
      });
    });
  });
});
