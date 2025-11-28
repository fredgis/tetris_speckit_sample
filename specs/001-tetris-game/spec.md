# Feature Specification: Tetris Game Application

**Feature Branch**: `001-tetris-game`  
**Created**: 2025-11-28  
**Status**: Draft  
**Input**: User description: "Create a full Tetris application with grid-based game board, Tetrimino pieces, collision detection, line-clearing, scoring, levels, and responsive UI"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Gameplay Loop (Priority: P1)

A player launches the game, sees pieces falling down the game board, and can move and rotate them to form complete lines. When a line is completed, it clears and the score increases. This is the fundamental Tetris experience that makes the game playable.

**Why this priority**: This is the absolute core of Tetris - without falling pieces, movement, rotation, and line clearing, there is no game. This story delivers the minimum viable Tetris experience and can be played and enjoyed on its own.

**Independent Test**: Can be fully tested by launching the game, controlling a single piece (left, right, down, rotate), completing a line, and verifying it clears. Delivers a playable, albeit basic, Tetris game.

**Acceptance Scenarios**:

1. **Given** the game starts, **When** a player views the game board, **Then** a 10x20 grid is displayed with a Tetrimino piece appearing at the top center
2. **Given** a piece is falling, **When** the player presses left/right arrow keys, **Then** the piece moves horizontally one cell in the pressed direction (if space available)
3. **Given** a piece is falling, **When** the player presses the up arrow key, **Then** the piece rotates 90 degrees clockwise (if space available)
4. **Given** a piece is falling, **When** the player presses the down arrow key, **Then** the piece moves down faster (accelerated drop)
5. **Given** a piece is falling, **When** 1 second passes without input, **Then** the piece automatically moves down one row (gravity)
6. **Given** a piece reaches the bottom or lands on another piece, **When** it can no longer move down, **Then** it locks in place and a new random piece appears at the top
7. **Given** pieces are locked on the board, **When** a horizontal row is completely filled, **Then** that row disappears and all rows above it shift down by one
8. **Given** a row clears, **When** the player views the score, **Then** the score increases by 100 points per line cleared

---

### User Story 2 - Collision Detection & Game Over (Priority: P2)

A player experiences realistic collision behavior where pieces cannot pass through walls, floor, or other locked pieces. When pieces stack to the top, the game ends with a clear game-over state and option to restart.

**Why this priority**: Collision detection makes the game challenging and fair. Without it, pieces could overlap or move through boundaries, breaking the core game mechanics. Game-over detection provides win/loss conditions essential for replayability.

**Independent Test**: Can be tested independently by attempting to move pieces outside boundaries (should block), rotating pieces against walls (should prevent invalid rotations), filling the board to the top (should trigger game over), and clicking restart (should reset to initial state).

**Acceptance Scenarios**:

1. **Given** a piece is at the left edge, **When** the player presses left arrow, **Then** the piece does not move (boundary collision)
2. **Given** a piece is at the right edge, **When** the player presses right arrow, **Then** the piece does not move (boundary collision)
3. **Given** a piece is adjacent to a locked piece, **When** the player attempts to move into the locked piece, **Then** the movement is blocked (piece collision)
4. **Given** a piece is near a wall, **When** the player attempts to rotate into the wall, **Then** the rotation is blocked or the piece is wall-kicked to a valid position
5. **Given** a new piece appears, **When** there is insufficient space at the top (blocked by locked pieces), **Then** the game enters a game-over state
6. **Given** the game is over, **When** the player views the screen, **Then** a "Game Over" message displays with the final score
7. **Given** the game is over, **When** the player clicks "Restart" or presses a key, **Then** the board clears, score resets, and a new game begins

---

### User Story 3 - Progressive Difficulty & Levels (Priority: P3)

As a player clears more lines, the game speed increases through levels, making the game progressively more challenging. The current level is displayed, and players feel a sense of progression and increasing mastery required.

**Why this priority**: Progressive difficulty is what makes Tetris engaging long-term. Without it, the game becomes monotonous. This feature adds replay value and skill ceiling, but the game is still playable and enjoyable without it (at a constant speed).

**Independent Test**: Can be tested independently by clearing 10 lines and verifying the level increases from 1 to 2 and the fall speed increases. The game remains playable without this feature (just at constant speed).

**Acceptance Scenarios**:

1. **Given** the game starts, **When** the player views the UI, **Then** the level displays as "Level 1"
2. **Given** the player is at Level 1, **When** 10 lines are cleared, **Then** the level increases to Level 2
3. **Given** the level increases, **When** pieces begin falling, **Then** the automatic fall speed decreases by 10% (pieces fall faster)
4. **Given** the player reaches Level 10, **When** pieces are falling, **Then** the fall interval is significantly faster than Level 1 (approximately 50% faster)
5. **Given** the player clears multiple lines simultaneously, **When** the score is calculated, **Then** bonus points are awarded (2 lines = 300pts, 3 lines = 500pts, 4 lines "Tetris" = 800pts)

---

### User Story 4 - Next Piece Preview & Visual Polish (Priority: P4)

Players can see which piece is coming next in a preview window, allowing strategic planning. The UI includes clear visual distinction between active pieces, locked pieces, and empty cells with smooth animations and responsive visual feedback.

**Why this priority**: The next-piece preview is a standard Tetris feature that improves strategic gameplay but isn't essential for basic play. Visual polish improves user experience but the game is functional without animations.

**Independent Test**: Can be tested by viewing the next-piece preview area and verifying it shows the upcoming piece, then confirming that piece appears as the active piece after the current one locks. Visual polish can be tested by observing animations during line clears and piece movements.

**Acceptance Scenarios**:

1. **Given** the game is running, **When** the player views the UI, **Then** a "Next Piece" preview box displays the next Tetrimino piece
2. **Given** the current piece locks, **When** a new piece appears, **Then** the piece shown in the preview becomes the active piece and the preview updates with the next random piece
3. **Given** pieces are on the board, **When** the player views the board, **Then** active pieces are visually distinct from locked pieces (e.g., different colors, borders, or shading)
4. **Given** a line is completed, **When** it clears, **Then** a brief visual animation plays (e.g., flash, fade out) before rows shift down
5. **Given** a piece locks, **When** it settles, **Then** a subtle visual feedback indicates the lock (e.g., brief color change or border highlight)
6. **Given** the game is paused, **When** the player views the board, **Then** all animations freeze and a "Paused" overlay appears

---

### User Story 5 - Pause & Game Controls (Priority: P5)

Players can pause and resume the game at any time, allowing them to take breaks without losing progress. The game provides clear instructions for controls and pause functionality.

**Why this priority**: Pause functionality is a quality-of-life feature that improves user experience but isn't required for basic gameplay. It's prioritized after core mechanics are proven working.

**Independent Test**: Can be tested independently by starting a game, pressing pause (P key or button), verifying the game freezes, then pressing pause again to verify the game resumes exactly where it left off.

**Acceptance Scenarios**:

1. **Given** the game is running, **When** the player presses the 'P' key or clicks a Pause button, **Then** the game pauses (pieces stop falling, timer stops, controls are disabled)
2. **Given** the game is paused, **When** the player presses 'P' again or clicks Resume, **Then** the game resumes from the exact state it was paused
3. **Given** the game is paused, **When** the player views the screen, **Then** a "Paused" message and controls reminder are displayed
4. **Given** the game starts, **When** the player views the UI, **Then** a controls legend is visible (arrow keys for movement/rotation, P for pause, spacebar for hard drop)
5. **Given** a piece is falling, **When** the player presses spacebar, **Then** the piece instantly drops to the lowest valid position and locks immediately (hard drop)

---

### Edge Cases

- **What happens when multiple lines are cleared simultaneously?** System awards bonus points (1 line = 100pts, 2 lines = 300pts, 3 lines = 500pts, 4 lines "Tetris" = 800pts) and level progression counts each cleared line individually
- **What happens when a piece cannot rotate due to obstacles?** System attempts wall-kick (shifting the piece left or right to allow rotation); if impossible, the rotation is blocked and the piece remains in its current orientation
- **What happens when the player repeatedly presses down arrow (soft drop)?** System accelerates the fall speed for as long as the key is held, then returns to normal speed when released; player earns 1 point per cell of accelerated drop
- **What happens when the level increases during an active piece?** The new fall speed applies to the current piece immediately after the next natural fall tick
- **What happens if the player pauses during a line-clearing animation?** The animation completes first, then the game pauses before the next piece spawns
- **What happens when the game board is partially filled at startup?** The game always starts with an empty board (unless implementing a challenge mode, which is out of scope)
- **What happens when two pieces would occupy the same cell?** This is prevented by collision detection; pieces cannot move or rotate into occupied spaces
- **What happens if the player loses internet connection (if online)** Game is designed for offline desktop play; no internet connectivity required

## Requirements *(mandatory)*

### Functional Requirements

**Game Board & Pieces**
- **FR-001**: System MUST render a 10-column by 20-row rectangular grid representing the game board
- **FR-002**: System MUST generate seven distinct Tetrimino shapes (I, O, T, S, Z, J, L) following official Tetris design
- **FR-003**: System MUST randomly select pieces for spawn using a shuffled bag system (all 7 pieces appear once before any repeat)
- **FR-004**: System MUST spawn each new piece at the top-center of the board (columns 4-5) in default orientation
- **FR-005**: System MUST visually distinguish each piece type with distinct colors (I=cyan, O=yellow, T=purple, S=green, Z=red, J=blue, L=orange)

**Movement & Controls**
- **FR-006**: System MUST move the active piece left when the left arrow key is pressed
- **FR-007**: System MUST move the active piece right when the right arrow key is pressed
- **FR-008**: System MUST rotate the active piece 90° clockwise when the up arrow key is pressed
- **FR-009**: System MUST accelerate the active piece's fall speed when the down arrow key is held (soft drop)
- **FR-010**: System MUST instantly drop the active piece to the lowest valid position when spacebar is pressed (hard drop)
- **FR-011**: System MUST automatically move the active piece down one row at regular intervals (gravity)
- **FR-012**: System MUST be playable using only keyboard controls (no mouse required for gameplay)

**Collision & Physics**
- **FR-013**: System MUST prevent pieces from moving outside the left boundary (column 0)
- **FR-014**: System MUST prevent pieces from moving outside the right boundary (column 9)
- **FR-015**: System MUST prevent pieces from moving below the bottom boundary (row 19)
- **FR-016**: System MUST prevent pieces from moving into or through cells occupied by locked pieces
- **FR-017**: System MUST prevent rotations that would result in cells occupying invalid positions (boundaries or locked pieces)
- **FR-018**: System MUST attempt wall-kick adjustments (horizontal shift) when rotation is blocked
- **FR-019**: System MUST lock a piece in place when it cannot move down further (bottom reached or collision below)
- **FR-020**: System MUST spawn a new piece immediately after the previous piece locks

**Line Clearing & Scoring**
- **FR-021**: System MUST detect when all 10 cells in a horizontal row are occupied by locked pieces
- **FR-022**: System MUST remove all complete rows from the board (line clear)
- **FR-023**: System MUST shift all rows above a cleared line down by one row
- **FR-024**: System MUST handle multiple simultaneous line clears (up to 4 lines at once)
- **FR-025**: System MUST award 100 points for clearing 1 line
- **FR-026**: System MUST award 300 points for clearing 2 lines simultaneously
- **FR-027**: System MUST award 500 points for clearing 3 lines simultaneously
- **FR-028**: System MUST award 800 points for clearing 4 lines simultaneously (Tetris)
- **FR-029**: System MUST award 1 point per cell for soft drop distance (down arrow acceleration)
- **FR-030**: System MUST award 2 points per cell for hard drop distance (spacebar instant drop)
- **FR-031**: System MUST display the current score prominently in the UI
- **FR-032**: System MUST update the score display immediately after points are awarded

**Levels & Difficulty**
- **FR-033**: System MUST start the game at Level 1
- **FR-034**: System MUST increment the level by 1 for every 10 lines cleared (cumulative)
- **FR-035**: System MUST decrease the automatic fall interval (increase speed) as level increases
- **FR-036**: System MUST apply the formula: fall_interval = 1000ms - (level * 50ms) with minimum 100ms at level 18+
- **FR-037**: System MUST display the current level prominently in the UI

**Game State Management**
- **FR-038**: System MUST detect game-over condition when a new piece cannot spawn (top rows occupied)
- **FR-039**: System MUST halt all game activity when game-over is detected (no falling, no input)
- **FR-040**: System MUST display "Game Over" message and final score when game ends
- **FR-041**: System MUST provide a restart/play-again option when game is over
- **FR-042**: System MUST reset board, score, level, and piece queue when restarting
- **FR-043**: System MUST support pause functionality (P key or button)
- **FR-044**: System MUST freeze all game activity when paused (pieces stop, timer stops, no input except unpause)
- **FR-045**: System MUST display "Paused" indicator when game is paused
- **FR-046**: System MUST resume from exact saved state when unpaused

**UI & Display**
- **FR-047**: System MUST display a "Next Piece" preview showing the upcoming Tetrimino
- **FR-048**: System MUST update the next piece preview when the current piece locks
- **FR-049**: System MUST display controls instructions (keyboard legend) on screen or in help menu
- **FR-050**: System MUST provide visual distinction between active pieces and locked pieces
- **FR-051**: System MUST provide visual distinction between occupied cells and empty cells
- **FR-052**: System MUST display game title and branding
- **FR-053**: System MUST be responsive and maintain consistent frame rate (target 60 FPS minimum)
- **FR-054**: System MUST provide visual feedback for line clears (animation or flash)
- **FR-055**: System MUST be optimized for desktop display (minimum 800x600 resolution)

### Key Entities

- **Game Board**: A 10x20 grid structure representing the play area. Contains cells that can be empty or occupied by locked pieces. Stores the permanent state of locked pieces after they stop falling.

- **Tetrimino Piece**: A game piece composed of 4 connected cells forming one of seven shapes (I, O, T, S, Z, J, L). Has properties: shape type, rotation state (0°, 90°, 180°, 270°), current position (x, y coordinates), color. Can be in active state (falling, controllable) or locked state (permanent, part of board).

- **Active Piece**: The currently falling Tetrimino that the player controls. Has position, rotation, and responds to input. Only one active piece exists at a time.

- **Piece Queue**: An ordered list of upcoming Tetrimino pieces generated using the shuffled bag algorithm. Ensures fair randomization (all 7 pieces appear once before repeats).

- **Score**: Integer value representing player performance. Increases based on lines cleared, soft drops, and hard drops. Persists across the game session, resets on restart.

- **Level**: Integer value representing game difficulty progression. Starts at 1, increases every 10 lines cleared. Affects the fall speed of pieces.

- **Game State**: Enumerated state of the game (Playing, Paused, GameOver). Determines which systems are active and which inputs are valid.

- **Cell**: Individual unit in the game board grid. Can be empty or occupied. If occupied, stores color information for rendering. Located at specific row and column coordinates.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Players can successfully start a new game and see a Tetrimino piece falling within 1 second of game launch
- **SC-002**: All seven Tetrimino pieces (I, O, T, S, Z, J, L) appear with equal frequency over 100 pieces (14±2 occurrences each)
- **SC-003**: Players can control pieces with keyboard input with less than 50ms latency between key press and visual movement
- **SC-004**: Line clears are detected and processed within 100ms of completion with visual feedback visible
- **SC-005**: Game maintains 60 FPS frame rate on desktop systems with at least 4GB RAM and integrated graphics
- **SC-006**: Players can complete at least one line and observe score increase within first 60 seconds of play (basic gameplay validation)
- **SC-007**: Collision detection prevents 100% of invalid moves (no pieces pass through walls or locked pieces)
- **SC-008**: Game-over condition triggers accurately when pieces stack to row 0 (top of board)
- **SC-009**: Game speed increases measurably as levels progress (Level 10 fall speed is at least 30% faster than Level 1)
- **SC-010**: Players can pause and resume the game without loss of game state or position
- **SC-011**: Controls are intuitive enough that 80% of new players can successfully clear at least one line within 2 minutes without instruction
- **SC-012**: Next-piece preview accuracy is 100% (piece shown always matches the next piece that spawns)

### Assumptions

- **Technology Platform**: Web-based implementation (HTML/CSS/JavaScript) is assumed as it provides widest compatibility and requires no installation. If other platforms are preferred (React, Python+Pygame, Unity), the specification remains valid but implementation approach will differ.
- **Target Audience**: Casual and nostalgic players familiar with classic Tetris. Assumes players have basic computer literacy (can use arrow keys).
- **Piece Randomization**: Using "bag" randomization system (standard in modern Tetris) rather than pure random, which is more fair and reduces frustrating droughts/floods of specific pieces.
- **Rotation System**: Using Super Rotation System (SRS) with wall-kicks as the standard for piece rotation behavior, which is the most widely accepted modern Tetris standard.
- **Color Scheme**: Using standard Tetris Guideline colors for pieces (established by The Tetris Company) for familiarity.
- **Scoring System**: Using simplified scoring based on classic Tetris guidelines (100/300/500/800 for 1-4 lines).
- **Desktop-First**: Designed primarily for keyboard controls on desktop; mobile touch controls are out of scope for this specification.
- **Single-Player**: Multiplayer, online leaderboards, and social features are out of scope.
- **Persistence**: High scores and game state do not persist between sessions (no save system); each session is independent.
- **Audio**: Sound effects and music are considered optional polish features and not specified as requirements.
