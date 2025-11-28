/**
 * Contract Test: State Module API
 * Validates that State module exports the correct public interface
 */

import { GameState } from '../../js/state';

describe('State Contract Tests', () => {
  let state;

  beforeEach(() => {
    state = new GameState();
  });

  describe('Constructor', () => {
    test('creates a GameState instance with initial properties', () => {
      expect(state).toBeInstanceOf(GameState);
      expect(state.score).toBe(0);
      expect(state.level).toBe(1);
      expect(state.lines).toBe(0);
      expect(state.status).toBeDefined();
    });
  });

  describe('addScore(linesCleared, dropType)', () => {
    test('method exists and accepts parameters', () => {
      expect(typeof state.addScore).toBe('function');
      // Optional dropType parameter, so length may be 1 or 2
      expect(state.addScore.length).toBeGreaterThanOrEqual(1);
    });

    test('increases score value', () => {
      const initialScore = state.score;
      state.addScore(1); // Single line clear
      expect(state.score).toBeGreaterThan(initialScore);
    });

    test('accepts linesCleared values 0-4', () => {
      [0, 1, 2, 3, 4].forEach((lines) => {
        state.reset();
        expect(() => state.addScore(lines)).not.toThrow();
      });
    });
  });

  describe('setState(status)', () => {
    test('method exists and accepts one parameter', () => {
      expect(typeof state.setState).toBe('function');
      expect(state.setState.length).toBe(1);
    });

    test('updates status property', () => {
      state.setState('PAUSED');
      expect(state.status).toBe('PAUSED');
    });
  });

  describe('reset()', () => {
    test('method exists with no parameters', () => {
      expect(typeof state.reset).toBe('function');
      expect(state.reset.length).toBe(0);
    });

    test('resets score, level, and lines to initial values', () => {
      // Modify state
      state.addScore(4);
      state.lines = 20;
      state.level = 5;

      // Reset
      state.reset();

      // Verify reset
      expect(state.score).toBe(0);
      expect(state.level).toBe(1);
      expect(state.lines).toBe(0);
    });
  });

  describe('getScore()', () => {
    test('method exists with no parameters', () => {
      expect(typeof state.getScore).toBe('function');
      expect(state.getScore.length).toBe(0);
    });

    test('returns current score value', () => {
      state.addScore(1);
      const score = state.getScore();
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('Additional required methods', () => {
    test('checkLevelUp method exists', () => {
      expect(typeof state.checkLevelUp).toBe('function');
    });

    test('getFallInterval method exists', () => {
      expect(typeof state.getFallInterval).toBe('function');
      const interval = state.getFallInterval();
      expect(typeof interval).toBe('number');
      expect(interval).toBeGreaterThan(0);
    });
  });
});
