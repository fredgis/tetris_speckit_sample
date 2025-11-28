/**
 * Unit Tests: State Module
 * Tests game state management, scoring, and level progression
 */

import { GameState } from '../../js/state';

describe('State Unit Tests', () => {
  let state;

  beforeEach(() => {
    state = new GameState();
  });

  describe('Initialization', () => {
    test('starts with score 0, level 1, lines 0', () => {
      expect(state.score).toBe(0);
      expect(state.level).toBe(1);
      expect(state.lines).toBe(0);
    });

    test('starts with READY status', () => {
      expect(state.status).toBe('READY');
    });
  });

  describe('Score Calculation', () => {
    test('single line clear awards 40 points at level 1', () => {
      state.addScore(1);
      expect(state.score).toBe(40);
    });

    test('double line clear awards 100 points at level 1', () => {
      state.addScore(2);
      expect(state.score).toBe(100);
    });

    test('triple line clear awards 300 points at level 1', () => {
      state.addScore(3);
      expect(state.score).toBe(300);
    });

    test('tetris (4 lines) awards 1200 points at level 1', () => {
      state.addScore(4);
      expect(state.score).toBe(1200);
    });

    test('0 lines cleared awards 0 points', () => {
      state.addScore(0);
      expect(state.score).toBe(0);
    });

    test('score multiplied by level', () => {
      state.level = 5;
      state.addScore(1); // Single line
      expect(state.score).toBe(40 * 5); // 200 points
    });

    test('soft drop adds 1 point', () => {
      const initialScore = state.score;
      state.addScore(0, 'soft');
      expect(state.score).toBe(initialScore + 1);
    });

    test('hard drop adds 2 points', () => {
      const initialScore = state.score;
      state.addScore(0, 'hard');
      expect(state.score).toBe(initialScore + 2);
    });

    test('cumulative scoring works correctly', () => {
      state.addScore(1); // 40
      state.addScore(2); // 100
      state.addScore(3); // 300
      expect(state.score).toBe(440);
    });
  });

  describe('Lines Cleared Tracking', () => {
    test('tracks total lines cleared', () => {
      state.addScore(1);
      expect(state.lines).toBe(1);

      state.addScore(2);
      expect(state.lines).toBe(3);

      state.addScore(4);
      expect(state.lines).toBe(7);
    });

    test('lines not incremented when 0 lines cleared', () => {
      state.addScore(0);
      expect(state.lines).toBe(0);
    });
  });

  describe('Level Progression', () => {
    test('level increases after 10 lines', () => {
      state.addScore(4); // 4 lines
      expect(state.level).toBe(1);

      state.addScore(4); // 8 lines total
      expect(state.level).toBe(1);

      state.addScore(2); // 10 lines total
      expect(state.level).toBe(2);
    });

    test('level increases after 20 lines', () => {
      // Clear 20 lines
      for (let i = 0; i < 5; i++) {
        state.addScore(4);
      }
      expect(state.level).toBe(3); // 1 + floor(20/10)
    });

    test('level formula: 1 + floor(lines/10)', () => {
      state.addScore(4); // 4 lines -> level 1
      state.addScore(4); // 8 lines -> level 1
      state.addScore(4); // 12 lines -> level 2
      state.addScore(4); // 16 lines -> level 2
      state.addScore(4); // 20 lines -> level 3

      expect(state.level).toBe(3);
    });
  });

  describe('Fall Interval Calculation', () => {
    test('level 1 has 1000ms fall interval', () => {
      expect(state.getFallInterval()).toBe(1000);
    });

    test('level 5 has 800ms fall interval', () => {
      state.level = 5;
      expect(state.getFallInterval()).toBe(800);
    });

    test('level 10 has 550ms fall interval', () => {
      state.level = 10;
      expect(state.getFallInterval()).toBe(550);
    });

    test('level 19 reaches minimum 100ms', () => {
      state.level = 19;
      expect(state.getFallInterval()).toBe(100);
    });

    test('level 20+ stays at 100ms minimum', () => {
      state.level = 25;
      expect(state.getFallInterval()).toBe(100);
    });

    test('formula: max(100, 1000 - (level-1)*50)', () => {
      const testCases = [
        { level: 1, expected: 1000 },
        { level: 2, expected: 950 },
        { level: 3, expected: 900 },
        { level: 10, expected: 550 },
        { level: 19, expected: 100 },
        { level: 100, expected: 100 },
      ];

      testCases.forEach(({ level, expected }) => {
        state.level = level;
        expect(state.getFallInterval()).toBe(expected);
      });
    });
  });

  describe('State Transitions', () => {
    test('setState updates status', () => {
      state.setState('PLAYING');
      expect(state.status).toBe('PLAYING');

      state.setState('PAUSED');
      expect(state.status).toBe('PAUSED');

      state.setState('GAME_OVER');
      expect(state.status).toBe('GAME_OVER');
    });

    test('invalid status is ignored', () => {
      state.setState('PLAYING');
      state.setState('INVALID');
      expect(state.status).toBe('PLAYING');
    });
  });

  describe('Reset Functionality', () => {
    test('reset clears score, level, lines', () => {
      // Build up state
      state.addScore(4);
      state.addScore(4);
      state.addScore(4);
      state.setState('PLAYING');

      // Reset
      state.reset();

      // Verify reset
      expect(state.score).toBe(0);
      expect(state.level).toBe(1);
      expect(state.lines).toBe(0);
      expect(state.status).toBe('READY');
    });
  });

  describe('getScore()', () => {
    test('returns current score value', () => {
      state.addScore(1);
      expect(state.getScore()).toBe(40);

      state.addScore(2);
      expect(state.getScore()).toBe(140);
    });
  });
});
