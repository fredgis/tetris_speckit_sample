/**
 * Contract Test: Tetromino Module API
 * Validates that Tetromino module exports the correct public interface
 */

import {
  SHAPES, createPiece, rotate, movePiece, getShapeCoords,
} from '../../js/tetromino';

describe('Tetromino Contract Tests', () => {
  describe('SHAPES constant', () => {
    test('exports SHAPES object with 7 tetromino types', () => {
      expect(SHAPES).toBeDefined();
      expect(Object.keys(SHAPES)).toHaveLength(7);
      expect(SHAPES).toHaveProperty('I');
      expect(SHAPES).toHaveProperty('O');
      expect(SHAPES).toHaveProperty('T');
      expect(SHAPES).toHaveProperty('S');
      expect(SHAPES).toHaveProperty('Z');
      expect(SHAPES).toHaveProperty('J');
      expect(SHAPES).toHaveProperty('L');
    });
  });

  describe('createPiece(type)', () => {
    test('function exists and accepts one parameter', () => {
      expect(typeof createPiece).toBe('function');
      expect(createPiece.length).toBe(1);
    });

    test('returns piece object with required properties', () => {
      const piece = createPiece('I');
      expect(piece).toHaveProperty('type');
      expect(piece).toHaveProperty('shape');
      expect(piece).toHaveProperty('rotation');
      expect(piece).toHaveProperty('x');
      expect(piece).toHaveProperty('y');
      expect(piece).toHaveProperty('color');
    });

    test('creates pieces for all 7 types', () => {
      const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      types.forEach((type) => {
        const piece = createPiece(type);
        expect(piece.type).toBe(type);
        expect(Array.isArray(piece.shape)).toBe(true);
      });
    });
  });

  describe('rotate(piece, board)', () => {
    test('function exists and accepts two parameters', () => {
      expect(typeof rotate).toBe('function');
      expect(rotate.length).toBe(2);
    });

    test('returns boolean indicating success', () => {
      const piece = createPiece('T');
      const mockBoard = { checkCollision: jest.fn(() => false) };
      const result = rotate(piece, mockBoard);
      expect(typeof result).toBe('boolean');
    });

    test('modifies piece rotation state on success', () => {
      const piece = createPiece('T');
      const mockBoard = { checkCollision: jest.fn(() => false) };
      const initialRotation = piece.rotation;
      rotate(piece, mockBoard);
      expect(piece.rotation).not.toBe(initialRotation);
    });
  });

  describe('movePiece(piece, dx, dy, board)', () => {
    test('function exists and accepts four parameters', () => {
      expect(typeof movePiece).toBe('function');
      expect(movePiece.length).toBe(4);
    });

    test('returns boolean indicating success', () => {
      const piece = createPiece('T');
      const mockBoard = { checkCollision: jest.fn(() => false) };
      const result = movePiece(piece, 1, 0, mockBoard);
      expect(typeof result).toBe('boolean');
    });

    test('modifies piece position on success', () => {
      const piece = createPiece('T');
      const mockBoard = { checkCollision: jest.fn(() => false) };
      const initialX = piece.x;
      movePiece(piece, 1, 0, mockBoard);
      expect(piece.x).toBe(initialX + 1);
    });
  });

  describe('getShapeCoords(piece)', () => {
    test('function exists and accepts one parameter', () => {
      expect(typeof getShapeCoords).toBe('function');
      expect(getShapeCoords.length).toBe(1);
    });

    test('returns array of coordinate pairs', () => {
      const piece = createPiece('I');
      const coords = getShapeCoords(piece);
      expect(Array.isArray(coords)).toBe(true);
      expect(coords.length).toBeGreaterThan(0);
      coords.forEach((coord) => {
        expect(Array.isArray(coord)).toBe(true);
        expect(coord).toHaveLength(2);
        expect(typeof coord[0]).toBe('number');
        expect(typeof coord[1]).toBe('number');
      });
    });
  });
});
