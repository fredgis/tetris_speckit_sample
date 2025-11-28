# Tetris Game with SpecKit

Classic Tetris game built with vanilla JavaScript, HTML5 Canvas, and CSS3. This project demonstrates a complete implementation workflow using **SpecKit** for specification-driven development.

![Tetris Game Screenshot](specs/001-tetris-game/tetris-game/screenshot.png)

## 🎮 Features

- 🎮 **Classic Tetris gameplay** with 7 tetromino pieces
- 🎯 **Super Rotation System (SRS)** with wall-kicks for advanced rotation
- 👻 **Ghost piece** showing where the active piece will land
- 💥 **Particle explosion animations** for line clears with special TETRIS effect (4 lines)
- 📊 **Progressive difficulty** with level system (increases every 10 lines)
- 🎨 **Next piece preview** with 7-bag randomization
- ⏸️ **Pause/resume** functionality
- ⌨️ **Keyboard-only controls** with intuitive layout
- 🎪 **Smooth 60 FPS gameplay** with requestAnimationFrame
- 📱 **Responsive desktop UI** with left sidebar controls

## 🚀 Quick Start

### Play the Game

```bash
cd specs/001-tetris-game/tetris-game

# Install dependencies
npm install

# Start development server
npm run serve
```

Open `http://localhost:3000` in your browser.

### Development

```bash
# Run tests (98 tests)
npm test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage

# Lint code
npm run lint

# Format code with Prettier
npm run format
```

## 🎯 Controls

| Key   | Action                        |
| ----- | ----------------------------- |
| ← →   | Move piece left/right         |
| ↑     | Rotate piece clockwise        |
| ↓     | Soft drop (faster fall)       |
| Space | Hard drop (instant placement) |
| P     | Pause/resume game             |

## 📋 SpecKit Workflow

This project was built using **SpecKit** specification-driven development:

1. **Specification** (`specs/001-tetris-game/spec.md`) - Original requirements and feature definitions
2. **Planning** (`specs/001-tetris-game/plan.md`) - Technical architecture and tech stack decisions
3. **Data Model** (`specs/001-tetris-game/data-model.md`) - Entity relationships and state management
4. **Contracts** (`specs/001-tetris-game/contracts/`) - API specifications for Board, Tetromino, Game Engine
5. **Tasks** (`specs/001-tetris-game/tasks.md`) - 62 implementation tasks across 5 phases
6. **Implementation** (`specs/001-tetris-game/tetris-game/`) - Complete working game

### SpecKit Documentation

All specification files are located in `specs/001-tetris-game/`:

- `spec.md` - Original feature specification
- `plan.md` - Technical architecture and design decisions
- `data-model.md` - Game state and entity definitions
- `tasks.md` - Complete task breakdown (62 tasks)
- `research.md` - Technical research and decisions
- `quickstart.md` - Integration and setup guide
- `contracts/` - API contract specifications
- `checklists/` - Requirements validation

## 🏗️ Project Structure

```
specs/001-tetris-game/tetris-game/
├── index.html          # Main HTML file
├── css/
│   ├── main.css        # Global styles
│   ├── board.css       # Game board styles
│   └── ui.css          # UI panel styles
├── js/
│   ├── main.js         # Entry point
│   ├── game-engine.js  # Game loop & orchestration
│   ├── board.js        # Board state & logic
│   ├── tetromino.js    # Piece shapes & rotation
│   ├── piece-queue.js  # Piece randomization (7-bag)
│   ├── state.js        # Score, level, lines tracking
│   ├── input.js        # Keyboard input handling
│   ├── renderer.js     # Canvas rendering & animations
│   └── utils.js        # Constants & utilities
└── tests/
    ├── unit/           # Unit tests
    ├── integration/    # Integration tests
    └── contract/       # API contract tests
```

## 🎲 Game Mechanics

### Scoring

- **1 line (Single)**: 100 × level
- **2 lines (Double)**: 300 × level
- **3 lines (Triple)**: 500 × level
- **4 lines (Tetris)**: 800 × level 💥 *Special particle effect!*

### Progression

- Level increases every 10 lines cleared
- Fall speed increases using gravity formula: `(0.8 - ((level - 1) * 0.007))^(level - 1)`
- Game ends when pieces reach the top

### Piece Randomization

Uses **7-bag randomization** (Tetris Guideline standard) ensuring all 7 tetromino types appear once per bag for fair distribution.

## 🧪 Testing

- ✅ **98 tests passing** across 6 suites
- **Contract tests**: API specifications compliance
- **Unit tests**: Individual module behavior
- **Integration tests**: End-to-end gameplay scenarios

## 🛠️ Technology Stack

- **JavaScript**: ES6+ modules, classes (no transpilation)
- **HTML5**: Canvas API for 2D rendering
- **CSS3**: Grid, Flexbox, CSS Custom Properties
- **Testing**: Jest 29+ with jsdom
- **Code Quality**: ESLint (Airbnb config), Prettier
- **Animation**: RequestAnimationFrame with custom particle physics

## 📦 Repository Contents

- `specs/001-tetris-game/` - Complete SpecKit specification and implementation
- `specs/001-tetris-game/tetris-game/` - Playable Tetris game

## 📄 License

MIT

## 🎯 Credits

Based on the Tetris Guideline (2009) for standard gameplay mechanics. Built as a demonstration of specification-driven development using SpecKit.
