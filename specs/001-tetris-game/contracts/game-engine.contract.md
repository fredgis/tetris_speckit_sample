# GameEngine Module Contract

**Version**: 1.0.0  
**Module**: `js/game-engine.js`  
**Purpose**: Orchestrate game loop, timing, module coordination, and high-level game flow

---

## Public API

### Constructor

```javascript
/**
 * @param {HTMLCanvasElement} canvas - Game canvas element
 * @param {Object} options - Configuration options
 * @param {number} [options.width=10] - Board width in cells
 * @param {number} [options.height=20] - Board height in cells
 * @param {number} [options.initialLevel=1] - Starting level
 */
constructor(canvas, options = {})
```

**Preconditions**:
- `canvas` is valid HTMLCanvasElement
- `options.width` and `options.height` are positive integers

**Postconditions**:
- All modules initialized (Board, State, PieceQueue, Input, Renderer)
- Game state is 'READY' (not started)
- Event listeners attached

---

### 1. start()

**Description**: Initialize game and start main loop.

**Parameters**: None

**Returns**: `{void}`

**Preconditions**:
- Game engine constructed
- Game state is 'READY' or 'GAME_OVER'

**Postconditions**:
- Game state changes to 'PLAYING'
- Active piece spawned
- Game loop running via requestAnimationFrame

**Algorithm**:
```javascript
start() {
  // Reset game state
  this.state.reset();
  this.board.reset();
  this.pieceQueue.reset();
  
  // Spawn first piece
  this.spawnNextPiece();
  
  // Start game loop
  this.state.setState('PLAYING');
  this.isRunning = true;
  this.lastTime = performance.now();
  this.lastFallTime = 0;
  this.accumulator = 0;
  
  this.gameLoop(this.lastTime);
}
```

---

### 2. pause()

**Description**: Pause game, freezing all state.

**Parameters**: None

**Returns**: `{void}`

**Preconditions**:
- Game state is 'PLAYING'

**Postconditions**:
- Game state changes to 'PAUSED'
- Game loop continues but update() skipped
- Pause overlay displayed

**Algorithm**:
```javascript
pause() {
  if (this.state.status === 'PLAYING') {
    this.state.setState('PAUSED');
    this.renderer.showPauseOverlay();
  }
}
```

---

### 3. resume()

**Description**: Resume paused game.

**Parameters**: None

**Returns**: `{void}`

**Preconditions**:
- Game state is 'PAUSED'

**Postconditions**:
- Game state changes to 'PLAYING'
- Game loop resumes processing updates
- Pause overlay hidden

**Algorithm**:
```javascript
resume() {
  if (this.state.status === 'PAUSED') {
    this.state.setState('PLAYING');
    this.renderer.hidePauseOverlay();
    this.lastTime = performance.now(); // Reset timing
  }
}
```

---

### 4. restart()

**Description**: Reset all state and start new game.

**Parameters**: None

**Returns**: `{void}`

**Preconditions**:
- None (can restart from any state)

**Postconditions**:
- All state reset to initial values
- New game started
- Game state is 'PLAYING'

**Algorithm**:
```javascript
restart() {
  this.stop();
  this.start();
}
```

---

### 5. stop()

**Description**: Stop game loop and clean up.

**Parameters**: None

**Returns**: `{void}`

**Preconditions**:
- Game is running

**Postconditions**:
- Game loop stopped
- State changes to 'READY'
- Animation frame canceled

**Algorithm**:
```javascript
stop() {
  this.isRunning = false;
  this.state.setState('READY');
  
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
}
```

---

### 6. handleInput(action)

**Description**: Process input commands and execute corresponding actions.

**Parameters**:
- `action` (string): One of ['MOVE_LEFT', 'MOVE_RIGHT', 'ROTATE', 'SOFT_DROP', 'HARD_DROP', 'PAUSE']

**Returns**: `{boolean}` - True if action executed, false if ignored

**Preconditions**:
- `action` is valid action string

**Postconditions**:
- If action succeeds: Game state updated, piece moved/rotated
- If action fails: No change to state

**Algorithm**:
```javascript
handleInput(action) {
  if (this.state.status === 'GAME_OVER') return false;
  
  switch (action) {
    case 'PAUSE':
      if (this.state.status === 'PLAYING') {
        this.pause();
      } else if (this.state.status === 'PAUSED') {
        this.resume();
      }
      return true;
      
    case 'MOVE_LEFT':
      return this.moveActivePiece(-1, 0);
      
    case 'MOVE_RIGHT':
      return this.moveActivePiece(1, 0);
      
    case 'ROTATE':
      return this.rotateActivePiece();
      
    case 'SOFT_DROP':
      return this.softDrop();
      
    case 'HARD_DROP':
      return this.hardDrop();
      
    default:
      return false;
  }
}
```

---

### 7. getState()

**Description**: Get current game state snapshot.

**Parameters**: None

**Returns**: `{Object}` - State snapshot

```javascript
{
  status: string,        // 'READY' | 'PLAYING' | 'PAUSED' | 'GAME_OVER'
  score: number,         // Current score
  level: number,         // Current level
  linesCleared: number,  // Total lines cleared
  activePiece: Object,   // Current piece (or null)
  nextPiece: Object      // Next piece (or null)
}
```

**Preconditions**: None

**Postconditions**:
- Returns current state
- Does not modify state

---

### 8. destroy()

**Description**: Clean up all resources and event listeners.

**Parameters**: None

**Returns**: `{void}`

**Preconditions**: None

**Postconditions**:
- Game loop stopped
- All event listeners removed
- Resources released

**Algorithm**:
```javascript
destroy() {
  this.stop();
  this.input.destroy();
  this.renderer.clear();
}
```

---

## Private Methods (for context)

### gameLoop(currentTime)
Main game loop using requestAnimationFrame with fixed timestep.

### update(deltaTime)
Update game logic (gravity, piece falling, input processing).

### render()
Render current game state to canvas and DOM.

### spawnNextPiece()
Spawn next piece from queue at top center of board.

### moveActivePiece(dx, dy)
Attempt to move active piece by offset.

### rotateActivePiece()
Attempt to rotate active piece clockwise.

### softDrop()
Move piece down one row, award 1 point.

### hardDrop()
Instantly drop piece to lowest valid position, award points, lock immediately.

### lockActivePiece()
Lock active piece to board, clear lines, update score, spawn next piece.

---

## Testing Requirements

### Unit Tests

**UT-ENGINE-001**: Constructor initializes all modules
```javascript
test('GameEngine constructor initializes modules', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  
  expect(engine.board).toBeDefined();
  expect(engine.state).toBeDefined();
  expect(engine.pieceQueue).toBeDefined();
  expect(engine.input).toBeDefined();
  expect(engine.renderer).toBeDefined();
  expect(engine.state.status).toBe('READY');
});
```

**UT-ENGINE-002**: start() spawns piece and begins loop
```javascript
test('start() initializes game and spawns piece', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  
  engine.start();
  
  expect(engine.state.status).toBe('PLAYING');
  expect(engine.activePiece).not.toBeNull();
  expect(engine.isRunning).toBe(true);
});
```

**UT-ENGINE-003**: pause() freezes state
```javascript
test('pause() changes state to PAUSED', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  
  engine.pause();
  
  expect(engine.state.status).toBe('PAUSED');
});
```

**UT-ENGINE-004**: resume() continues from pause
```javascript
test('resume() restores PLAYING state', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  engine.pause();
  
  engine.resume();
  
  expect(engine.state.status).toBe('PLAYING');
});
```

**UT-ENGINE-005**: restart() resets all state
```javascript
test('restart() resets score and spawns new piece', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  engine.state.score = 500;
  
  engine.restart();
  
  expect(engine.state.score).toBe(0);
  expect(engine.state.status).toBe('PLAYING');
});
```

**UT-ENGINE-006**: handleInput() processes MOVE_LEFT
```javascript
test('handleInput(MOVE_LEFT) moves piece left', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  const initialX = engine.activePiece.x;
  
  const result = engine.handleInput('MOVE_LEFT');
  
  expect(result).toBe(true);
  expect(engine.activePiece.x).toBe(initialX - 1);
});
```

**UT-ENGINE-007**: handleInput() toggles pause
```javascript
test('handleInput(PAUSE) toggles between PLAYING and PAUSED', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  
  engine.handleInput('PAUSE');
  expect(engine.state.status).toBe('PAUSED');
  
  engine.handleInput('PAUSE');
  expect(engine.state.status).toBe('PLAYING');
});
```

**UT-ENGINE-008**: getState() returns state snapshot
```javascript
test('getState() returns current state', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  
  const state = engine.getState();
  
  expect(state).toHaveProperty('status');
  expect(state).toHaveProperty('score');
  expect(state).toHaveProperty('level');
  expect(state).toHaveProperty('activePiece');
  expect(state).toHaveProperty('nextPiece');
});
```

**UT-ENGINE-009**: destroy() cleans up resources
```javascript
test('destroy() stops loop and removes listeners', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  
  engine.destroy();
  
  expect(engine.isRunning).toBe(false);
  expect(engine.animationFrameId).toBeNull();
});
```

### Integration Tests

**IT-ENGINE-001**: Gravity moves piece down automatically
```javascript
test('Piece falls automatically after fall interval', (done) => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  const initialY = engine.activePiece.y;
  
  // Wait for fall interval + buffer
  setTimeout(() => {
    expect(engine.activePiece.y).toBeGreaterThan(initialY);
    done();
  }, engine.state.getFallInterval() + 100);
});
```

**IT-ENGINE-002**: Piece locks when it hits bottom
```javascript
test('Piece locks when reaching bottom', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas, { height: 5 });
  engine.start();
  
  // Force piece to bottom
  while (engine.moveActivePiece(0, 1)) {
    // Keep moving down
  }
  
  // One more update should lock it
  engine.update(engine.FIXED_TIME_STEP);
  
  expect(engine.board.getGrid()[4]).not.toEqual([null, null, null, null, null, null, null, null, null, null]);
});
```

**IT-ENGINE-003**: Line clear updates score and spawns piece
```javascript
test('Clearing line updates score and spawns new piece', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  
  // Mock a full line
  for (let x = 0; x < 10; x++) {
    engine.board.grid[19][x] = '#FF0000';
  }
  
  engine.lockActivePiece();
  
  expect(engine.state.score).toBeGreaterThan(0);
  expect(engine.activePiece).not.toBeNull();
});
```

**IT-ENGINE-004**: Game over when piece spawns in collision
```javascript
test('Game over when new piece cannot spawn', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  
  // Fill top rows
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 10; x++) {
      engine.board.grid[y][x] = '#FF0000';
    }
  }
  
  engine.lockActivePiece();
  
  expect(engine.state.status).toBe('GAME_OVER');
});
```

**IT-ENGINE-005**: Hard drop scores correctly
```javascript
test('Hard drop awards points based on distance', () => {
  const canvas = document.createElement('canvas');
  const engine = new GameEngine(canvas);
  engine.start();
  const initialScore = engine.state.score;
  const initialY = engine.activePiece.y;
  
  engine.handleInput('HARD_DROP');
  
  const dropDistance = engine.activePiece.y - initialY;
  expect(engine.state.score).toBe(initialScore + (dropDistance * 2));
});
```

---

## Performance Guarantees

| Operation | Complexity | Target Time |
|-----------|------------|-------------|
| start() | O(1) | <10ms |
| pause() | O(1) | <1ms |
| resume() | O(1) | <1ms |
| restart() | O(1) | <10ms |
| handleInput() | O(4) | <5ms |
| update() | O(1) | <16ms (60 FPS) |
| render() | O(200) | <16ms (60 FPS) |

---

## Dependencies

**Internal Modules**:
- `board.js` - Board instance
- `tetromino.js` - Piece creation and manipulation
- `piece-queue.js` - Next-piece generation
- `state.js` - Game state management
- `input.js` - Keyboard input handling
- `renderer.js` - Display rendering

**External**:
- Browser API: requestAnimationFrame, performance.now()

---

## Usage Example

```javascript
import { GameEngine } from './game-engine.js';

// Get canvas
const canvas = document.getElementById('game-canvas');

// Create engine
const engine = new GameEngine(canvas, {
  width: 10,
  height: 20,
  initialLevel: 1
});

// Start game
engine.start();

// Handle UI events
document.getElementById('pause-btn').addEventListener('click', () => {
  engine.pause();
});

document.getElementById('restart-btn').addEventListener('click', () => {
  engine.restart();
});

// Monitor state
setInterval(() => {
  const state = engine.getState();
  console.log(`Score: ${state.score}, Level: ${state.level}`);
}, 1000);
```

---

## Game Loop Details

### Fixed Timestep Implementation

```javascript
gameLoop(currentTime) {
  if (!this.isRunning) return;
  
  const deltaTime = currentTime - this.lastTime;
  this.lastTime = currentTime;
  this.accumulator += deltaTime;
  
  // Fixed timestep updates (deterministic)
  while (this.accumulator >= this.FIXED_TIME_STEP) {
    this.update(this.FIXED_TIME_STEP);
    this.accumulator -= this.FIXED_TIME_STEP;
  }
  
  // Render current state
  this.render();
  
  this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
}
```

### Timing Constants

```javascript
FIXED_TIME_STEP = 16.67; // 60 FPS (1000ms / 60)
```

---

## State Transitions

```
┌─────────┐
│  READY  │ ──start()──> ┌─────────┐
└─────────┘              │ PLAYING │ <──resume()── ┌────────┐
                         └─────────┘               │ PAUSED │
                             │                     └────────┘
                             │                         ↑
                             │                         │
                             ├─────────pause()─────────┘
                             │
                             │ (top out)
                             ↓
                         ┌──────────┐
                         │GAME_OVER │ ──restart()──> [back to PLAYING]
                         └──────────┘
```

---

## Notes

- Uses requestAnimationFrame for smooth 60 FPS rendering
- Fixed timestep ensures deterministic game logic
- Input is processed in update(), not directly in event handlers
- Gravity timing based on state.getFallInterval() (level-dependent)
- Pause does not stop loop, only skips updates
- Game over check happens on piece spawn (not during lock)
