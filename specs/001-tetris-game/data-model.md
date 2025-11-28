# Data Model: Tetris Game

**Feature**: Tetris Game Application  
**Phase**: 1 (Design)  
**Date**: 2025-11-28

## Entity Definitions

### 1. Board

**Purpose**: Represents the 10x20 game grid and manages locked pieces

**Data Structure**:
```javascript
class Board {
  constructor() {
    this.width = 10;          // columns
    this.height = 20;         // rows
    this.grid = [];           // 2D array [row][col]: null or color string
  }
}
```

**Grid Representation**:
- 2D array: `grid[row][col]`
- Row 0 = top, Row 19 = bottom
- Col 0 = left, Col 9 = right
- Cell value: `null` (empty) or color string (locked piece: `'cyan'`, `'yellow'`, etc.)

**State**:
- `grid`: 2D array (20 rows × 10 columns)
- Each cell stores: `null` | `string` (color)

**Invariants**:
- Grid dimensions never change
- Only locked pieces stored in grid (active piece not stored)
- Colors match Tetromino color constants

---

### 2. Tetromino

**Purpose**: Represents a game piece (active or template)

**Data Structure**:
```javascript
class Tetromino {
  constructor(type) {
    this.type = type;         // 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'
    this.shape = [];          // Array of [x, y] coordinates (relative to origin)
    this.rotation = 0;        // 0 | 1 | 2 | 3 (rotation state)
    this.x = 0;               // Grid column (top-left of bounding box)
    this.y = 0;               // Grid row (top-left of bounding box)
    this.color = '';          // Color string ('cyan', 'yellow', etc.)
  }
}
```

**Shape Definitions** (rotation state 0):
```javascript
const SHAPES = {
  I: [[0,0], [1,0], [2,0], [3,0]],  // Horizontal line
  O: [[0,0], [1,0], [0,1], [1,1]],  // 2x2 square
  T: [[1,0], [0,1], [1,1], [2,1]],  // T-shape
  S: [[1,0], [2,0], [0,1], [1,1]],  // S-shape
  Z: [[0,0], [1,0], [1,1], [2,1]],  // Z-shape
  J: [[0,0], [0,1], [1,1], [2,1]],  // J-shape
  L: [[2,0], [0,1], [1,1], [2,1]]   // L-shape
};

const COLORS = {
  I: 'cyan',
  O: 'yellow',
  T: 'purple',
  S: 'green',
  Z: 'red',
  J: 'blue',
  L: 'orange'
};
```

**Rotation Matrices**:
- Clockwise 90°: `(x, y) → (-y, x)` relative to rotation center
- Each piece has a defined rotation center
- O-piece doesn't rotate (special case)

**Wall-Kick Offset Tables** (SRS):
```javascript
const WALL_KICKS = {
  JLSTZ: {  // J, L, S, T, Z pieces share same kicks
    '0->1': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
    '1->2': [[0,0], [1,0], [1,-1], [0,2], [1,2]],
    '2->3': [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
    '3->0': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]]
  },
  I: {      // I-piece has special kicks
    '0->1': [[0,0], [-2,0], [1,0], [-2,-1], [1,2]],
    '1->2': [[0,0], [-1,0], [2,0], [-1,2], [2,-1]],
    '2->3': [[0,0], [2,0], [-1,0], [2,1], [-1,-2]],
    '3->0': [[0,0], [1,0], [-2,0], [1,-2], [-2,1]]
  }
};
```

**State**:
- `type`: Piece type identifier
- `shape`: Current coordinates after rotation
- `rotation`: Current rotation state (0-3)
- `x`, `y`: Position on board
- `color`: Rendering color

---

### 3. PieceQueue

**Purpose**: Generates pieces using bag randomization

**Data Structure**:
```javascript
class PieceQueue {
  constructor() {
    this.bag = [];            // Current bag of pieces
    this.nextPiece = null;    // Next piece to spawn (for preview)
  }
}
```

**Algorithm**:
```javascript
// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fill and shuffle bag
function fillBag() {
  this.bag = shuffle(['I', 'O', 'T', 'S', 'Z', 'J', 'L']);
}
```

**State**:
- `bag`: Array of piece types awaiting spawn
- `nextPiece`: Peek at next piece (for UI preview)

---

### 4. GameState

**Purpose**: Manages game session data and state transitions

**Data Structure**:
```javascript
class GameState {
  constructor() {
    this.status = 'PLAYING';  // 'PLAYING' | 'PAUSED' | 'GAME_OVER'
    this.score = 0;           // Current score
    this.level = 1;           // Current level
    this.linesCleared = 0;    // Total lines cleared (for level calculation)
  }
}
```

**State Transitions**:
```
PLAYING --[pause pressed]--> PAUSED
PAUSED --[pause pressed]--> PLAYING
PLAYING --[top blocked]--> GAME_OVER
GAME_OVER --[restart]--> PLAYING (with reset state)
```

**Scoring Rules**:
```javascript
const SCORE_TABLE = {
  1: 100,    // Single line
  2: 300,    // Double lines
  3: 500,    // Triple lines
  4: 800     // Tetris (4 lines)
};

const SOFT_DROP_POINTS = 1;   // Per cell dropped
const HARD_DROP_POINTS = 2;   // Per cell dropped
```

**Level Progression**:
```javascript
// Level = 1 + floor(totalLinesCleared / 10)
function calculateLevel(linesCleared) {
  return 1 + Math.floor(linesCleared / 10);
}

// Fall interval in milliseconds
function getFallInterval(level) {
  return Math.max(100, 1000 - (level * 50));
}
```

**State**:
- `status`: Current game state (enum)
- `score`: Points accumulated
- `level`: Difficulty level
- `linesCleared`: Total lines cleared this session

---

### 5. GameEngine

**Purpose**: Orchestrates game loop, timing, and component coordination

**Data Structure**:
```javascript
class GameEngine {
  constructor() {
    this.board = new Board();
    this.activePiece = null;
    this.pieceQueue = new PieceQueue();
    this.state = new GameState();
    this.lastFallTime = 0;
    this.fallInterval = 1000;  // Initial 1 second
  }
}
```

**Timing State**:
- `lastFallTime`: Timestamp of last automatic fall (ms)
- `fallInterval`: Current fall interval based on level (ms)
- Uses `Date.now()` for consistent timing independent of frame rate

**State**:
- `board`: Game board instance
- `activePiece`: Currently falling piece (or null)
- `pieceQueue`: Piece generator
- `state`: Game state and score tracking
- Timing variables for gravity

---

### 6. InputHandler

**Purpose**: Manages keyboard input and key repeat timing

**Data Structure**:
```javascript
class InputHandler {
  constructor() {
    this.keys = new Set();     // Currently pressed keys
    this.lastMoveTime = {};    // Key -> timestamp for repeat timing
  }
}
```

**Key Mappings**:
```javascript
const KEY_BINDINGS = {
  'ArrowLeft': 'MOVE_LEFT',
  'ArrowRight': 'MOVE_RIGHT',
  'ArrowDown': 'SOFT_DROP',
  'ArrowUp': 'ROTATE',
  'Space': 'HARD_DROP',
  'KeyP': 'PAUSE'
};
```

**Key Repeat Timing**:
- **DAS** (Delayed Auto Shift): 170ms delay before repeat
- **ARR** (Auto Repeat Rate): 50ms between repeats
- Only applies to horizontal movement (left/right)
- Rotation/drop have no repeat (one action per press)

**State**:
- `keys`: Set of currently held keys
- `lastMoveTime`: Map of key -> last action timestamp (for repeat)

---

## Data Flow Diagram

```
User Input (Keyboard)
        ↓
  InputHandler
        ↓
  GameEngine.handleInput()
        ↓
  ┌─────┴─────┐
  ↓           ↓
Tetromino   Board.checkCollision()
.move()     .lockPiece()
.rotate()   .clearLines()
        ↓
  GameState.updateScore()
  GameState.updateLevel()
        ↓
  Renderer.draw()
        ↓
  Canvas Display
```

## Data Persistence

**Session Data** (in-memory only):
- Game board state
- Active piece
- Piece queue
- Score, level, lines cleared

**No Persistence Required**:
- Per spec.md: "High scores and game state do not persist between sessions"
- Each game session is independent
- Refresh page = fresh start

**Future Enhancement** (out of scope):
- LocalStorage for high scores
- Session storage for pause state preservation across page refresh

## Validation Rules

### Board State Invariants:
1. Grid dimensions always 10×20
2. Cells contain `null` or valid color string
3. Active piece never stored in grid (tracked separately)
4. No gaps between locked pieces and bottom (validated by gravity)

### Tetromino Invariants:
1. Type is one of 7 valid types ('I', 'O', 'T', 'S', 'Z', 'J', 'L')
2. Rotation state is 0, 1, 2, or 3
3. Shape array contains exactly 4 coordinate pairs
4. Position (x, y) is within board bounds (including piece cells)
5. Color matches piece type

### Game State Invariants:
1. Status is valid enum value
2. Score ≥ 0
3. Level ≥ 1
4. linesCleared ≥ 0
5. Level consistency: `level === 1 + floor(linesCleared / 10)`

### Collision Rules:
1. Piece cannot move outside left boundary (x < 0)
2. Piece cannot move outside right boundary (x + pieceWidth > board.width)
3. Piece cannot move below bottom boundary (y + pieceHeight > board.height)
4. Piece cells cannot overlap locked pieces in grid

## Edge Cases Handling

### Multiple Line Clears:
```javascript
// Scan all rows, remove complete rows, shift down
function clearLines() {
  const clearedRows = [];
  for (let row = 0; row < this.height; row++) {
    if (this.grid[row].every(cell => cell !== null)) {
      clearedRows.push(row);
    }
  }
  
  // Remove cleared rows (bottom to top to maintain indices)
  for (const row of clearedRows.reverse()) {
    this.grid.splice(row, 1);
    this.grid.unshift(Array(this.width).fill(null));
  }
  
  return clearedRows.length;
}
```

### Wall-Kick Rotation:
```javascript
// Try rotation, then try each wall-kick offset
function tryRotate() {
  const newShape = this.rotateShape();
  const kicks = this.getWallKicks(this.rotation, newRotation);
  
  for (const [offsetX, offsetY] of kicks) {
    if (!this.board.checkCollision(newShape, this.x + offsetX, this.y + offsetY)) {
      this.shape = newShape;
      this.x += offsetX;
      this.y += offsetY;
      this.rotation = newRotation;
      return true;
    }
  }
  return false; // Rotation blocked
}
```

### Game Over Detection:
```javascript
// Check if new piece collides immediately after spawn
function spawnPiece() {
  const piece = this.pieceQueue.getNext();
  piece.x = 4; // Center of 10-wide board
  piece.y = 0; // Top row
  
  if (this.board.checkCollision(piece.shape, piece.x, piece.y)) {
    this.state.status = 'GAME_OVER';
    return false;
  }
  
  this.activePiece = piece;
  return true;
}
```

## Performance Considerations

### Memory Efficiency:
- Board grid: 20 × 10 × 8 bytes (string reference) = ~1.6 KB
- Active piece: ~100 bytes
- Piece queue: ~700 bytes (7 pieces × ~100 bytes)
- Total game state: <10 KB (well within 50MB limit)

### Computational Complexity:
- **Collision check**: O(4) - check 4 cells of piece
- **Line clear**: O(200) - scan 10×20 grid
- **Rotation**: O(1) - lookup in rotation table
- **Render**: O(200) - draw 10×20 cells

### Optimization Opportunities:
- **Dirty flag**: Only re-render when state changes
- **Object pooling**: Reuse Tetromino objects instead of creating new ones
- **Incremental rendering**: Only redraw changed cells (micro-optimization, likely not needed)

## Summary

Data model is complete with all entities defined, relationships documented, and validation rules specified. The model supports all functional requirements from spec.md and enables the modular architecture planned in research.md.

**Next Steps**: Create module contracts (API definitions) for each JavaScript module.
