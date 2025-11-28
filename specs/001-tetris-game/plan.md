# Implementation Plan: Tetris Game Application

**Branch**: `001-tetris-game` | **Date**: 2025-11-28 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-tetris-game/spec.md`

## Summary

This plan details the technical implementation of a browser-based Tetris game using vanilla HTML5, CSS3, and ES6+ JavaScript. The game features a 10x20 grid, seven Tetrimino pieces with rotation and collision detection, line clearing with scoring, progressive difficulty levels, and a responsive desktop UI. The architecture emphasizes clean separation of concerns through modular JavaScript, standards-compliant markup, and maintainable CSS following modern best practices. Implementation will be incremental, starting with core gameplay (P1), adding collision and game-over logic (P2), then progressive features (P3-P5).

## Technical Context

**Language/Version**: JavaScript ES6+ (ECMAScript 2015+), HTML5, CSS3  
**Primary Dependencies**: None (vanilla JavaScript, no frameworks or external libraries)  
**Storage**: N/A (in-memory game state only; no persistence required)  
**Testing**: Jest 29+ for unit/integration tests, ESLint for code quality, Prettier for formatting  
**Target Platform**: Modern desktop browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Web application (single-page, client-side only)  
**Performance Goals**: 
- 60 FPS consistent frame rate during gameplay
- <50ms input latency (key press to visual update)
- <100ms line clear processing time
- <1.5s First Contentful Paint (FCP)
- <3.5s Time to Interactive (TTI)

**Constraints**: 
- Desktop-only (minimum 800x600 resolution)
- Keyboard-only controls (no mouse required for gameplay)
- Offline-capable (no network dependencies)
- <50MB total memory footprint
- No external CDN dependencies (self-contained bundle)

**Scale/Scope**: 
- Single-player game (1 concurrent user)
- ~1500-2000 lines of JavaScript code estimated
- 7 distinct Tetrimino shapes with 4 rotation states each
- 10x20 game board (200 cells)
- Infinite gameplay duration (until game over)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality Compliance

- [x] Naming conventions defined for this domain/technology
  - JavaScript: camelCase for functions/variables, PascalCase for classes, UPPER_SNAKE_CASE for constants
  - CSS: BEM naming convention (block__element--modifier)
  - Files: kebab-case for filenames (game-engine.js, tetromino.js)
- [x] Linting/formatting tools configured
  - ESLint with Airbnb base config for code quality
  - Prettier for consistent formatting
  - Pre-commit hooks to enforce standards
- [x] Code review checklist includes quality standards
  - Single Responsibility Principle for each module
  - No functions longer than 50 lines
  - JSDoc comments for all public APIs
- [x] Documentation requirements clear (inline comments, user docs)
  - Inline comments for complex algorithms (rotation, wall-kick, collision)
  - JSDoc for all modules, classes, and public functions
  - README with setup and gameplay instructions
- [x] DRY and single responsibility principles planned into design
  - Modular architecture: separate files for board, tetromino, input, rendering, state
  - Shared utilities extracted to utils module
  - Each module has single, clear purpose

**Status**: ✅ PASS

### II. Testing Standards Compliance

- [x] TDD workflow planned (tests before implementation)
  - Write tests for each module API before implementation
  - Red-Green-Refactor cycle for all features
  - Tests written against acceptance criteria from spec.md
- [x] Contract tests identified for all public APIs/interfaces
  - Board module: `checkCollision()`, `clearLines()`, `isGameOver()`
  - Tetromino module: `rotate()`, `getShape()`, `getColor()`
  - Game Engine: `start()`, `pause()`, `restart()`, `update()`
  - State module: `getState()`, `setState()`, `getScore()`, `getLevel()`
- [x] Integration tests identified for user journeys
  - P1: Complete game loop (spawn, move, rotate, lock, clear line, score update)
  - P2: Collision detection and game-over flow
  - P3: Level progression and speed increase
  - P4: Next-piece preview accuracy
  - P5: Pause/resume state preservation
- [x] Unit tests planned for complex business logic
  - Rotation algorithm with wall-kick logic
  - Line clearing and row shifting
  - Collision detection (boundaries + pieces)
  - Score calculation with multipliers
  - Level calculation and fall speed formula
- [x] Test automation strategy defined
  - Jest for test runner and assertions
  - npm test script to run all tests
  - CI/CD integration via GitHub Actions (if applicable)
  - Coverage reports with nyc/istanbul
- [x] Coverage targets set (80%+ for critical paths)
  - Board module: 90%+ (critical game logic)
  - Tetromino module: 85%+ (rotation is complex)
  - Game Engine: 80%+ (orchestration logic)
  - Input/Rendering: 70%+ (UI logic, less critical)

**Status**: ✅ PASS

### III. User Experience Consistency Compliance

- [x] User stories prioritized (P1, P2, P3...)
  - P1: Core gameplay (MVP)
  - P2: Collision & game-over (fairness)
  - P3: Levels & difficulty (engagement)
  - P4: Visual polish (quality)
  - P5: Pause & controls (convenience)
- [x] Each user story independently testable
  - P1 delivers playable Tetris
  - P2 adds challenge without breaking P1
  - P3-P5 are progressive enhancements
- [x] Acceptance criteria in Given-When-Then format
  - All scenarios documented in spec.md
  - Directly mappable to integration tests
- [x] Error handling strategy defined (clear, actionable messages)
  - Game-over: display final score, offer restart
  - Invalid moves: silently block (no error messages needed)
  - Keyboard focus: visual indicator when game area focused
- [x] Accessibility requirements identified (if applicable)
  - Keyboard-only gameplay (no mouse required)
  - Focus management for game canvas/controls
  - High contrast colors for piece visibility
  - Screen reader announcements for score/level changes (nice-to-have)
- [x] Design consistency maintained (if UI involved)
  - Consistent color scheme (Tetris Guideline colors)
  - Uniform spacing and typography
  - Visual feedback for all state changes
- [x] User documentation planned
  - On-screen controls legend
  - README with gameplay instructions
  - Comments in code for maintainability

**Status**: ✅ PASS

### IV. Performance Requirements Compliance

- [x] Performance targets explicitly defined (response times, throughput, etc.)
  - 60 FPS consistent frame rate
  - <50ms input latency
  - <100ms line clear processing
  - <1.5s FCP, <3.5s TTI
- [x] Appropriate data structures/algorithms selected for scale
  - 2D array for board (O(1) access)
  - Piece shapes as coordinate arrays (efficient rotation)
  - Bag randomizer with array shuffling (O(n))
  - Line detection with row scanning (O(width))
- [x] Async/background processing planned for blocking operations
  - requestAnimationFrame for smooth game loop
  - No blocking operations in critical path
  - Event-driven input handling (non-blocking)
- [x] Pagination/lazy loading planned for large datasets
  - N/A (no large datasets; game state fits in memory)
- [x] Performance regression tests identified
  - Frame rate monitoring during gameplay
  - Input latency measurement tests
  - Memory profiling after 1000 moves
- [x] Memory and resource limits defined
  - <50MB total memory footprint
  - <10MB JavaScript heap
  - No memory leaks (clean up event listeners)
- [x] Load testing strategy defined (if concurrent usage expected)
  - N/A (single-player, single-instance game)

**Status**: ✅ PASS

### Overall Constitution Compliance

**Overall Status**: ✅ ALL PASS

**Notes**: 
- All constitutional requirements met with concrete implementation plans
- Testing strategy comprehensive with TDD workflow enforced
- Performance targets derived from spec.md success criteria
- Modular architecture supports single responsibility and maintainability
- No violations or exceptions required

## Project Structure

### Documentation (this feature)

```text
specs/001-tetris-game/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (implementation plan)
├── research.md          # Technology research and best practices
├── data-model.md        # Game state and entity definitions
├── quickstart.md        # Setup and run instructions
├── contracts/           # Module API contracts (JavaScript interfaces)
│   ├── board.contract.md
│   ├── tetromino.contract.md
│   ├── game-engine.contract.md
│   └── state.contract.md
└── tasks.md             # Implementation tasks (/speckit.tasks output)
```

### Source Code (repository root)

```text
tetris-game/             # Project root
├── index.html           # Main HTML entry point
├── package.json         # npm dependencies and scripts
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── README.md            # Project documentation
│
├── css/
│   ├── main.css         # Global styles, layout, reset
│   ├── board.css        # Game board styling
│   ├── ui.css           # HUD, score, level, next-piece preview
│   └── components.css   # Buttons, overlays, pause screen
│
├── js/
│   ├── main.js          # Application entry point, initialization
│   ├── game-engine.js   # Game loop, timing, level management
│   ├── board.js         # Grid logic, collision, line clearing
│   ├── tetromino.js     # Piece shapes, rotation, spawning
│   ├── input.js         # Keyboard handling, key repeat management
│   ├── renderer.js      # Canvas/DOM rendering logic
│   ├── state.js         # Game state management (score, level, paused)
│   ├── piece-queue.js   # Bag randomizer, next-piece generation
│   └── utils.js         # Shared utilities, constants, helpers
│
├── tests/
│   ├── setup.js         # Jest test configuration
│   ├── unit/
│   │   ├── board.test.js
│   │   ├── tetromino.test.js
│   │   ├── piece-queue.test.js
│   │   ├── state.test.js
│   │   └── utils.test.js
│   ├── integration/
│   │   ├── gameplay-loop.test.js
│   │   ├── collision-detection.test.js
│   │   ├── level-progression.test.js
│   │   └── pause-resume.test.js
│   └── contract/
│       ├── board-api.test.js
│       ├── tetromino-api.test.js
│       └── game-engine-api.test.js
│
└── assets/              # Optional assets
    └── favicon.ico      # Browser icon
```

**Structure Decision**: Web application structure selected (Option 2 variant simplified for client-only).

- **Rationale**: This is a pure frontend application with no backend required. All game logic runs in the browser.
- **Module Organization**: JavaScript modules follow domain-driven design - each file represents a clear domain concept (board, pieces, input, rendering).
- **Test Organization**: Three-tier testing matches constitution requirements (contract, integration, unit).
- **CSS Organization**: Separated by concern - layout, components, and game-specific styling.
- **Scalability**: Modular structure allows easy addition of features (e.g., sound effects in `assets/`, new game modes in `js/`).

## Complexity Tracking

> No constitutional violations - this table is empty per requirements.

## Architecture & Module Design

### Module Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         main.js                              │
│                 (Application Entry Point)                    │
└────────────────┬─────────────────────────────────────────────┘
                 │ initializes
                 ↓
┌─────────────────────────────────────────────────────────────┐
│                     game-engine.js                           │
│               (Game Loop Orchestrator)                       │
│  - Manages game loop (requestAnimationFrame)                 │
│  - Coordinates all other modules                             │
│  - Handles timing (gravity, fall speed)                      │
└──┬────┬─────┬──────┬────────┬──────────────────────────────┘
   │    │     │      │        │
   │    │     │      │        └──────────┐
   │    │     │      │                   │
   ↓    ↓     ↓      ↓                   ↓
┌──────┐ ┌────────┐ ┌─────────┐  ┌──────────────┐  ┌──────────┐
│board │ │tetromi-│ │piece-   │  │state.js      │  │input.js  │
│.js   │ │no.js   │ │queue.js │  │(Game State)  │  │(Keyboard)│
│      │ │(Pieces)│ │(Random) │  │- score       │  │- keys    │
│- grid│ │- shapes│ │- bag    │  │- level       │  │- repeat  │
│      │ │- rotate│ │         │  │- status      │  │          │
└──┬───┘ └────┬───┘ └────┬────┘  └──────┬───────┘  └────┬─────┘
   │          │          │               │               │
   └──────────┴──────────┴───────────────┴───────────────┘
                         │
                         ↓
                  ┌──────────────┐
                  │renderer.js   │
                  │(Display)     │
                  │- Canvas 2D   │
                  │- DOM updates │
                  └──────────────┘
```

### Detailed Module Responsibilities

#### 1. main.js (Entry Point)
**Responsibilities**:
- Initialize game engine
- Set up event listeners (DOMContentLoaded)
- Create and mount canvas element
- Start game loop

**Exports**: None (executes immediately)

**Dependencies**: game-engine.js

---

#### 2. game-engine.js (Orchestrator)
**Responsibilities**:
- Main game loop using requestAnimationFrame
- Timing management (gravity intervals)
- Coordinate module interactions
- Handle high-level game flow (start, pause, restart)

**Key Methods**:
- `start()`: Initialize game, start loop
- `pause()`: Freeze game state
- `restart()`: Reset all state, restart loop
- `update(deltaTime)`: Update game logic (fixed timestep)
- `handleInput(action)`: Process input commands

**Dependencies**: board, tetromino, piece-queue, state, input, renderer

---

#### 3. board.js (Grid Logic)
**Responsibilities**:
- Manage 10×20 grid of locked pieces
- Collision detection (boundaries + pieces)
- Line clearing and row shifting
- Board state queries

**Key Methods**:
- `checkCollision(shape, x, y)`: Boolean collision test
- `lockPiece(shape, x, y, color)`: Add piece to grid
- `clearLines()`: Remove complete rows, return count
- `reset()`: Clear all locked pieces
- `getGrid()`: Get grid state for rendering

**Dependencies**: None (standalone)

---

#### 4. tetromino.js (Piece Logic)
**Responsibilities**:
- Define 7 Tetrimino shapes
- Rotation logic (90° clockwise)
- Wall-kick offset tables (SRS)
- Piece movement helpers

**Key Methods**:
- `createPiece(type)`: Factory for new pieces
- `rotate(piece, board)`: Rotate with wall-kick attempts
- `movePiece(piece, dx, dy, board)`: Try to move piece
- `getShapeCoords(piece)`: Get absolute grid coordinates

**Dependencies**: None (standalone)

---

#### 5. piece-queue.js (Randomizer)
**Responsibilities**:
- Bag randomization algorithm
- Next-piece generation
- Preview management

**Key Methods**:
- `getNext()`: Pop next piece from bag
- `peek()`: View next piece without removing
- `reset()`: Clear and refill bag

**Dependencies**: tetromino (for piece types)

---

#### 6. state.js (Game State)
**Responsibilities**:
- Track score, level, lines cleared
- Game status (PLAYING, PAUSED, GAME_OVER)
- Score calculation
- Level progression

**Key Methods**:
- `addScore(linesCleared, dropType)`: Calculate and add points
- `checkLevelUp()`: Update level based on lines cleared
- `getFallInterval()`: Get current gravity speed
- `setState(status)`: Change game status
- `reset()`: Reset to initial state

**Dependencies**: None (standalone)

---

#### 7. input.js (Keyboard Handler)
**Responsibilities**:
- Listen for keyboard events
- Key repeat timing (DAS/ARR)
- Map keys to game actions
- Handle key release

**Key Methods**:
- `init(callback)`: Set up event listeners
- `update()`: Process held keys with repeat timing
- `destroy()`: Clean up event listeners

**Dependencies**: None (standalone)

---

#### 8. renderer.js (Display)
**Responsibilities**:
- Canvas 2D rendering of game board
- DOM updates (score, level, next-piece preview)
- Visual effects (line clear animation)
- UI state rendering (paused, game over)

**Key Methods**:
- `init(canvasId)`: Set up canvas context
- `drawBoard(grid, activePiece)`: Render full board
- `drawUI(state, nextPiece)`: Update HUD elements
- `drawGameOver(finalScore)`: Display game over screen

**Dependencies**: None (receives data, outputs to DOM/Canvas)

---

#### 9. utils.js (Shared Utilities)
**Responsibilities**:
- Constants (colors, dimensions, timing)
- Helper functions
- Shared data structures

**Exports**:
- `COLORS`: Tetromino color constants
- `BOARD_WIDTH`, `BOARD_HEIGHT`: Dimensions
- `KEY_BINDINGS`: Keyboard mappings
- `shuffle(array)`: Fisher-Yates shuffle
- Helper functions as needed

**Dependencies**: None (standalone)

---

## Implementation Details

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tetris Game</title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div class="game-container">
    <header class="game-header">
      <h1>Tetris</h1>
    </header>
    
    <div class="game-layout">
      <aside class="game-sidebar">
        <div class="stat-panel">
          <h2>Score</h2>
          <p id="score-display" class="stat-value">0</p>
        </div>
        <div class="stat-panel">
          <h2>Level</h2>
          <p id="level-display" class="stat-value">1</p>
        </div>
        <div class="next-piece-panel">
          <h2>Next</h2>
          <canvas id="next-piece-canvas" width="80" height="80"></canvas>
        </div>
        <div class="controls-panel">
          <h2>Controls</h2>
          <ul class="controls-list">
            <li><kbd>←</kbd> <kbd>→</kbd> Move</li>
            <li><kbd>↑</kbd> Rotate</li>
            <li><kbd>↓</kbd> Soft Drop</li>
            <li><kbd>Space</kbd> Hard Drop</li>
            <li><kbd>P</kbd> Pause</li>
          </ul>
        </div>
      </aside>
      
      <main class="game-board-container">
        <canvas id="game-canvas" width="300" height="600"></canvas>
        <div id="pause-overlay" class="overlay hidden">
          <p>PAUSED</p>
          <small>Press P to resume</small>
        </div>
        <div id="game-over-overlay" class="overlay hidden">
          <p>GAME OVER</p>
          <p id="final-score"></p>
          <button id="restart-button">Play Again</button>
        </div>
      </main>
    </div>
  </div>
  
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

### CSS Architecture

**main.css** (Global styles, layout, reset):
```css
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Custom Properties */
:root {
  --color-bg: #1a1a2e;
  --color-fg: #eee;
  --color-accent: #16213e;
  --spacing-unit: 1rem;
  --font-main: 'Arial', sans-serif;
}

/* Global Layout */
body {
  font-family: var(--font-main);
  background-color: var(--color-bg);
  color: var(--color-fg);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.game-container {
  max-width: 800px;
  padding: var(--spacing-unit);
}

.game-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: calc(var(--spacing-unit) * 2);
}
```

**board.css** (Game board specific):
```css
.game-board-container {
  position: relative;
  display: inline-block;
}

#game-canvas {
  border: 3px solid var(--color-accent);
  background-color: #000;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.overlay.hidden {
  display: none;
}
```

**ui.css** (HUD components):
```css
.game-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-unit);
}

.stat-panel, .next-piece-panel, .controls-panel {
  background-color: var(--color-accent);
  padding: var(--spacing-unit);
  border-radius: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

kbd {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9rem;
}
```

### Game Loop Implementation

**Timing Strategy**: Fixed timestep with variable rendering

```javascript
// game-engine.js
class GameEngine {
  constructor() {
    this.lastTime = 0;
    this.accumulator = 0;
    this.FIXED_TIME_STEP = 16.67; // 60 FPS (1000ms / 60)
    this.lastFallTime = 0;
    // ... other initialization
  }
  
  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }
  
  gameLoop(currentTime) {
    if (!this.isRunning) return;
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.accumulator += deltaTime;
    
    // Fixed timestep updates (deterministic physics)
    while (this.accumulator >= this.FIXED_TIME_STEP) {
      this.update(this.FIXED_TIME_STEP);
      this.accumulator -= this.FIXED_TIME_STEP;
    }
    
    // Render current state (interpolation could be added here)
    this.render();
    
    requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  update(deltaTime) {
    if (this.state.status !== 'PLAYING') return;
    
    // Handle input
    this.input.update();
    
    // Apply gravity
    this.lastFallTime += deltaTime;
    if (this.lastFallTime >= this.state.getFallInterval()) {
      this.moveActivePieceDown();
      this.lastFallTime = 0;
    }
  }
  
  moveActivePieceDown() {
    const moved = this.tryMovePiece(0, 1);
    if (!moved) {
      this.lockActivePiece();
    }
  }
  
  lockActivePiece() {
    this.board.lockPiece(
      this.activePiece.shape,
      this.activePiece.x,
      this.activePiece.y,
      this.activePiece.color
    );
    
    const linesCleared = this.board.clearLines();
    if (linesCleared > 0) {
      this.state.addScore(linesCleared);
      this.state.checkLevelUp();
    }
    
    this.spawnNextPiece();
  }
  
  spawnNextPiece() {
    this.activePiece = this.pieceQueue.getNext();
    this.activePiece.x = 4; // Center of 10-wide board
    this.activePiece.y = 0;
    
    if (this.board.checkCollision(this.activePiece.shape, this.activePiece.x, this.activePiece.y)) {
      this.state.setState('GAME_OVER');
    }
  }
  
  render() {
    this.renderer.clear();
    this.renderer.drawBoard(this.board.getGrid(), this.activePiece);
    this.renderer.drawUI(this.state, this.pieceQueue.peek());
  }
}
```

### Collision Detection Implementation

```javascript
// board.js
checkCollision(shape, x, y) {
  for (const [cellX, cellY] of shape) {
    const boardX = x + cellX;
    const boardY = y + cellY;
    
    // Left/right boundary check
    if (boardX < 0 || boardX >= this.width) {
      return true;
    }
    
    // Bottom boundary check
    if (boardY >= this.height) {
      return true;
    }
    
    // Locked piece collision (only check visible area)
    if (boardY >= 0 && this.grid[boardY][boardX] !== null) {
      return true;
    }
  }
  
  return false;
}
```

### Rotation with Wall-Kick Implementation

```javascript
// tetromino.js
function rotate(piece, board) {
  const currentRotation = piece.rotation;
  const newRotation = (currentRotation + 1) % 4;
  
  // Rotate shape coordinates
  const newShape = rotateShapeCoords(piece.shape, piece.type);
  
  // Get wall-kick offsets for this rotation transition
  const kickKey = ${currentRotation}->;
  const kicks = WALL_KICKS[piece.type === 'I' ? 'I' : 'JLSTZ'][kickKey];
  
  // Try rotation at each kick offset
  for (const [offsetX, offsetY] of kicks) {
    const testX = piece.x + offsetX;
    const testY = piece.y + offsetY;
    
    if (!board.checkCollision(newShape, testX, testY)) {
      // Success! Apply rotation and offset
      piece.shape = newShape;
      piece.x = testX;
      piece.y = testY;
      piece.rotation = newRotation;
      return true;
    }
  }
  
  // All kick attempts failed
  return false;
}

function rotateShapeCoords(shape, type) {
  // O-piece doesn't rotate
  if (type === 'O') return shape;
  
  // Clockwise 90°: (x, y) -> (-y, x) around center
  return shape.map(([x, y]) => [-y, x]);
}
```

### Input Handling with Key Repeat

```javascript
// input.js
class InputHandler {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.keys = new Set();
    this.lastActionTime = {};
    this.DAS = 170; // Delayed Auto Shift (ms)
    this.ARR = 50;  // Auto Repeat Rate (ms)
    
    this.keyMap = {
      'ArrowLeft': 'MOVE_LEFT',
      'ArrowRight': 'MOVE_RIGHT',
      'ArrowDown': 'SOFT_DROP',
      'ArrowUp': 'ROTATE',
      ' ': 'HARD_DROP',
      'p': 'PAUSE'
    };
  }
  
  init() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }
  
  handleKeyDown(event) {
    const key = event.key;
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
  
  handleKeyUp(event) {
    this.keys.delete(event.key);
  }
  
  update() {
    const now = Date.now();
    
    // Process held keys (only horizontal movement and soft drop)
    for (const key of this.keys) {
      const action = this.keyMap[key];
      if (!['MOVE_LEFT', 'MOVE_RIGHT', 'SOFT_DROP'].includes(action)) continue;
      
      const timeSinceLastAction = now - this.lastActionTime[key];
      
      // Check if DAS delay has passed
      if (timeSinceLastAction >= this.DAS) {
        // Check if ARR interval has passed
        const timeSinceDAS = timeSinceLastAction - this.DAS;
        const repeatCount = Math.floor(timeSinceDAS / this.ARR);
        const expectedActionTime = this.lastActionTime[key] + this.DAS + (repeatCount * this.ARR);
        
        if (now >= expectedActionTime + this.ARR) {
          this.executeAction(action);
          this.lastActionTime[key] = expectedActionTime + this.ARR;
        }
      }
    }
  }
  
  executeAction(action) {
    this.gameEngine.handleInput(action);
  }
  
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
```

## Implementation Roadmap

### Milestone 1: Project Skeleton & Setup
**Duration**: 2-4 hours  
**Dependencies**: None

**Tasks**:
1. Create directory structure
2. Initialize package.json with dependencies (Jest, ESLint, Prettier)
3. Configure ESLint and Prettier
4. Set up Git repository and .gitignore
5. Create basic HTML structure
6. Create CSS files with layout framework
7. Create empty JavaScript module files with JSDoc headers

**Deliverable**: Project structure ready, can open index.html in browser (shows layout but no game)

**Verification**: 
pm install succeeds, 
pm run lint passes

---

### Milestone 2: Board & Tetromino Models
**Duration**: 4-6 hours  
**Dependencies**: Milestone 1

**Tasks**:
1. Write tests for Board module (TDD)
2. Implement Board class (grid, collision, lock, clear lines)
3. Write tests for Tetromino module (TDD)
4. Define 7 piece shapes and colors
5. Implement piece creation and basic rotation
6. Write tests for PieceQueue (bag randomizer)
7. Implement bag randomization algorithm

**Deliverable**: Core data models complete, all tests passing

**Verification**: 
pm test shows 100% passing unit tests for Board, Tetromino, PieceQueue

---

### Milestone 3: Rendering System
**Duration**: 3-4 hours  
**Dependencies**: Milestone 2

**Tasks**:
1. Implement Renderer class
2. Draw grid on canvas
3. Draw locked pieces from board state
4. Draw active piece at position
5. Draw next-piece preview
6. Update DOM elements (score, level)

**Deliverable**: Can render static game states to canvas

**Verification**: Manual test - create board state, instantiate renderer, see pieces on canvas

---

### Milestone 4: Game Loop & Input
**Duration**: 4-6 hours  
**Dependencies**: Milestone 3

**Tasks**:
1. Write tests for GameEngine core logic
2. Implement game loop with requestAnimationFrame
3. Implement gravity (automatic piece falling)
4. Implement InputHandler with key mapping
5. Wire up left/right movement
6. Wire up piece spawning after lock
7. Implement game-over detection

**Deliverable**: Minimal playable game (pieces fall, can move left/right, game over when stacked)

**Verification**: Can play game manually - pieces fall, respond to arrow keys, game ends when topped out

---

### Milestone 5: Rotation & Collision
**Duration**: 4-6 hours  
**Dependencies**: Milestone 4

**Tasks**:
1. Write tests for rotation algorithm
2. Implement 90° rotation logic
3. Define wall-kick offset tables (SRS)
4. Implement wall-kick rotation attempts
5. Write integration tests for collision scenarios
6. Test and fix edge cases (corners, tight spaces)

**Deliverable**: Full movement and rotation system working

**Verification**: Integration tests pass, manual testing confirms rotation works near walls/pieces

---

### Milestone 6: Line Clearing & Scoring
**Duration**: 3-4 hours  
**Dependencies**: Milestone 5

**Tasks**:
1. Write tests for line clearing algorithm
2. Implement line detection and row removal
3. Implement row shifting
4. Write tests for score calculation
5. Implement scoring rules (100/300/500/800 points)
6. Implement soft drop and hard drop scoring
7. Update score display in renderer

**Deliverable**: Complete line clearing and scoring system

**Verification**: Integration test - fill rows, verify they clear and score updates correctly

---

### Milestone 7: Levels & Speed Progression
**Duration**: 2-3 hours  
**Dependencies**: Milestone 6

**Tasks**:
1. Write tests for level progression logic
2. Implement level calculation (lines cleared / 10)
3. Implement fall speed formula
4. Update level display in renderer
5. Test speed increases at various levels

**Deliverable**: Progressive difficulty system working

**Verification**: Integration test - clear 10 lines, verify level increases and speed changes

---

### Milestone 8: Pause & Game States
**Duration**: 2-3 hours  
**Dependencies**: Milestone 7

**Tasks**:
1. Implement pause/unpause logic
2. Add pause overlay UI
3. Implement restart functionality
4. Add game-over overlay with score display
5. Wire up restart button
6. Test state transitions (playing ↔ paused, game over → restart)

**Deliverable**: Complete game state management

**Verification**: Manual test - pause during gameplay, restart after game over, verify state preservation

---

### Milestone 9: Polish & Visual Improvements
**Duration**: 4-6 hours  
**Dependencies**: Milestone 8

**Tasks**:
1. Add line-clear animation (flash effect)
2. Add piece-lock visual feedback
3. Improve color scheme and contrast
4. Add visual distinction (borders, shading) for active vs locked pieces
5. Polish CSS (spacing, typography, responsiveness)
6. Add focus indicators for accessibility
7. Test responsiveness across desktop resolutions

**Deliverable**: Polished, production-ready UI

**Verification**: Manual testing on different screen sizes, verify animations smooth at 60 FPS

---

### Milestone 10: Final Testing & Optimization
**Duration**: 4-6 hours  
**Dependencies**: Milestone 9

**Tasks**:
1. Run full test suite, achieve 80%+ coverage
2. Performance profiling (Chrome DevTools)
3. Memory leak detection (play for 1000+ moves)
4. Cross-browser testing (Chrome, Firefox, Safari, Edge)
5. Accessibility audit (keyboard-only gameplay)
6. Code review and refactoring
7. Update README with gameplay instructions
8. Create quickstart.md documentation

**Deliverable**: Production-ready, fully tested Tetris game

**Verification**: All tests pass, performance targets met (60 FPS, <50ms latency), works in all target browsers

---

## Implementation Effort Summary

| Milestone | Duration | Cumulative | Priority |
|-----------|----------|------------|----------|
| 1. Skeleton & Setup | 2-4 hours | 2-4 hours | P1 |
| 2. Board & Tetromino | 4-6 hours | 6-10 hours | P1 |
| 3. Rendering System | 3-4 hours | 9-14 hours | P1 |
| 4. Game Loop & Input | 4-6 hours | 13-20 hours | P1 |
| 5. Rotation & Collision | 4-6 hours | 17-26 hours | P2 |
| 6. Line Clearing & Scoring | 3-4 hours | 20-30 hours | P1 |
| 7. Levels & Speed | 2-3 hours | 22-33 hours | P3 |
| 8. Pause & Game States | 2-3 hours | 24-36 hours | P5 |
| 9. Polish & Visual | 4-6 hours | 28-42 hours | P4 |
| 10. Final Testing | 4-6 hours | 32-48 hours | All |

**Total Estimated Effort**: 32-48 hours (4-6 working days for single developer)

**MVP Milestone** (Milestones 1-6): 20-30 hours - delivers fully playable Tetris with scoring

---

## Performance Optimization Strategy

### Rendering Optimization

**Current Strategy** (Milestone 3): Render full board every frame
- Sufficient for 200 cells at 60 FPS
- Simple implementation

**If Performance Issues Arise**:
1. Dirty rectangle: Track changed regions, only redraw those
2. Offscreen canvas: Pre-render piece shapes, blit to main canvas
3. Layer separation: Static board on one canvas, active piece on overlay

### Memory Optimization

**Object Pooling**:
```javascript
// Reuse Tetromino objects instead of creating new ones
class PiecePool {
  constructor() {
    this.pool = this.createPool();
  }
  
  createPool() {
    const pool = {};
    for (const type of ['I', 'O', 'T', 'S', 'Z', 'J', 'L']) {
      pool[type] = new Tetromino(type);
    }
    return pool;
  }
  
  getPiece(type) {
    const piece = this.pool[type];
    piece.reset(); // Reset position and rotation
    return piece;
  }
}
```

### Event Listener Cleanup

```javascript
// Prevent memory leaks
class GameEngine {
  pause() {
    this.state.setState('PAUSED');
    this.input.disableListeners(); // Remove event listeners
  }
  
  resume() {
    this.input.enableListeners(); // Re-add event listeners
    this.state.setState('PLAYING');
  }
  
  destroy() {
    this.input.destroy(); // Clean up all listeners
    cancelAnimationFrame(this.animationFrameId);
  }
}
```

---

## Testing Strategy

### Unit Tests (70% of test effort)

**Board Module**:
- Grid initialization
- Collision detection (boundaries, pieces)
- Piece locking
- Line clearing (single, multiple, none)
- Reset functionality

**Tetromino Module**:
- Shape definitions correct
- Rotation logic (90° transform)
- Wall-kick offset lookup
- Piece factory

**PieceQueue Module**:
- Bag initialization
- Shuffle randomness
- Piece retrieval
- Bag refill

**State Module**:
- Score calculation
- Level progression
- Fall speed formula
- State transitions

### Integration Tests (20% of test effort)

**Gameplay Loop**:
- Spawn → Move → Lock → Clear → Spawn cycle
- Multiple lines cleared simultaneously
- Score/level updates after line clears

**Collision Scenarios**:
- Piece movement blocked by boundaries
- Piece movement blocked by locked pieces
- Rotation blocked by obstacles
- Wall-kick successful rotation

**Level Progression**:
- Level increases every 10 lines
- Fall speed changes with level
- Speed doesn't exceed minimum (100ms)

**Pause/Resume**:
- State preserved during pause
- Game resumes correctly
- Input blocked while paused

### Contract Tests (10% of test effort)

**API Contracts**:
- Board module API (see contracts/board.contract.md)
- Tetromino module API
- GameEngine module API
- All public methods return correct types
- Pre/postconditions verified

### Manual Testing Checklist

**Functionality**:
- [ ] All 7 pieces spawn and look correct
- [ ] Pieces move left/right/down
- [ ] Pieces rotate (including wall-kicks)
- [ ] Pieces lock when they hit bottom/pieces
- [ ] Lines clear when complete
- [ ] Score updates correctly
- [ ] Level increases every 10 lines
- [ ] Game speeds up with levels
- [ ] Game over when pieces stack to top
- [ ] Pause/resume works
- [ ] Restart resets everything

**Performance**:
- [ ] Maintains 60 FPS during gameplay
- [ ] Input latency <50ms
- [ ] Line clear processing <100ms
- [ ] No visual stuttering
- [ ] No memory leaks after 1000 moves

**Cross-Browser**:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

**Accessibility**:
- [ ] Keyboard-only gameplay works
- [ ] High contrast mode readable
- [ ] Focus indicators visible

---

## Deployment & Distribution

**Development Server**:
- Simple HTTP server: 
px serve .
- or Python: python -m http.server 8000

**Production Build**:
- No build step needed (vanilla JavaScript)
- Optional: Minify JS/CSS with tools like Terser, cssnano
- Optional: Bundle modules with esbuild or Rollup

**Hosting Options**:
- GitHub Pages (free static hosting)
- Netlify (free tier)
- Vercel (free tier)
- Any static file host

**Browser Compatibility**:
- Requires ES6+ support (no transpilation)
- Target: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- No polyfills needed

---

## Future Enhancements (Out of Scope)

**Audio** (P6 priority):
- Background music
- Sound effects (move, rotate, lock, line clear, game over)

**Extended Features** (P7 priority):
- Hold piece functionality
- Ghost piece (preview of drop position)
- High score persistence (LocalStorage)
- Multiple game modes (Sprint, Ultra)
- Touch controls for mobile

**Advanced Features** (P8 priority):
- Multiplayer (WebSocket)
- Online leaderboards (requires backend)
- Customizable themes
- Particle effects

---

## Risk Mitigation

**Risk**: Rotation system too complex
- **Mitigation**: Start with simple rotation (no wall-kicks), add wall-kicks in Milestone 5
- **Fallback**: Use simpler rotation system if SRS proves too difficult

**Risk**: Performance issues on older devices
- **Mitigation**: Profile early (Milestone 4), optimize before polish phase
- **Fallback**: Reduce canvas size, limit visual effects

**Risk**: Cross-browser compatibility issues
- **Mitigation**: Test on target browsers after each milestone
- **Fallback**: Document known issues, recommend specific browsers

**Risk**: Testing takes longer than estimated
- **Mitigation**: Implement TDD from start, write tests alongside code
- **Fallback**: Prioritize integration tests over exhaustive unit tests

---

## Success Criteria Mapping

| Success Criterion | Implementation Plan | Verification Method |
|-------------------|---------------------|---------------------|
| SC-001: Start game within 1s | Milestone 4 (game loop) | Manual timing test |
| SC-002: Equal piece frequency | Milestone 2 (bag randomizer) | Unit test (100 pieces) |
| SC-003: <50ms input latency | Milestone 4 (input handling) | Performance profiling |
| SC-004: <100ms line clear | Milestone 6 (line clearing) | Performance test |
| SC-005: 60 FPS | Milestones 3-4 (rendering & loop) | Chrome DevTools FPS meter |
| SC-006: Clear line in 60s | Milestone 1-6 (full gameplay) | Manual playtest |
| SC-007: 100% collision prevention | Milestone 5 (collision) | Integration tests |
| SC-008: Game-over accuracy | Milestone 4 (game over detection) | Integration test |
| SC-009: Speed increases | Milestone 7 (levels) | Unit test (level formula) |
| SC-010: Pause preserves state | Milestone 8 (pause) | Integration test |
| SC-011: 80% clear line in 2min | Milestone 1-9 (full polish) | User testing |
| SC-012: 100% preview accuracy | Milestone 2 (piece queue) | Unit test |

---

## Conclusion

This implementation plan provides a comprehensive, detailed roadmap for building a standards-compliant, maintainable Tetris game using vanilla HTML/CSS/JavaScript. The plan:

✅ Meets all constitutional requirements (code quality, testing, UX, performance)
✅ Addresses all 55 functional requirements from spec.md
✅ Provides incremental milestones with clear verification criteria
✅ Estimates realistic effort (32-48 hours)
✅ Includes comprehensive architecture and module design
✅ Specifies testing strategy with concrete test cases
✅ Documents performance optimization strategies
✅ Maps success criteria to implementation and verification methods

**Ready for Phase 2**: The plan is complete and ready to be converted to tasks using /speckit.tasks.

