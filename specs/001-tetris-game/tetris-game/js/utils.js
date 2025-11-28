/**
 * Utils Module
 * Shared constants and utility functions for Tetris game
 */

// Board dimensions
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// Cell size for rendering (30px per cell)
export const CELL_SIZE = 30;

// Tetromino colors
export const COLORS = {
  I: '#00f0f0', // Cyan
  O: '#f0f000', // Yellow
  T: '#a000f0', // Purple
  S: '#00f000', // Green
  Z: '#f00000', // Red
  J: '#0000f0', // Blue
  L: '#f0a000', // Orange
};

// Key bindings
export const KEY_BINDINGS = {
  MOVE_LEFT: 'ArrowLeft',
  MOVE_RIGHT: 'ArrowRight',
  SOFT_DROP: 'ArrowDown',
  HARD_DROP: ' ', // Space key
  ROTATE: 'ArrowUp',
  PAUSE: 'p',
};

// Game actions (internal representation)
export const ACTIONS = {
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
  SOFT_DROP: 'SOFT_DROP',
  HARD_DROP: 'HARD_DROP',
  ROTATE: 'ROTATE',
  PAUSE: 'PAUSE',
};

// Game states
export const GAME_STATES = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME_OVER',
};

// Timing constants
export const FRAME_TIME = 1000 / 60; // 60 FPS target (16.67ms)
export const INITIAL_FALL_INTERVAL = 1000; // 1 second at level 1
export const FALL_SPEED_MULTIPLIER = 50; // Decrease 50ms per level
export const MIN_FALL_INTERVAL = 100; // Minimum 100ms (level 19+)

// DAS/ARR timing (Delayed Auto Shift / Auto Repeat Rate)
export const DAS_DELAY = 170; // 170ms initial delay
export const ARR_INTERVAL = 50; // 50ms repeat rate

// Scoring constants
export const SCORE_VALUES = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1, // Per cell
  HARD_DROP: 2, // Per cell
};

// Level progression
export const LINES_PER_LEVEL = 10;

/**
 * Clamps a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generates a random integer between min (inclusive) and max (exclusive)
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random integer
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array (same reference)
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
