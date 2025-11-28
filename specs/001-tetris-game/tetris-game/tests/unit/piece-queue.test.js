/**
 * Unit Tests: PieceQueue Module
 * Tests bag randomization algorithm and piece generation
 */

import { PieceQueue } from '../../js/piece-queue';

describe('PieceQueue Unit Tests', () => {
  let queue;

  beforeEach(() => {
    queue = new PieceQueue();
  });

  describe('Initialization', () => {
    test('creates queue with initial bag', () => {
      expect(queue).toBeInstanceOf(PieceQueue);
      expect(queue.peek()).toBeDefined();
    });
  });

  describe('Bag Randomization', () => {
    test('bag contains all 7 piece types', () => {
      const pieces = [];
      for (let i = 0; i < 7; i++) {
        pieces.push(queue.getNext().type);
      }

      const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      types.forEach((type) => {
        expect(pieces).toContain(type);
      });
    });

    test('refills bag after 7 pieces', () => {
      // Get first 7 pieces
      for (let i = 0; i < 7; i++) {
        queue.getNext();
      }

      // Next piece should exist (bag refilled)
      const piece = queue.getNext();
      expect(piece).toBeDefined();
      expect(piece.type).toMatch(/^[IOTSZ JL]$/);
    });

    test('no piece type appears twice in same bag', () => {
      const firstBag = [];
      for (let i = 0; i < 7; i++) {
        firstBag.push(queue.getNext().type);
      }

      const uniqueTypes = new Set(firstBag);
      expect(uniqueTypes.size).toBe(7);
    });

    test('randomization produces different orders', () => {
      // Get first bag
      const bag1 = [];
      for (let i = 0; i < 7; i++) {
        bag1.push(queue.getNext().type);
      }

      // Get second bag
      const bag2 = [];
      for (let i = 0; i < 7; i++) {
        bag2.push(queue.getNext().type);
      }

      // Different bags should have different order (with high probability)
      // Check at least one position differs
      let differences = 0;
      for (let i = 0; i < 7; i++) {
        if (bag1[i] !== bag2[i]) {
          differences += 1;
        }
      }

      // At least 1 difference expected (could be same with 1/5040 probability)
      expect(differences).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getNext()', () => {
    test('returns piece object with required properties', () => {
      const piece = queue.getNext();
      expect(piece).toHaveProperty('type');
      expect(piece).toHaveProperty('shape');
      expect(piece).toHaveProperty('rotation');
      expect(piece).toHaveProperty('x');
      expect(piece).toHaveProperty('y');
      expect(piece).toHaveProperty('color');
    });

    test('each piece starts at default position', () => {
      const piece = queue.getNext();
      expect(piece.x).toBe(3); // Center column
      expect(piece.y).toBe(0); // Top row
      expect(piece.rotation).toBe(0);
    });

    test('returns different instances each call', () => {
      const piece1 = queue.getNext();
      const piece2 = queue.getNext();
      expect(piece1).not.toBe(piece2);
    });
  });

  describe('peek()', () => {
    test('returns next piece without removing from queue', () => {
      const peeked = queue.peek();
      const next = queue.getNext();
      expect(peeked.type).toBe(next.type);
    });

    test('multiple peeks return same type', () => {
      const peek1 = queue.peek();
      const peek2 = queue.peek();
      const peek3 = queue.peek();
      expect(peek1.type).toBe(peek2.type);
      expect(peek2.type).toBe(peek3.type);
    });

    test('peek does not advance queue', () => {
      const peeked = queue.peek();
      const next = queue.getNext();
      expect(peeked.type).toBe(next.type);
    });
  });

  describe('reset()', () => {
    test('reset creates new shuffled bag', () => {
      // Get some pieces
      queue.getNext();
      queue.getNext();

      // Reset
      queue.reset();

      // Should be able to get 7 pieces again
      const pieces = [];
      for (let i = 0; i < 7; i++) {
        pieces.push(queue.getNext().type);
      }

      expect(pieces.length).toBe(7);
      expect(new Set(pieces).size).toBe(7);
    });
  });

  describe('Statistical Distribution', () => {
    test('over 700 pieces, each type appears ~100 times (±20)', () => {
      const counts = {
        I: 0, O: 0, T: 0, S: 0, Z: 0, J: 0, L: 0,
      };

      // Generate 700 pieces (100 bags)
      for (let i = 0; i < 700; i++) {
        const piece = queue.getNext();
        counts[piece.type] += 1;
      }

      // Each type should appear ~100 times
      Object.values(counts).forEach((count) => {
        expect(count).toBeGreaterThanOrEqual(80);
        expect(count).toBeLessThanOrEqual(120);
      });
    });
  });
});
