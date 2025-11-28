# Tetromino Module Contract

**Version**: 1.0.0  
**Module**: `js/tetromino.js`  
**Purpose**: Define Tetrimino shapes, rotation logic, and Super Rotation System (SRS) implementation

---

## Public API

### Shape Definitions

```javascript
/**
 * Tetromino shape types and their grid representations
 * @constant {Object.<string, Array<Array<number>>>}
 */
const SHAPES = {
  I: [[0, -1], [0, 0], [0, 1], [0, 2]],    // Cyan - straight line
  O: [[0, 0], [0, 1], [1, 0], [1, 1]],     // Yellow - square
  T: [[0, 0], [-1, 0], [1, 0], [0, -1]],   // Purple - T-shape
  S: [[0, 0], [-1, 0], [0, -1], [1, -1]],  // Green - S-shape
  Z: [[0, 0], [1, 0], [0, -1], [-1, -1]],  // Red - Z-shape
  J: [[0, 0], [0, -1], [0, 1], [-1, 1]],   // Blue - J-shape
  L: [[0, 0], [0, -1], [0, 1], [1, 1]]     // Orange - L-shape
};

/**
 * Color mapping for each Tetromino type
 * @constant {Object.<string, string>}
 */
const COLORS = {
  I: '#00FFFF', // Cyan
  O: '#FFFF00', // Yellow
  T: '#800080', // Purple
  S: '#00FF00', // Green
  Z: '#FF0000', // Red
  J: '#0000FF', // Blue
  L: '#FF7F00'  // Orange
};
```

---

### 1. createPiece(type)

**Description**: Factory function to create a new Tetromino object.

**Parameters**:
- `type` (string): One of ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

**Returns**: `{Object}` Tetromino object

```javascript
{
  type: string,         // Piece type
  shape: Array<[number, number]>,  // Current shape coordinates
  rotation: number,     // Current rotation state (0-3)
  x: number,            // Grid X position
  y: number,            // Grid Y position
  color: string         // Hex color code
}
```

**Preconditions**:
- `type` must be one of the 7 valid types

**Postconditions**:
- Returns Tetromino with rotation = 0, x = 0, y = 0
- Shape coordinates are relative to piece center
- Color matches type

**Algorithm**:
```javascript
function createPiece(type) {
  if (!SHAPES[type]) {
    throw new Error(`Invalid Tetromino type: ${type}`);
  }
  
  return {
    type,
    shape: [...SHAPES[type]], // Clone shape array
    rotation: 0,
    x: 0,
    y: 0,
    color: COLORS[type]
  };
}
```

**Example**:
```javascript
const iPiece = createPiece('I');
// { type: 'I', shape: [[0,-1],[0,0],[0,1],[0,2]], rotation: 0, x: 0, y: 0, color: '#00FFFF' }
```

---

### 2. rotate(piece, board)

**Description**: Attempt to rotate piece 90° clockwise using Super Rotation System (SRS) with wall-kicks.

**Parameters**:
- `piece` (Object): Tetromino object
- `board` (Board): Board instance for collision checking

**Returns**: `{boolean}` - True if rotation succeeded, false otherwise

**Preconditions**:
- `piece` has valid shape and rotation state
- `board` has `checkCollision(shape, x, y)` method

**Postconditions**:
- If successful: `piece.shape`, `piece.x`, `piece.y`, `piece.rotation` updated
- If failed: `piece` unchanged
- Rotation state wraps (3 → 0)

**Algorithm**:
```javascript
function rotate(piece, board) {
  // O-piece doesn't rotate
  if (piece.type === 'O') return true;
  
  const currentRotation = piece.rotation;
  const newRotation = (currentRotation + 1) % 4;
  
  // Rotate shape coordinates
  const newShape = piece.shape.map(([x, y]) => [-y, x]);
  
  // Get wall-kick offsets for this transition
  const kickTable = (piece.type === 'I') ? WALL_KICKS_I : WALL_KICKS_JLSTZ;
  const kickKey = `${currentRotation}->${newRotation}`;
  const kicks = kickTable[kickKey];
  
  // Try each kick offset
  for (const [offsetX, offsetY] of kicks) {
    const testX = piece.x + offsetX;
    const testY = piece.y + offsetY;
    
    if (!board.checkCollision(newShape, testX, testY)) {
      // Success!
      piece.shape = newShape;
      piece.x = testX;
      piece.y = testY;
      piece.rotation = newRotation;
      return true;
    }
  }
  
  // All kicks failed
  return false;
}
```

**Wall-Kick Tables**:
```javascript
// SRS wall-kick data for J, L, S, T, Z pieces
const WALL_KICKS_JLSTZ = {
  '0->1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '1->2': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '2->3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  '3->0': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
};

// SRS wall-kick data for I piece (different!)
const WALL_KICKS_I = {
  '0->1': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  '1->2': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  '2->3': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  '3->0': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]]
};
```

**Example**:
```javascript
const tPiece = createPiece('T');
tPiece.x = 5;
tPiece.y = 10;

const rotated = rotate(tPiece, board);
if (rotated) {
  console.log('Rotation successful');
  console.log(tPiece.rotation); // 1
}
```

---

### 3. movePiece(piece, dx, dy, board)

**Description**: Attempt to move piece by offset (dx, dy).

**Parameters**:
- `piece` (Object): Tetromino object
- `dx` (number): Horizontal offset
- `dy` (number): Vertical offset
- `board` (Board): Board instance for collision checking

**Returns**: `{boolean}` - True if move succeeded, false otherwise

**Preconditions**:
- `piece` has valid position and shape
- `board` has `checkCollision(shape, x, y)` method

**Postconditions**:
- If successful: `piece.x` and `piece.y` updated
- If failed: `piece` position unchanged

**Algorithm**:
```javascript
function movePiece(piece, dx, dy, board) {
  const newX = piece.x + dx;
  const newY = piece.y + dy;
  
  if (!board.checkCollision(piece.shape, newX, newY)) {
    piece.x = newX;
    piece.y = newY;
    return true;
  }
  
  return false;
}
```

**Example**:
```javascript
const moved = movePiece(piece, -1, 0, board); // Try to move left
if (moved) {
  console.log('Moved to', piece.x, piece.y);
}
```

---

### 4. getShapeCoords(piece)

**Description**: Get absolute grid coordinates for all cells of the piece.

**Parameters**:
- `piece` (Object): Tetromino object

**Returns**: `{Array<[number, number]>}` - Array of [x, y] coordinates

**Preconditions**:
- `piece` has valid shape and position

**Postconditions**:
- Returns array of 4 coordinate pairs
- Coordinates are absolute grid positions

**Algorithm**:
```javascript
function getShapeCoords(piece) {
  return piece.shape.map(([dx, dy]) => [
    piece.x + dx,
    piece.y + dy
  ]);
}
```

**Example**:
```javascript
const iPiece = createPiece('I');
iPiece.x = 5;
iPiece.y = 3;

const coords = getShapeCoords(iPiece);
// [[5, 2], [5, 3], [5, 4], [5, 5]]
```

---

### 5. resetPiece(piece)

**Description**: Reset piece to initial state (rotation 0, position 0,0).

**Parameters**:
- `piece` (Object): Tetromino object

**Returns**: `{void}`

**Preconditions**:
- `piece` has valid type

**Postconditions**:
- `piece.rotation` = 0
- `piece.x` = 0
- `piece.y` = 0
- `piece.shape` reset to initial rotation

**Algorithm**:
```javascript
function resetPiece(piece) {
  piece.rotation = 0;
  piece.x = 0;
  piece.y = 0;
  piece.shape = [...SHAPES[piece.type]];
}
```

---

## Testing Requirements

### Unit Tests

**UT-TETRO-001**: Verify all 7 shapes have correct coordinates
```javascript
test('I-piece shape has 4 cells in vertical line', () => {
  const piece = createPiece('I');
  expect(piece.shape).toEqual([[0, -1], [0, 0], [0, 1], [0, 2]]);
});
```

**UT-TETRO-002**: Verify all colors are unique
```javascript
test('Each Tetromino type has unique color', () => {
  const colors = Object.values(COLORS);
  const uniqueColors = new Set(colors);
  expect(uniqueColors.size).toBe(7);
});
```

**UT-TETRO-003**: createPiece() throws on invalid type
```javascript
test('createPiece throws error for invalid type', () => {
  expect(() => createPiece('X')).toThrow('Invalid Tetromino type');
});
```

**UT-TETRO-004**: Rotation transforms coordinates correctly
```javascript
test('T-piece rotates 90° clockwise', () => {
  const piece = createPiece('T');
  const mockBoard = { checkCollision: () => false };
  
  rotate(piece, mockBoard);
  
  expect(piece.rotation).toBe(1);
  expect(piece.shape).toEqual([[0, 0], [0, 1], [0, -1], [1, 0]]);
});
```

**UT-TETRO-005**: O-piece rotation returns true without changes
```javascript
test('O-piece rotation always succeeds without changing shape', () => {
  const piece = createPiece('O');
  const originalShape = [...piece.shape];
  const mockBoard = { checkCollision: () => false };
  
  const result = rotate(piece, mockBoard);
  
  expect(result).toBe(true);
  expect(piece.shape).toEqual(originalShape);
});
```

**UT-TETRO-006**: Rotation wraps from 3 to 0
```javascript
test('Rotation state wraps from 3 to 0', () => {
  const piece = createPiece('J');
  piece.rotation = 3;
  const mockBoard = { checkCollision: () => false };
  
  rotate(piece, mockBoard);
  
  expect(piece.rotation).toBe(0);
});
```

**UT-TETRO-007**: Wall-kick attempts correct offsets
```javascript
test('Rotation tries all 5 wall-kick offsets', () => {
  const piece = createPiece('T');
  const collisionCalls = [];
  const mockBoard = {
    checkCollision: (shape, x, y) => {
      collisionCalls.push([x, y]);
      return true; // Block all attempts
    }
  };
  
  rotate(piece, mockBoard);
  
  expect(collisionCalls.length).toBe(5);
  expect(collisionCalls[0]).toEqual([0, 0]); // First offset: [0, 0]
});
```

**UT-TETRO-008**: movePiece() succeeds when no collision
```javascript
test('movePiece updates position when no collision', () => {
  const piece = createPiece('T');
  const mockBoard = { checkCollision: () => false };
  
  const result = movePiece(piece, 3, 5, mockBoard);
  
  expect(result).toBe(true);
  expect(piece.x).toBe(3);
  expect(piece.y).toBe(5);
});
```

**UT-TETRO-009**: movePiece() fails when collision detected
```javascript
test('movePiece preserves position when collision detected', () => {
  const piece = createPiece('T');
  piece.x = 5;
  piece.y = 10;
  const mockBoard = { checkCollision: () => true };
  
  const result = movePiece(piece, 1, 0, mockBoard);
  
  expect(result).toBe(false);
  expect(piece.x).toBe(5); // Unchanged
  expect(piece.y).toBe(10);
});
```

**UT-TETRO-010**: getShapeCoords() returns absolute positions
```javascript
test('getShapeCoords returns absolute grid coordinates', () => {
  const piece = createPiece('O');
  piece.x = 3;
  piece.y = 7;
  
  const coords = getShapeCoords(piece);
  
  expect(coords).toEqual([
    [3, 7], [3, 8], [4, 7], [4, 8]
  ]);
});
```

**UT-TETRO-011**: resetPiece() restores initial state
```javascript
test('resetPiece restores rotation and position', () => {
  const piece = createPiece('L');
  const mockBoard = { checkCollision: () => false };
  
  // Modify piece
  movePiece(piece, 5, 10, mockBoard);
  rotate(piece, mockBoard);
  
  // Reset
  resetPiece(piece);
  
  expect(piece.x).toBe(0);
  expect(piece.y).toBe(0);
  expect(piece.rotation).toBe(0);
  expect(piece.shape).toEqual(SHAPES['L']);
});
```

### Integration Tests

**IT-TETRO-001**: Rotation near wall uses wall-kicks
```javascript
test('T-piece can rotate near left wall using wall-kick', () => {
  const board = new Board(10, 20);
  const piece = createPiece('T');
  piece.x = 0; // Against left wall
  piece.y = 10;
  
  const result = rotate(piece, board);
  
  expect(result).toBe(true);
  expect(piece.x).toBeGreaterThanOrEqual(0); // Wall-kick moved it
});
```

**IT-TETRO-002**: I-piece uses different wall-kick table
```javascript
test('I-piece wall-kicks differ from other pieces', () => {
  const board = new Board(10, 20);
  
  const iPiece = createPiece('I');
  iPiece.x = 8; // Near right wall
  iPiece.y = 10;
  rotate(iPiece, board);
  const iPosition = iPiece.x;
  
  const tPiece = createPiece('T');
  tPiece.x = 8;
  tPiece.y = 10;
  rotate(tPiece, board);
  const tPosition = tPiece.x;
  
  // I-piece should kick differently than T-piece
  expect(iPosition).not.toBe(tPosition);
});
```

---

## Performance Guarantees

| Operation | Complexity | Target Time |
|-----------|------------|-------------|
| createPiece() | O(1) | <1ms |
| rotate() | O(5) | <5ms (5 kicks max) |
| movePiece() | O(1) | <1ms |
| getShapeCoords() | O(4) | <1ms |
| resetPiece() | O(1) | <1ms |

---

## Dependencies

**Internal**: None (standalone module)

**External**:
- Requires `Board` instance with `checkCollision(shape, x, y)` method for rotation/movement

---

## Usage Example

```javascript
import { createPiece, rotate, movePiece, getShapeCoords } from './tetromino.js';
import { Board } from './board.js';

const board = new Board(10, 20);
const piece = createPiece('T');

// Spawn at top center
piece.x = 4;
piece.y = 0;

// Try to rotate
if (rotate(piece, board)) {
  console.log('Rotated successfully');
}

// Try to move left
if (movePiece(piece, -1, 0, board)) {
  console.log('Moved left');
}

// Get absolute coordinates for rendering
const coords = getShapeCoords(piece);
console.log('Draw at:', coords);
```

---

## Notes

- All shape coordinates are relative to piece center (0, 0)
- Rotation is always clockwise 90°
- Wall-kick order matches official Tetris Guideline (SRS)
- O-piece rotation is a no-op but returns true
- I-piece has unique wall-kick table
- Colors follow standard Tetris conventions
