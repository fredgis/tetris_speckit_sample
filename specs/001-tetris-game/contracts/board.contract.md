# Contract: Board Module

**Module**: `board.js`  
**Purpose**: Manage game grid, collision detection, line clearing  
**Dependencies**: None (standalone module)

## Public API

### Constructor

```javascript
/**
 * Creates a new game board
 * @constructor
 */
constructor()
```

**Postconditions**:
- `width` = 10
- `height` = 20
- `grid` initialized as 20×10 array of `null`

---

### checkCollision

```javascript
/**
 * Check if piece shape collides with board boundaries or locked pieces
 * @param {Array<[number, number]>} shape - Array of [x, y] coordinates
 * @param {number} x - Grid column of piece origin
 * @param {number} y - Grid row of piece origin
 * @returns {boolean} - True if collision detected, false if valid position
 */
checkCollision(shape, x, y)
```

**Preconditions**:
- `shape` is array of coordinate pairs
- `x`, `y` are integers

**Returns**:
- `true`: Collision detected (out of bounds or overlaps locked piece)
- `false`: Valid position (no collision)

**Algorithm**:
```javascript
for (const [cellX, cellY] of shape) {
  const boardX = x + cellX;
  const boardY = y + cellY;
  
  // Check boundaries
  if (boardX < 0 || boardX >= this.width || boardY >= this.height) {
    return true;
  }
  
  // Check locked pieces (allow negative Y for spawn above visible area)
  if (boardY >= 0 && this.grid[boardY][boardX] !== null) {
    return true;
  }
}
return false;
```

---

### lockPiece

```javascript
/**
 * Lock active piece into board grid
 * @param {Array<[number, number]>} shape - Piece shape coordinates
 * @param {number} x - Grid column of piece origin
 * @param {number} y - Grid row of piece origin
 * @param {string} color - Color to store in grid cells
 * @returns {void}
 */
lockPiece(shape, x, y, color)
```

**Preconditions**:
- Piece position is valid (no collision)
- `color` is non-empty string

**Postconditions**:
- Grid cells at piece coordinates contain `color`

**Side Effects**:
- Modifies `this.grid`

---

### clearLines

```javascript
/**
 * Detect and clear complete lines, shift rows down
 * @returns {number} - Number of lines cleared (0-4)
 */
clearLines()
```

**Returns**:
- Integer from 0 to 4 (max 4 lines can be cleared simultaneously)

**Postconditions**:
- Complete rows removed from grid
- Rows above shifted down
- New empty rows added at top

**Algorithm**:
```javascript
const clearedRows = [];

// Find complete rows
for (let row = 0; row < this.height; row++) {
  if (this.grid[row].every(cell => cell !== null)) {
    clearedRows.push(row);
  }
}

// Remove and shift (iterate backwards to maintain indices)
for (const row of clearedRows.reverse()) {
  this.grid.splice(row, 1);
  this.grid.unshift(Array(this.width).fill(null));
}

return clearedRows.length;
```

---

### reset

```javascript
/**
 * Clear all locked pieces from board
 * @returns {void}
 */
reset()
```

**Postconditions**:
- All grid cells set to `null`

---

### getGrid

```javascript
/**
 * Get copy of current grid state (for rendering)
 * @returns {Array<Array<string|null>>} - 2D array copy of grid
 */
getGrid()
```

**Returns**:
- Deep copy of `this.grid` (to prevent external mutation)

---

## Internal Methods (Private)

None - all methods are public for testability

---

## Constants

```javascript
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
```

---

## Test Contract

### Unit Tests Required:

1. **Constructor**: Verify grid initialized to correct dimensions with all `null`
2. **checkCollision - Boundaries**:
   - Left boundary (x < 0)
   - Right boundary (x + shape extends beyond width)
   - Bottom boundary (y + shape extends beyond height)
3. **checkCollision - Locked Pieces**:
   - No collision with empty cells
   - Collision with locked pieces
4. **checkCollision - Edge Cases**:
   - Piece partially above visible area (negative y)
5. **lockPiece**:
   - Piece cells added to grid with correct color
   - Grid unaffected outside piece area
6. **clearLines - Single Line**:
   - One complete row cleared
   - Rows above shifted down
   - Empty row added at top
7. **clearLines - Multiple Lines**:
   - Multiple complete rows cleared simultaneously
   - Proper shifting behavior
8. **clearLines - No Lines**:
   - Returns 0 when no complete lines
   - Grid unchanged
9. **reset**:
   - All cells cleared to `null`

### Integration Tests Required:

1. **Full Gameplay Loop**:
   - Spawn piece → move → lock → clear lines → spawn next piece
2. **Game Over Scenario**:
   - Fill board to top → verify next spawn collides

---

## Performance Guarantees

- **checkCollision**: O(4) - constant time (4 cells per piece)
- **lockPiece**: O(4) - constant time
- **clearLines**: O(200) - scans entire grid (10×20)
- **Memory**: O(200) - stores 200 cell states

---

## Usage Example

```javascript
import Board from './board.js';

const board = new Board();

// Check if piece can spawn
const spawnShape = [[0,0], [1,0], [2,0], [3,0]]; // I-piece
const canSpawn = !board.checkCollision(spawnShape, 3, 0);

if (canSpawn) {
  // ... gameplay ...
  
  // Lock piece when it lands
  board.lockPiece(spawnShape, 3, 19, 'cyan');
  
  // Clear any complete lines
  const linesCleared = board.clearLines();
  console.log(`Cleared ${linesCleared} lines`);
}
```
