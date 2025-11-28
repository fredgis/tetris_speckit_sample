/**
 * Piece Queue Module
 * Manages piece generation using bag randomization algorithm
 */

import { createPiece } from './tetromino.js';

// eslint-disable-next-line import/prefer-default-export
export class PieceQueue {
  constructor() {
    this.bag = [];
    this.nextPiece = null;
    this.fillBag();
    this.prepareNext();
  }

  /**
   * Fisher-Yates shuffle algorithm
   * @param {Array} array - Array to shuffle in-place
   * @returns {Array} Shuffled array
   */
  shuffle(array) {
    const arr = array;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Fills the bag with all 7 piece types and shuffles
   */
  fillBag() {
    const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    this.bag = this.shuffle([...types]);
  }

  /**
   * Prepares the next piece for preview
   */
  prepareNext() {
    if (this.bag.length === 0) {
      this.fillBag();
    }
    const type = this.bag[0];
    this.nextPiece = createPiece(type);
  }

  /**
   * Gets the next piece from the queue
   * @returns {Object} Piece object
   */
  getNext() {
    if (this.bag.length === 0) {
      this.fillBag();
    }

    // Remove piece from bag
    this.bag.shift();

    // Get the current next piece
    const piece = this.nextPiece;

    // Prepare the next one
    this.prepareNext();

    return piece;
  }

  /**
   * Peeks at the next piece without removing it from queue
   * @returns {Object} Next piece object (for preview)
   */
  peek() {
    return this.nextPiece;
  }

  /**
   * Resets the queue with a new shuffled bag
   */
  reset() {
    this.bag = [];
    this.fillBag();
    this.prepareNext();
  }
}
