/**
 * Input Handler Module
 * Manages keyboard input and key repeat timing (DAS/ARR)
 */

// eslint-disable-next-line import/prefer-default-export
export class InputHandler {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.keys = new Set();
    this.lastActionTime = {};

    // Timing constants (milliseconds)
    this.DAS = 170; // Delayed Auto Shift
    this.ARR = 50; // Auto Repeat Rate

    // Key mappings
    this.keyMap = {
      ArrowLeft: 'MOVE_LEFT',
      ArrowRight: 'MOVE_RIGHT',
      ArrowDown: 'SOFT_DROP',
      ArrowUp: 'ROTATE',
      ' ': 'HARD_DROP',
      p: 'PAUSE',
      P: 'PAUSE',
    };

    // Bind event handlers
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  /**
   * Initializes event listeners
   */
  init() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  /**
   * Handles keydown events
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyDown(event) {
    const { key } = event;
    const action = this.keyMap[key];

    if (!action) return;

    event.preventDefault();

    // First press (not held)
    if (!this.keys.has(key)) {
      this.keys.add(key);
      this.lastActionTime[key] = Date.now();
      this.executeAction(action);
    }
  }

  /**
   * Handles keyup events
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyUp(event) {
    this.keys.delete(event.key);
    delete this.lastActionTime[event.key];
  }

  /**
   * Updates key repeat logic (call from game loop)
   */
  update() {
    const now = Date.now();

    // Only repeat for horizontal movement and soft drop
    const repeatableActions = ['MOVE_LEFT', 'MOVE_RIGHT', 'SOFT_DROP'];

    this.keys.forEach((key) => {
      const action = this.keyMap[key];
      if (!repeatableActions.includes(action)) return;

      const timeSinceLastAction = now - this.lastActionTime[key];

      // Check if DAS delay has passed
      if (timeSinceLastAction >= this.DAS) {
        // Check if ARR interval has passed
        const timeSinceDAS = timeSinceLastAction - this.DAS;
        const repeatCount = Math.floor(timeSinceDAS / this.ARR);
        const expectedActionTime = this.lastActionTime[key] + this.DAS + repeatCount * this.ARR;

        if (now >= expectedActionTime + this.ARR) {
          this.executeAction(action);
          this.lastActionTime[key] = expectedActionTime + this.ARR;
        }
      }
    });
  }

  /**
   * Executes a game action
   * @param {string} action - Action to execute
   */
  executeAction(action) {
    this.gameEngine.handleInput(action);
  }

  /**
   * Destroys event listeners
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
