/**
 * Tetromino Module
 * Handles tetromino pieces, shapes, rotation, and movement
 */

export const SHAPES = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

const COLORS = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000',
};

/**
 * Creates a new tetromino piece
 * @param {string} type - The type of piece (I, O, T, S, Z, J, L)
 * @returns {Object} Piece object with type, shape, rotation, position, and color
 */
export function createPiece(type) {
  const shapes = SHAPES[type];
  return {
    type,
    shape: shapes,
    rotation: 0,
    x: 3, // Starting column (centered on 10-wide board)
    y: 0, // Starting row
    color: COLORS[type],
  };
}

/**
 * Rotates a piece clockwise if possible
 * @param {Object} piece - The piece to rotate
 * @param {Object} board - The game board for collision checking
 * @returns {boolean} True if rotation was successful, false otherwise
 */
export function rotate(piece, board) {
  const nextRotation = (piece.rotation + 1) % piece.shape.length;
  const originalRotation = piece.rotation;

  const mutablePiece = piece;
  mutablePiece.rotation = nextRotation;

  // Get shape coordinates for the new rotation
  const coords = getShapeCoords(mutablePiece);
  
  if (board.checkCollision && board.checkCollision(coords, mutablePiece.x, mutablePiece.y)) {
    // Rotation would cause collision, revert
    mutablePiece.rotation = originalRotation;
    return false;
  }

  return true;
}

/**
 * Moves a piece by the specified delta
 * @param {Object} piece - The piece to move
 * @param {number} dx - Horizontal movement delta
 * @param {number} dy - Vertical movement delta
 * @param {Object} board - The game board for collision checking
 * @returns {boolean} True if movement was successful, false otherwise
 */
export function movePiece(piece, dx, dy, board) {
  const originalX = piece.x;
  const originalY = piece.y;

  const mutablePiece = piece;
  mutablePiece.x += dx;
  mutablePiece.y += dy;

  // Get shape coordinates for the new position
  const coords = getShapeCoords(mutablePiece);

  if (board.checkCollision && board.checkCollision(coords, mutablePiece.x, mutablePiece.y)) {
    // Movement would cause collision, revert
    mutablePiece.x = originalX;
    mutablePiece.y = originalY;
    return false;
  }

  return true;
}

/**
 * Gets the relative coordinates of all blocks in the current piece
 * @param {Object} piece - The piece to get coordinates for
 * @returns {Array<Array<number>>} Array of [dx, dy] relative coordinate pairs
 */
export function getShapeCoords(piece) {
  const coords = [];
  const shape = piece.shape[piece.rotation];

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        coords.push([col, row]);
      }
    }
  }

  return coords;
}
