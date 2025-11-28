/**
 * Game State Module
 * Manages game state including score, level, lines cleared, and game status
 */

// eslint-disable-next-line import/prefer-default-export
export class GameState {
  constructor() {
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.status = 'READY'; // READY, PLAYING, PAUSED, GAME_OVER
  }

  /**
   * Adds score based on lines cleared
   * @param {number} linesCleared - Number of lines cleared (0-4)
   * @param {string} dropType - Optional: 'soft' or 'hard' drop type
   */
  addScore(linesCleared, dropType = null) {
    // Base score for line clears (NES Tetris scoring)
    const lineScores = {
      0: 0,
      1: 40,
      2: 100,
      3: 300,
      4: 1200,
    };

    const baseScore = lineScores[linesCleared] || 0;
    const levelMultiplier = this.level;

    // Add line clear score
    this.score += baseScore * levelMultiplier;

    // Add bonus for drop type
    if (dropType === 'soft') {
      this.score += 1;
    } else if (dropType === 'hard') {
      this.score += 2;
    }

    // Update lines count
    if (linesCleared > 0) {
      this.lines += linesCleared;
      this.checkLevelUp();
    }
  }

  /**
   * Sets the game status
   * @param {string} status - New status (READY, PLAYING, PAUSED, GAME_OVER)
   */
  setState(status) {
    const validStatuses = ['READY', 'PLAYING', 'PAUSED', 'GAME_OVER'];
    if (validStatuses.includes(status)) {
      this.status = status;
    }
  }

  /**
   * Resets the game state to initial values
   */
  reset() {
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.status = 'READY';
  }

  /**
   * Gets the current score
   * @returns {number} Current score
   */
  getScore() {
    return this.score;
  }

  /**
   * Checks if the player should level up based on lines cleared
   * Levels up every 10 lines
   */
  checkLevelUp() {
    const newLevel = Math.floor(this.lines / 10) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
    }
  }

  /**
   * Gets the fall interval based on current level
   * Higher levels = faster fall speed
   * @returns {number} Fall interval in milliseconds
   */
  getFallInterval() {
    // Base interval: 1000ms (1 second)
    // Decreases by 50ms per level, minimum 100ms
    const baseInterval = 1000;
    const decreasePerLevel = 50;
    const minInterval = 100;

    const interval = baseInterval - (this.level - 1) * decreasePerLevel;
    return Math.max(interval, minInterval);
  }
}
