/**
 * Main Entry Point
 * Initializes the game and wires up UI
 */

import { GameEngine } from './game-engine.js';

// Game instance
let game = null;

/**
 * Initializes the game
 */
function initGame() {
  // Get canvas and UI elements
  const canvas = document.getElementById('game-board');
  const nextCanvas = document.getElementById('next-piece-canvas');
  const restartBtn = document.getElementById('restart-button');

  // Validate elements exist
  if (!canvas || !nextCanvas || !restartBtn) {
    // eslint-disable-next-line no-console
    console.error('Required DOM elements not found');
    return;
  }

  // Create game instance
  game = new GameEngine(canvas, nextCanvas);

  // Wire up restart button
  restartBtn.addEventListener('click', () => {
    game.restart();
    restartBtn.blur(); // Remove focus after click
  });

  // Start the game
  game.start();

  // eslint-disable-next-line no-console
  console.log('Tetris game initialized');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  // DOM already loaded
  initGame();
}
