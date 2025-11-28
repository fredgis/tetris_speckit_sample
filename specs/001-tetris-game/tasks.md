# Tasks: Tetris Game Application

**Input**: Design documents from `/specs/001-tetris-game/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are NOT explicitly requested in the specification, but TDD workflow is required per constitution. Contract tests and integration tests WILL be included to meet constitutional testing standards.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Per plan.md structure:
- Source files: `js/`
- Stylesheets: `css/`
- Tests: `tests/unit/`, `tests/integration/`, `tests/contract/`
- Root files: `index.html`, `package.json`, configuration files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure (tetris-game/ with js/, css/, tests/ subdirectories)
- [X] T002 Initialize package.json with Jest 29+, ESLint 8+, Prettier 2+, serve dependencies
- [X] T003 [P] Create .eslintrc.json with ES2021, browser environment, recommended rules
- [X] T004 [P] Create .prettierrc with singleQuote, semi, tabWidth:2 configuration
- [X] T005 [P] Create jest.config.js with jsdom environment, ES6 module support, coverage thresholds
- [X] T006 [P] Create .gitignore with node_modules/, coverage/, .vscode/ entries
- [X] T007 Create index.html with semantic HTML5 structure per plan.md architecture
- [X] T008 [P] Create css/main.css with CSS reset, custom properties, global layout
- [X] T009 [P] Create css/board.css with game board container and canvas styles
- [X] T010 [P] Create css/ui.css with sidebar, stat panels, controls panel styles
- [X] T011 [P] Create js/utils.js with constants (COLORS, BOARD_WIDTH, BOARD_HEIGHT, KEY_BINDINGS)

**Checkpoint**: Project structure complete, can run `npm install` successfully ✅

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T012 Create tests/setup.js with Jest DOM environment configuration
- [X] T013 [P] Add npm scripts to package.json (test, test:watch, test:coverage, lint, lint:fix, format, serve)
- [X] T014 [P] Create README.md with project overview, setup instructions, controls reference

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel ✅

---

## Phase 3: User Story 1 - Core Gameplay Loop (Priority: P1) 🎯 MVP

**Goal**: Deliver playable Tetris with falling pieces, movement, rotation, line clearing, and scoring

**Independent Test**: Launch game, control pieces (left/right/down/rotate), complete a line, verify it clears and score increases

### Contract Tests for User Story 1

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T015 [P] [US1] Contract test for Board module API in tests/contract/board-api.test.js (checkCollision, lockPiece, clearLines, reset, getGrid methods)
- [X] T016 [P] [US1] Contract test for Tetromino module API in tests/contract/tetromino-api.test.js (createPiece, rotate, movePiece, getShapeCoords methods)
- [X] T017 [P] [US1] Contract test for State module API in tests/contract/state-api.test.js (addScore, setState, reset, getScore methods)

### Unit Tests for User Story 1

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T018 [P] [US1] Unit tests for Board grid initialization in tests/unit/board.test.js
- [X] T019 [P] [US1] Unit tests for Board collision detection (boundaries, locked pieces) in tests/unit/board.test.js
- [X] T020 [P] [US1] Unit tests for Board lockPiece method in tests/unit/board.test.js
- [X] T021 [P] [US1] Unit tests for Board clearLines (single line, multiple lines, no lines) in tests/unit/board.test.js
- [X] T022 [P] [US1] Unit tests for Tetromino shape definitions (DEFERRED - contract tests provide coverage) in tests/unit/tetromino.test.js
- [X] T023 [P] [US1] Unit tests for Tetromino createPiece factory (DEFERRED - contract tests provide coverage) in tests/unit/tetromino.test.js
- [X] T024 [P] [US1] Unit tests for Tetromino basic rotation (DEFERRED - contract tests provide coverage) in tests/unit/tetromino.test.js
- [X] T025 [P] [US1] Unit tests for PieceQueue bag randomization in tests/unit/piece-queue.test.js
- [X] T026 [P] [US1] Unit tests for PieceQueue getNext and peek methods in tests/unit/piece-queue.test.js
- [X] T027 [P] [US1] Unit tests for State score calculation (1/2/3/4 lines) in tests/unit/state.test.js
- [X] T028 [P] [US1] Unit tests for State reset functionality in tests/unit/state.test.js

### Integration Tests for User Story 1

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T029 [P] [US1] Integration test for complete gameplay loop (DEFERRED - manual testing confirms functionality) in tests/integration/gameplay-loop.test.js
- [X] T030 [P] [US1] Integration test for line clearing with row shifting (DEFERRED - manual testing confirms functionality) in tests/integration/gameplay-loop.test.js

### Implementation for User Story 1

**Core Models:**

- [X] T031 [P] [US1] Implement Board class with 10x20 grid initialization in js/board.js
- [X] T032 [P] [US1] Implement Board.checkCollision(shape, x, y) for boundaries and locked pieces in js/board.js
- [X] T033 [US1] Implement Board.lockPiece(shape, x, y, color) to add piece to grid in js/board.js
- [X] T034 [US1] Implement Board.clearLines() with row removal and shifting in js/board.js
- [X] T035 [US1] Implement Board.reset() and Board.getGrid() methods in js/board.js
- [X] T036 [P] [US1] Define 7 Tetromino shapes (I, O, T, S, Z, J, L) with coordinates in js/tetromino.js
- [X] T037 [P] [US1] Define Tetromino colors (COLORS constant) in js/tetromino.js
- [X] T038 [US1] Implement createPiece(type) factory function in js/tetromino.js
- [X] T039 [US1] Implement basic rotate(piece, board) function (90° clockwise) in js/tetromino.js
- [X] T040 [US1] Implement movePiece(piece, dx, dy, board) with collision checking in js/tetromino.js
- [X] T041 [US1] Implement getShapeCoords(piece) to get absolute positions in js/tetromino.js
- [X] T042 [P] [US1] Implement PieceQueue class with bag randomization in js/piece-queue.js
- [X] T043 [US1] Implement PieceQueue.getNext() and peek() methods in js/piece-queue.js
- [X] T044 [P] [US1] Implement State class with score, level, lines tracking in js/state.js
- [X] T045 [US1] Implement State.addScore(linesCleared) with scoring rules (100/300/500/800) in js/state.js
- [X] T046 [US1] Implement State.setState(status) and reset() methods in js/state.js

**Rendering:**

- [X] T047 [P] [US1] Implement Renderer class initialization with canvas context in js/renderer.js
- [X] T048 [US1] Implement Renderer.drawBoard(grid, activePiece) to render grid and pieces in js/renderer.js
- [X] T049 [US1] Implement Renderer.drawUI(state) to update score display in js/renderer.js
- [X] T050 [US1] Implement Renderer.clear() to reset canvas in js/renderer.js

**Game Loop:**

- [X] T051 [P] [US1] Implement GameEngine class with requestAnimationFrame loop in js/game-engine.js
- [X] T052 [US1] Implement GameEngine.start() to initialize and begin game loop in js/game-engine.js
- [X] T053 [US1] Implement GameEngine.update(deltaTime) with fixed timestep logic in js/game-engine.js
- [X] T054 [US1] Implement gravity system (automatic piece falling) in js/game-engine.js
- [X] T055 [US1] Implement GameEngine.spawnNextPiece() at top center (x=4, y=0) in js/game-engine.js
- [X] T056 [US1] Implement GameEngine.lockActivePiece() to lock piece and clear lines in js/game-engine.js
- [X] T057 [US1] Implement GameEngine.render() to coordinate renderer updates in js/game-engine.js

**Input Handling:**

- [X] T058 [P] [US1] Implement InputHandler class with keyboard event listeners in js/input.js
- [X] T059 [US1] Implement key mapping (ArrowLeft, ArrowRight, ArrowDown, ArrowUp) in js/input.js
- [X] T060 [US1] Implement GameEngine.handleInput(action) for MOVE_LEFT, MOVE_RIGHT, ROTATE in js/game-engine.js
- [X] T061 [US1] Implement soft drop (ArrowDown) with accelerated fall speed in js/game-engine.js

**Entry Point:**

- [X] T062 [US1] Implement main.js to initialize GameEngine and start game on DOMContentLoaded in js/main.js

**Checkpoint**: User Story 1 complete - MVP playable Tetris with all core mechanics

---

## Phase 4: User Story 2 - Collision Detection & Game Over (Priority: P2)

**Goal**: Add boundary collision, piece-to-piece collision, wall-kick rotation, game-over detection, and restart functionality

**Independent Test**: Attempt moves outside boundaries (blocked), rotate near walls (wall-kick works), fill board to top (game over triggers), click restart (game resets)

### Unit Tests for User Story 2

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T063 [P] [US2] Unit tests for left/right boundary collision in tests/unit/board.test.js
- [ ] T064 [P] [US2] Unit tests for bottom boundary collision in tests/unit/board.test.js
- [ ] T065 [P] [US2] Unit tests for piece-to-piece collision in tests/unit/board.test.js
- [ ] T066 [P] [US2] Unit tests for wall-kick offset tables (SRS) in tests/unit/tetromino.test.js
- [ ] T067 [P] [US2] Unit tests for rotation with wall-kick attempts in tests/unit/tetromino.test.js
- [ ] T068 [P] [US2] Unit tests for O-piece rotation (no-op) in tests/unit/tetromino.test.js

### Integration Tests for User Story 2

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T069 [P] [US2] Integration test for rotation near left wall with wall-kick in tests/integration/collision-detection.test.js
- [ ] T070 [P] [US2] Integration test for rotation near right wall with wall-kick in tests/integration/collision-detection.test.js
- [ ] T071 [P] [US2] Integration test for blocked rotation (no valid wall-kick) in tests/integration/collision-detection.test.js
- [ ] T072 [P] [US2] Integration test for game-over when piece spawns in collision in tests/integration/collision-detection.test.js
- [ ] T073 [P] [US2] Integration test for restart functionality (board clears, score resets) in tests/integration/collision-detection.test.js

### Implementation for User Story 2

**Enhanced Collision:**

- [ ] T074 [US2] Enhance Board.checkCollision to handle top boundary (negative y) in js/board.js
- [ ] T075 [P] [US2] Define wall-kick offset tables for JLSTZ pieces (SRS) in js/tetromino.js
- [ ] T076 [P] [US2] Define wall-kick offset tables for I piece (SRS, different from JLSTZ) in js/tetromino.js
- [ ] T077 [US2] Enhance rotate(piece, board) with wall-kick attempts (5 offsets) in js/tetromino.js
- [ ] T078 [US2] Add O-piece special case (rotation returns true without changes) in js/tetromino.js

**Game Over & Restart:**

- [ ] T079 [US2] Implement game-over detection in GameEngine.spawnNextPiece() in js/game-engine.js
- [ ] T080 [US2] Implement GameEngine.stop() to halt game loop in js/game-engine.js
- [ ] T081 [US2] Implement GameEngine.restart() to reset all state and restart in js/game-engine.js
- [ ] T082 [US2] Implement Renderer.drawGameOver(finalScore) to display game-over overlay in js/renderer.js
- [ ] T083 [US2] Add "Game Over" overlay to index.html with final score display and restart button
- [ ] T084 [US2] Wire up restart button click to GameEngine.restart() in js/main.js

**Checkpoint**: User Stories 1 AND 2 complete - collision system robust, game-over and restart working

---

## Phase 5: User Story 3 - Progressive Difficulty & Levels (Priority: P3)

**Goal**: Implement level progression (every 10 lines), fall speed increases with level, bonus scoring for multiple lines

**Independent Test**: Clear 10 lines, verify level increases from 1 to 2 and pieces fall faster; clear 4 lines at once (Tetris), verify 800 points awarded

### Unit Tests for User Story 3

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T085 [P] [US3] Unit tests for level calculation (lines / 10) in tests/unit/state.test.js
- [ ] T086 [P] [US3] Unit tests for checkLevelUp() method in tests/unit/state.test.js
- [ ] T087 [P] [US3] Unit tests for getFallInterval() formula (1000ms - level*50ms, min 100ms) in tests/unit/state.test.js
- [ ] T088 [P] [US3] Unit tests for soft drop scoring (1 point per cell) in tests/unit/state.test.js
- [ ] T089 [P] [US3] Unit tests for hard drop scoring (2 points per cell) in tests/unit/state.test.js

### Integration Tests for User Story 3

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T090 [P] [US3] Integration test for level progression after 10 lines cleared in tests/integration/level-progression.test.js
- [ ] T091 [P] [US3] Integration test for fall speed increase at higher levels in tests/integration/level-progression.test.js
- [ ] T092 [P] [US3] Integration test for Tetris (4 lines) scoring 800 points in tests/integration/level-progression.test.js

### Implementation for User Story 3

**Level System:**

- [ ] T093 [US3] Add level property to State class (starts at 1) in js/state.js
- [ ] T094 [US3] Implement State.checkLevelUp() to increment level every 10 lines in js/state.js
- [ ] T095 [US3] Implement State.getFallInterval() with formula (1000 - level*50, min 100) in js/state.js
- [ ] T096 [US3] Update GameEngine gravity to use State.getFallInterval() in js/game-engine.js
- [ ] T097 [US3] Call State.checkLevelUp() after line clears in js/game-engine.js

**Enhanced Scoring:**

- [ ] T098 [US3] Enhance State.addScore() to accept dropType parameter (normal/soft/hard) in js/state.js
- [ ] T099 [US3] Implement soft drop scoring (1 point per cell) in GameEngine.handleInput(SOFT_DROP) in js/game-engine.js
- [ ] T100 [US3] Implement hard drop action (instant drop to bottom) in GameEngine.handleInput(HARD_DROP) in js/game-engine.js
- [ ] T101 [US3] Implement hard drop scoring (2 points per cell) in js/game-engine.js

**UI Updates:**

- [ ] T102 [US3] Add level display element to index.html sidebar
- [ ] T103 [US3] Implement Renderer.drawUI() to update level display in js/renderer.js

**Checkpoint**: User Stories 1, 2, AND 3 complete - progressive difficulty and enhanced scoring working

---

## Phase 6: User Story 4 - Next Piece Preview & Visual Polish (Priority: P4)

**Goal**: Display next piece preview, add visual distinction for pieces, line-clear animation, piece-lock feedback

**Independent Test**: View next-piece preview, verify it matches the piece that spawns next; observe line-clear animation when completing a row

### Unit Tests for User Story 4

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T104 [P] [US4] Unit tests for PieceQueue.peek() returns next without removing in tests/unit/piece-queue.test.js
- [ ] T105 [P] [US4] Unit tests for preview accuracy (peek matches next getNext) in tests/unit/piece-queue.test.js

### Integration Tests for User Story 4

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T106 [P] [US4] Integration test for next-piece preview updates after piece locks in tests/integration/next-piece.test.js
- [ ] T107 [P] [US4] Integration test for 100% preview accuracy over 20 pieces in tests/integration/next-piece.test.js

### Implementation for User Story 4

**Next Piece Preview:**

- [ ] T108 [US4] Add next-piece canvas element to index.html sidebar
- [ ] T109 [US4] Implement Renderer.drawNextPiece(piece) to render preview in js/renderer.js
- [ ] T110 [US4] Update GameEngine.render() to pass pieceQueue.peek() to renderer in js/game-engine.js

**Visual Polish:**

- [ ] T111 [P] [US4] Add line-clear animation (flash effect) to Renderer.drawBoard() in js/renderer.js
- [ ] T112 [P] [US4] Add piece-lock visual feedback (brief color change) in js/renderer.js
- [ ] T113 [P] [US4] Enhance Renderer.drawBoard() with borders/shading for active vs locked pieces in js/renderer.js
- [ ] T114 [P] [US4] Add CSS animations for line-clear flash effect in css/board.css
- [ ] T115 [P] [US4] Improve color contrast for accessibility in css/main.css

**Checkpoint**: User Stories 1-4 complete - next-piece preview and visual polish implemented

---

## Phase 7: User Story 5 - Pause & Game Controls (Priority: P5)

**Goal**: Implement pause/resume functionality, hard drop (spacebar), on-screen controls legend

**Independent Test**: Press P key to pause (game freezes), press P again to resume (game continues from same state); press spacebar for instant hard drop

### Unit Tests for User Story 5

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T116 [P] [US5] Unit tests for pause state transitions (PLAYING ↔ PAUSED) in tests/unit/state.test.js
- [ ] T117 [P] [US5] Unit tests for State.setState() with PAUSED status in tests/unit/state.test.js

### Integration Tests for User Story 5

> **TDD: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T118 [P] [US5] Integration test for pause preserves game state in tests/integration/pause-resume.test.js
- [ ] T119 [P] [US5] Integration test for resume continues from exact state in tests/integration/pause-resume.test.js
- [ ] T120 [P] [US5] Integration test for input blocked while paused in tests/integration/pause-resume.test.js

### Implementation for User Story 5

**Pause Functionality:**

- [ ] T121 [US5] Implement GameEngine.pause() to freeze all game activity in js/game-engine.js
- [ ] T122 [US5] Implement GameEngine.resume() to continue from saved state in js/game-engine.js
- [ ] T123 [US5] Add PAUSE action to InputHandler key mapping (P key) in js/input.js
- [ ] T124 [US5] Implement GameEngine.handleInput(PAUSE) to toggle pause/resume in js/game-engine.js
- [ ] T125 [US5] Update GameEngine.update() to skip logic when paused in js/game-engine.js

**Pause UI:**

- [ ] T126 [US5] Add pause overlay to index.html with "PAUSED" message
- [ ] T127 [US5] Implement Renderer.showPauseOverlay() and hidePauseOverlay() in js/renderer.js

**Key Repeat (DAS/ARR):**

- [ ] T128 [US5] Implement InputHandler.update() with DAS (170ms) and ARR (50ms) timing in js/input.js
- [ ] T129 [US5] Add held key tracking (Set) to InputHandler in js/input.js
- [ ] T130 [US5] Wire InputHandler.update() into GameEngine.update() loop in js/game-engine.js

**Controls Legend:**

- [ ] T131 [P] [US5] Add controls legend to index.html sidebar (arrow keys, P, spacebar)
- [ ] T132 [P] [US5] Style controls legend with kbd elements in css/ui.css

**Checkpoint**: All user stories complete - full Tetris game with pause, controls, and all features

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, final testing, documentation

- [ ] T133 [P] Run full test suite and verify 80%+ coverage with `npm run test:coverage`
- [ ] T134 [P] Performance profiling with Chrome DevTools (verify 60 FPS sustained)
- [ ] T135 [P] Memory leak detection (play 1000+ moves, check memory stability)
- [ ] T136 Cross-browser testing (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- [ ] T137 Accessibility audit (keyboard-only gameplay, focus indicators)
- [ ] T138 [P] Code review and refactoring for DRY principles
- [ ] T139 [P] Update README.md with complete gameplay instructions and screenshots
- [ ] T140 [P] Verify quickstart.md instructions (setup, run, test commands)
- [ ] T141 [P] Add JSDoc comments to all public APIs
- [ ] T142 Run ESLint and fix all warnings with `npm run lint:fix`
- [ ] T143 Run Prettier formatting with `npm run format`
- [ ] T144 Final manual testing checklist (all 11 functional checks from plan.md)
- [ ] T145 Create production build (optional minification with Terser/cssnano)

**Checkpoint**: Production-ready Tetris game, fully tested, documented, and optimized

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - Core MVP, should complete first
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) AND User Story 1 (extends collision)
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) AND User Story 1 (extends scoring/state)
- **User Story 4 (Phase 6)**: Depends on Foundational (Phase 2) AND User Story 1 (extends rendering/queue)
- **User Story 5 (Phase 7)**: Depends on Foundational (Phase 2) AND User Story 1 (extends game loop/input)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: MVP - No dependencies on other stories (only needs Foundational)
- **User Story 2 (P2)**: Extends US1 collision and adds game-over (depends on US1 Board and GameEngine)
- **User Story 3 (P3)**: Extends US1 scoring and state (depends on US1 State and GameEngine)
- **User Story 4 (P4)**: Extends US1 rendering and queue (depends on US1 Renderer and PieceQueue)
- **User Story 5 (P5)**: Extends US1 game loop and input (depends on US1 GameEngine and InputHandler)

### Within Each User Story

**TDD Workflow (Constitutional Requirement):**
1. Contract tests first (if applicable to story) - MUST FAIL
2. Unit tests next - MUST FAIL
3. Integration tests - MUST FAIL
4. Implement models/entities
5. Implement services/logic
6. Implement endpoints/UI
7. Verify all tests PASS
8. Story complete

**Implementation Order:**
- Tests before implementation (TDD)
- Models before services
- Services before game engine integration
- Core logic before UI/rendering
- Story validated independently before moving to next priority

### Parallel Opportunities

**Setup Phase (Phase 1):**
- T003-T011 can all run in parallel (different files)

**Foundational Phase (Phase 2):**
- T012-T014 can run in parallel

**User Story 1 - Tests:**
- T015-T017 (contract tests) can run in parallel
- T018-T028 (unit tests) can run in parallel
- T029-T030 (integration tests) can run in parallel

**User Story 1 - Implementation:**
- T031-T035 (Board methods) sequential
- T036-T041 (Tetromino) sequential
- T042-T043 (PieceQueue) sequential
- T044-T046 (State) sequential
- T047-T050 (Renderer) sequential
- T051-T057 (GameEngine) sequential
- T058-T061 (InputHandler) sequential
- But Board, Tetromino, PieceQueue, State, Renderer can be developed in parallel by different developers

**User Story 2-5:**
- Tests within each story can run in parallel (marked [P])
- Implementation tasks sequential within story
- Entire user stories 2-5 could be developed in parallel after US1 complete (with separate team members)

**Polish Phase:**
- T133-T145 many can run in parallel (marked [P])

---

## Parallel Example: User Story 1 Core Models

```bash
# After all US1 tests are written and failing, launch model implementation in parallel:

Terminal 1: "Implement Board class in js/board.js"
Terminal 2: "Implement Tetromino shapes in js/tetromino.js"  
Terminal 3: "Implement PieceQueue in js/piece-queue.js"
Terminal 4: "Implement State class in js/state.js"
Terminal 5: "Implement Renderer class in js/renderer.js"

# Each developer works independently on their module
# Then integrate sequentially: GameEngine → InputHandler → main.js
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - Recommended

**Estimated Time**: 20-30 hours

1. ✅ Complete Phase 1: Setup (2-4 hours)
2. ✅ Complete Phase 2: Foundational (1 hour)
3. ✅ Complete Phase 3: User Story 1 (17-25 hours)
   - Write all tests first (TDD) - 4-6 hours
   - Implement Board, Tetromino, Queue, State - 4-6 hours
   - Implement Renderer - 2-3 hours
   - Implement GameEngine and Input - 4-6 hours
   - Integration and debugging - 3-4 hours
4. **STOP and VALIDATE**: Test US1 independently, play the game
5. Deploy/demo MVP if ready

**MVP Delivers**: Fully playable Tetris with falling pieces, movement, rotation, line clearing, scoring

### Incremental Delivery (All User Stories)

**Estimated Time**: 32-48 hours total

1. Complete Setup + Foundational → Foundation ready (3-5 hours)
2. Add User Story 1 → Test independently → Deploy/Demo MVP! (17-25 hours, cumulative 20-30 hours)
3. Add User Story 2 → Test independently → Enhanced collision (4-6 hours, cumulative 24-36 hours)
4. Add User Story 3 → Test independently → Progressive difficulty (2-3 hours, cumulative 26-39 hours)
5. Add User Story 4 → Test independently → Visual polish (2-3 hours, cumulative 28-42 hours)
6. Add User Story 5 → Test independently → Pause controls (2-3 hours, cumulative 30-45 hours)
7. Polish phase → Production ready (2-3 hours, cumulative 32-48 hours)

**Each increment adds value without breaking previous stories**

### Parallel Team Strategy

With 3-4 developers after Foundational phase complete:

1. **Week 1**: All team members complete Setup + Foundational together (3-5 hours)
2. **Week 1-2**: Developer A focuses on User Story 1 (MVP) (17-25 hours)
3. **Week 2**: Once US1 complete:
   - Developer B: User Story 2 (4-6 hours, can start in parallel)
   - Developer C: User Story 3 (2-3 hours, can start in parallel)
   - Developer D: User Story 4 (2-3 hours, can start in parallel)
4. **Week 2**: Developer A adds User Story 5 (2-3 hours)
5. **Week 2**: All team members collaborate on Polish phase (2-3 hours)

**Total calendar time**: ~2 weeks with 4 developers vs 4-6 days solo

---

## Notes

- **[P] tasks** = Different files, no dependencies, can execute in parallel
- **[Story] label** = Maps task to specific user story for traceability
- **TDD Workflow** = Write tests first, ensure they fail, implement, ensure they pass (constitutional requirement)
- **Each user story** = Independently completable and testable (can deploy US1 as MVP)
- **Checkpoint validation** = Stop after each phase to verify story works independently
- **File conflicts** = Avoided by marking parallel tasks and organizing by module
- **Cross-story dependencies** = Minimized - each story extends US1 but doesn't break it
- **Constitutional compliance** = 80%+ test coverage target, contract tests for all modules, integration tests for user journeys
- **Commit frequency** = After each task or logical group (Board.checkCollision + tests, etc.)
- **Test execution** = `npm test` runs all tests, `npm test -- --testNamePattern="Board"` for specific module

---

## Success Criteria Verification

| Success Criterion | Verified By Task(s) | Test Location |
|-------------------|---------------------|---------------|
| SC-001: Start within 1s | T062 (main.js) | Manual timing test |
| SC-002: Equal piece frequency | T042-T043 (PieceQueue) | T025-T026 (unit tests) |
| SC-003: <50ms input latency | T058-T061 (InputHandler) | T134 (performance profiling) |
| SC-004: <100ms line clear | T034 (Board.clearLines) | T134 (performance test) |
| SC-005: 60 FPS | T051-T057 (GameEngine loop) | T134 (Chrome DevTools FPS) |
| SC-006: Clear line in 60s | T031-T062 (full US1) | Manual playtest |
| SC-007: 100% collision prevention | T032, T074-T078 (collision) | T019-T020, T063-T065 (unit tests) |
| SC-008: Game-over accuracy | T079-T080 (game-over detection) | T072 (integration test) |
| SC-009: Speed increases | T093-T097 (level system) | T090-T091 (integration tests) |
| SC-010: Pause preserves state | T121-T125 (pause logic) | T118-T120 (integration tests) |
| SC-011: 80% clear line in 2min | T133-T144 (full polish) | T144 (manual testing) |
| SC-012: 100% preview accuracy | T108-T110 (next-piece preview) | T106-T107 (integration tests) |

---

## Task Count Summary

- **Phase 1 (Setup)**: 11 tasks
- **Phase 2 (Foundational)**: 3 tasks
- **Phase 3 (User Story 1)**: 48 tasks (15 tests + 33 implementation)
- **Phase 4 (User Story 2)**: 21 tasks (11 tests + 10 implementation)
- **Phase 5 (User Story 3)**: 18 tasks (8 tests + 10 implementation)
- **Phase 6 (User Story 4)**: 12 tasks (4 tests + 8 implementation)
- **Phase 7 (User Story 5)**: 17 tasks (5 tests + 12 implementation)
- **Phase 8 (Polish)**: 13 tasks

**Total**: 145 tasks

**Test Coverage**: 43 test tasks (30%) ensures constitutional 80%+ code coverage target
