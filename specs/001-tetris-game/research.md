# Research: Tetris Game Implementation

**Feature**: Tetris Game Application  
**Phase**: 0 (Research & Technology Selection)  
**Date**: 2025-11-28

## Technology Stack Decision

### Primary Language: JavaScript ES6+

**Decision**: Use vanilla JavaScript (ES6+) without frameworks

**Rationale**:
- **Browser Native**: No compilation or transpilation needed for modern browsers
- **Performance**: Direct DOM/Canvas manipulation without framework overhead
- **Simplicity**: Tetris game logic is straightforward, doesn't benefit from React/Vue complexity
- **Learning Curve**: Easier for developers familiar with basic JavaScript
- **Bundle Size**: <50KB total JavaScript vs >100KB for minimal React app
- **Standards Compliance**: Modern ES6+ features (classes, modules, arrow functions) well-supported

**Alternatives Considered**:
- **React**: Rejected - unnecessary complexity and overhead for simple game loop
- **TypeScript**: Rejected - adds build step, overkill for ~2000 lines of code
- **Canvas2D API**: Considered alongside DOM rendering (see rendering section)

### Rendering Strategy: HTML5 Canvas

**Decision**: Use HTML5 Canvas 2D API for game board rendering

**Rationale**:
- **Performance**: 60 FPS rendering of 200 cells (10x20 grid) with minimal overhead
- **Flexibility**: Easy to draw shapes, apply colors, animate effects
- **Control**: Pixel-perfect rendering without CSS layout complexity
- **Standard**: Well-supported Canvas 2D API (no WebGL complexity needed)

**Alternatives Considered**:
- **DOM Grid (div elements)**: Rejected - 200 DOM elements cause layout thrashing, hard to achieve 60 FPS
- **SVG**: Rejected - overkill for rectangular grid, worse performance than Canvas
- **WebGL**: Rejected - unnecessary complexity for 2D game

**Implementation Approach**:
- Single `<canvas>` element for game board
- Render full board on each frame (simple, performant for 10x20 grid)
- DOM elements for UI (score, level, next-piece preview) updated via JavaScript
- RequestAnimationFrame for smooth 60 FPS rendering loop

### Tetromino Rotation System: Super Rotation System (SRS)

**Decision**: Implement Super Rotation System (SRS) with wall kicks

**Rationale**:
- **Standard**: Official Tetris Guideline system used by modern Tetris games
- **Player Expectations**: Players expect pieces to rotate near walls/obstacles
- **Fairness**: Wall kicks reduce frustrating "stuck" situations
- **Complexity**: Moderate - requires rotation offset tables but well-documented

**Resources**:
- [Tetris Wiki: Super Rotation System](https://tetris.wiki/Super_Rotation_System)
- [Rotation matrices and wall-kick data](https://tetris.wiki/SRS)

**Implementation Notes**:
- Each piece has 4 rotation states (0°, 90°, 180°, 270°)
- Wall-kick attempts: Try rotation at current position, then 4 offset positions
- I-piece has special wall-kick data (horizontal bias)
- O-piece doesn't rotate (4x4 bounding box, stays centered)

### Piece Randomization: Bag System

**Decision**: Use "bag" randomization (Random Generator from Tetris Guideline)

**Rationale**:
- **Fairness**: Guarantees all 7 pieces appear before any repeat
- **Predictability**: Players won't experience long droughts or floods
- **Standard**: Modern Tetris games use this system
- **Simplicity**: Easy to implement with array shuffle

**Algorithm**:
1. Create bag with all 7 pieces: [I, O, T, S, Z, J, L]
2. Shuffle bag using Fisher-Yates algorithm
3. Pop pieces from bag in order
4. When bag empty, refill and shuffle again

**Alternatives Considered**:
- **Pure Random**: Rejected - can cause frustrating droughts (e.g., 50 pieces without I-piece)
- **History-based**: Rejected - overly complex, marginal benefit

### Game Loop Timing: requestAnimationFrame

**Decision**: Use `requestAnimationFrame` for rendering, `Date.now()` for game logic timing

**Rationale**:
- **60 FPS**: requestAnimationFrame syncs with browser refresh rate (typically 60 Hz)
- **Efficient**: Browser pauses loop when tab inactive (saves CPU/battery)
- **Smooth**: Built-in frame pacing, no manual interval management
- **Standard**: Modern best practice for animation loops

**Implementation Pattern**:
```javascript
let lastTime = 0;
let accumulator = 0;
const FIXED_TIME_STEP = 16.67; // 60 FPS

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  accumulator += deltaTime;
  
  // Fixed time step updates (physics, gravity)
  while (accumulator >= FIXED_TIME_STEP) {
    updateGame(FIXED_TIME_STEP);
    accumulator -= FIXED_TIME_STEP;
  }
  
  // Render current state
  render();
  
  requestAnimationFrame(gameLoop);
}
```

**Alternatives Considered**:
- **setInterval**: Rejected - imprecise timing, not synced with display refresh, continues when tab inactive
- **setTimeout recursive**: Rejected - similar issues to setInterval

### Fall Speed Formula

**Decision**: Use formula from specification: `fall_interval = 1000ms - (level * 50ms)` with minimum 100ms

**Rationale**:
- **Progressive Difficulty**: Linear increase in difficulty is intuitive
- **Playability**: Level 1 (1000ms) is beginner-friendly, Level 18+ (100ms) is expert-level
- **Simple**: Easy to implement and understand
- **Testable**: Deterministic formula enables automated testing

**Level Progression**:
- Level 1: 1000ms per row (1.0 rows/second)
- Level 5: 750ms per row (1.33 rows/second)
- Level 10: 500ms per row (2.0 rows/second)
- Level 18+: 100ms per row (10 rows/second) - maximum speed

### Testing Framework: Jest

**Decision**: Use Jest for unit, integration, and contract tests

**Rationale**:
- **Zero Config**: Works out-of-box for JavaScript projects
- **Fast**: Parallel test execution, intelligent test watching
- **Complete**: Built-in assertion library, mocking, coverage reporting
- **Popular**: Large community, extensive documentation, active maintenance

**Configuration**:
- Jest 29+ (latest stable)
- jsdom environment for DOM testing
- Coverage threshold: 80% for critical modules (board, tetromino, game-engine)

**Alternatives Considered**:
- **Mocha + Chai**: Rejected - requires more configuration, separate assertion library
- **Vitest**: Rejected - newer, less mature, Jest compatibility issues

### Code Quality Tools

**ESLint Configuration**:
- Base: `eslint:recommended` + `airbnb-base` (without React rules)
- Rules: Enforce single quotes, 2-space indent, semicolons, max line length 100
- Plugins: None needed (vanilla JavaScript)

**Prettier Configuration**:
- Single quotes, trailing commas (es5), 2-space indent
- Integrated with ESLint via `eslint-config-prettier`

**Pre-commit Hooks**:
- Husky + lint-staged to run ESLint + Prettier on staged files
- Prevents committing code that fails linting

### Performance Optimization Strategies

**Rendering Optimization**:
- **Dirty Rectangle**: Only redraw changed regions (optional optimization if needed)
- **Offscreen Canvas**: Pre-render piece shapes (optional, likely not needed)
- **Request Animation Frame**: Built-in frame pacing prevents over-rendering

**Memory Optimization**:
- **Object Pooling**: Reuse piece objects instead of creating new ones each spawn
- **Event Listener Cleanup**: Remove listeners on pause/game-over to prevent leaks
- **Avoid Closures**: Use class methods instead of nested functions where possible

**Algorithm Optimization**:
- **Collision Detection**: O(4) constant time (check 4 cells of active piece)
- **Line Clearing**: O(height * width) = O(20 * 10) = O(200) constant time
- **Rotation**: O(1) lookup in rotation offset table

### Browser Compatibility

**Target Browsers** (ES6+ support required):
- Chrome 90+ (April 2021)
- Firefox 88+ (April 2021)
- Safari 14+ (September 2020)
- Edge 90+ (April 2021)

**Required Features**:
- ES6 Classes, Arrow Functions, Template Literals
- Canvas 2D API
- requestAnimationFrame
- ES6 Modules (import/export)
- Local Storage (for future high scores)

**Polyfills**: None needed (all target browsers support required features)

### Accessibility Considerations

**Keyboard Controls**:
- All gameplay via keyboard (arrow keys, spacebar, P for pause)
- No mouse required (exceeds WCAG keyboard accessibility requirement)

**Visual Accessibility**:
- High-contrast colors for pieces (meets WCAG AA contrast ratio)
- Clear visual distinction between active and locked pieces
- Large, readable fonts for score/level display

**Future Enhancements** (out of scope for MVP):
- Screen reader announcements for score/level changes (ARIA live regions)
- Colorblind mode with pattern overlays on pieces
- Adjustable speed/difficulty settings

## Research Summary

All technology decisions have been made with concrete rationale. No NEEDS CLARIFICATION items remain. The stack (vanilla ES6+, Canvas 2D, Jest) is well-suited for a maintainable, performant Tetris implementation that meets all constitutional requirements and specification success criteria.

**Next Steps**: Proceed to Phase 1 (Design) to create data model and module contracts.
