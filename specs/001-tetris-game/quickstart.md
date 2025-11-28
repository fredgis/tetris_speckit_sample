# Tetris Game - Quick Start Guide

**Version**: 1.0.0  
**Last Updated**: 2025-11-28

---

## Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
- **Git**: For version control

**Check your versions**:
```powershell
node --version
npm --version
```

---

## Installation

### 1. Clone the Repository (if applicable)

```powershell
git clone <repository-url>
cd tetris-game
```

### 2. Install Dependencies

```powershell
npm install
```

**Expected dependencies**:
- **Jest** (29+) - Testing framework
- **ESLint** (8+) - Code linting
- **Prettier** (2+) - Code formatting

---

## Project Structure

```
tetris-game/
├── index.html              # Main HTML file
├── css/
│   ├── main.css            # Global styles and layout
│   ├── board.css           # Game board styles
│   └── ui.css              # HUD and UI component styles
├── js/
│   ├── main.js             # Application entry point
│   ├── game-engine.js      # Game loop orchestrator
│   ├── board.js            # Board grid logic
│   ├── tetromino.js        # Piece shapes and rotation
│   ├── piece-queue.js      # Random piece generator
│   ├── state.js            # Score, level, game state
│   ├── input.js            # Keyboard input handler
│   ├── renderer.js         # Canvas and DOM rendering
│   └── utils.js            # Shared constants and helpers
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── contract/           # Contract tests
├── package.json            # npm configuration
├── .eslintrc.json          # ESLint configuration
└── .prettierrc             # Prettier configuration
```

---

## Development Workflow

### Run the Game Locally

**Option 1: Simple HTTP Server (recommended)**
```powershell
npx serve .
```
Then open browser to: `http://localhost:3000`

**Option 2: Python HTTP Server**
```powershell
python -m http.server 8000
```
Then open browser to: `http://localhost:8000`

**Option 3: Live Server (VS Code Extension)**
- Install "Live Server" extension in VS Code
- Right-click `index.html` → "Open with Live Server"

---

### Run Tests

**Run all tests**:
```powershell
npm test
```

**Run tests in watch mode** (re-runs on file changes):
```powershell
npm test -- --watch
```

**Run tests with coverage**:
```powershell
npm test -- --coverage
```

**Run specific test file**:
```powershell
npm test tests/unit/board.test.js
```

**Run tests matching pattern**:
```powershell
npm test -- --testNamePattern="collision"
```

---

### Code Quality

**Run ESLint** (check for code issues):
```powershell
npm run lint
```

**Auto-fix ESLint issues**:
```powershell
npm run lint:fix
```

**Format code with Prettier**:
```powershell
npm run format
```

**Check formatting without changing files**:
```powershell
npm run format:check
```

---

## Gameplay

### How to Play

1. **Start Game**: Open `index.html` in browser, game starts automatically
2. **Move Pieces**:
   - `←` (Left Arrow) - Move piece left
   - `→` (Right Arrow) - Move piece right
   - `↑` (Up Arrow) - Rotate piece clockwise
   - `↓` (Down Arrow) - Soft drop (move down faster)
   - `Space` - Hard drop (instant drop to bottom)
   - `P` - Pause/Resume game
3. **Objective**: Clear lines by filling entire rows with pieces
4. **Scoring**:
   - 1 line = 100 points
   - 2 lines = 300 points
   - 3 lines = 500 points
   - 4 lines (Tetris) = 800 points
   - Soft drop = 1 point per cell
   - Hard drop = 2 points per cell
5. **Levels**: Level increases every 10 lines cleared (pieces fall faster)
6. **Game Over**: When pieces stack to the top of the board

---

## npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `npm test` | Run all tests with Jest |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `test:coverage` | `npm run test:coverage` | Run tests with coverage report |
| `lint` | `npm run lint` | Check code with ESLint |
| `lint:fix` | `npm run lint:fix` | Auto-fix ESLint issues |
| `format` | `npm run format` | Format code with Prettier |
| `format:check` | `npm run format:check` | Check formatting without changes |
| `serve` | `npm run serve` | Start local development server |

---

## Configuration Files

### package.json
```json
{
  "name": "tetris-game",
  "version": "1.0.0",
  "description": "Browser-based Tetris game with vanilla JavaScript",
  "type": "module",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint js/**/*.js",
    "lint:fix": "eslint js/**/*.js --fix",
    "format": "prettier --write \"**/*.{js,css,html,md}\"",
    "format:check": "prettier --check \"**/*.{js,css,html,md}\"",
    "serve": "serve ."
  },
  "devDependencies": {
    "@jest/globals": "^29.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "prettier": "^2.0.0",
    "serve": "^14.0.0"
  }
}
```

### .eslintrc.json
```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-console": "off",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2]
  }
}
```

### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

### jest.config.js
```javascript
export default {
  testEnvironment: 'jsdom',
  transform: {},
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/js/$1',
  },
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/main.js', // Entry point doesn't need coverage
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## Testing Guide

### Writing Tests

**Unit Test Example** (`tests/unit/board.test.js`):
```javascript
import { describe, test, expect, beforeEach } from '@jest/globals';
import { Board } from '../../js/board.js';

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = new Board(10, 20);
  });

  test('initializes with empty grid', () => {
    const grid = board.getGrid();
    expect(grid.length).toBe(20);
    expect(grid[0].length).toBe(10);
    expect(grid[0][0]).toBeNull();
  });

  test('detects collision with left boundary', () => {
    const shape = [[0, 0], [1, 0]];
    const collision = board.checkCollision(shape, -1, 0);
    expect(collision).toBe(true);
  });
});
```

**Integration Test Example** (`tests/integration/gameplay.test.js`):
```javascript
import { describe, test, expect } from '@jest/globals';
import { GameEngine } from '../../js/game-engine.js';

describe('Gameplay Integration', () => {
  test('piece locks when reaching bottom', () => {
    const canvas = document.createElement('canvas');
    const engine = new GameEngine(canvas, { height: 5 });
    engine.start();

    // Move piece to bottom
    while (engine.moveActivePiece(0, 1)) {
      // Keep moving down
    }

    engine.update(engine.FIXED_TIME_STEP);

    const grid = engine.board.getGrid();
    expect(grid[4]).not.toEqual(Array(10).fill(null));
  });
});
```

### Test Coverage

**View coverage report**:
```powershell
npm run test:coverage
```

**Open HTML report**:
```powershell
# Coverage report generated at: coverage/lcov-report/index.html
start coverage/lcov-report/index.html  # Windows PowerShell
```

**Target coverage**: 80% for branches, functions, lines, statements

---

## Troubleshooting

### Issue: Tests fail with "Cannot use import statement"

**Solution**: Ensure `package.json` has `"type": "module"` and Jest is configured for ES modules.

```json
{
  "type": "module"
}
```

---

### Issue: ESLint errors about ES6 syntax

**Solution**: Verify `.eslintrc.json` has correct `ecmaVersion`:

```json
{
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  }
}
```

---

### Issue: Game doesn't load in browser

**Solution**: 
1. Check browser console for errors (F12)
2. Verify you're using a modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
3. Ensure you're serving via HTTP server (not file:// protocol)
4. Check that all JavaScript files exist in `js/` directory

---

### Issue: Canvas not rendering

**Solution**:
1. Verify canvas element exists in HTML: `<canvas id="game-canvas"></canvas>`
2. Check canvas dimensions in HTML/CSS
3. Verify `main.js` is loaded as module: `<script type="module" src="js/main.js"></script>`
4. Check browser console for JavaScript errors

---

### Issue: Input not working

**Solution**:
1. Click on game canvas to ensure it has focus
2. Verify keyboard event listeners are attached
3. Check browser console for JavaScript errors
4. Test with different keys (arrow keys, space, P)

---

## Performance Optimization

### Check FPS

**Chrome DevTools**:
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Click "Record" button
4. Play game for 10-20 seconds
5. Stop recording
6. Check "Frames" section - should maintain 60 FPS

---

### Memory Profiling

**Chrome DevTools**:
1. Open DevTools (F12)
2. Go to "Memory" tab
3. Take heap snapshot before starting game
4. Play game for several minutes (100+ moves)
5. Take another heap snapshot
6. Compare snapshots - memory should remain stable

---

## Browser Compatibility

| Browser | Min Version | Status |
|---------|-------------|--------|
| Chrome | 90+ | ✅ Supported |
| Firefox | 88+ | ✅ Supported |
| Safari | 14+ | ✅ Supported |
| Edge | 90+ | ✅ Supported |

**Required Features**:
- ES6+ modules (import/export)
- Canvas 2D API
- requestAnimationFrame
- Keyboard events (KeyboardEvent)
- Performance API (performance.now())

---

## Deployment

### GitHub Pages

1. **Push to GitHub**:
```powershell
git add .
git commit -m "Initial Tetris game"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "main" branch
   - Click "Save"

3. **Access game**:
   - URL: `https://<username>.github.io/<repo-name>/`

---

### Netlify

1. **Install Netlify CLI**:
```powershell
npm install -g netlify-cli
```

2. **Deploy**:
```powershell
netlify deploy --prod
```

3. **Follow prompts** to link site

---

## Additional Resources

- **Tetris Guideline**: [https://tetris.wiki/Tetris_Guideline](https://tetris.wiki/Tetris_Guideline)
- **Super Rotation System (SRS)**: [https://tetris.wiki/SRS](https://tetris.wiki/SRS)
- **Canvas API**: [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- **Jest Documentation**: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- **ESLint Rules**: [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)

---

## Next Steps

1. ✅ **Setup complete** - Run `npm install` and `npm test`
2. 🎮 **Play the game** - Open `index.html` in browser via HTTP server
3. 🧪 **Write tests** - Follow TDD approach, write tests before implementation
4. 📝 **Follow plan** - See `specs/001-tetris-game/plan.md` for implementation roadmap
5. ✅ **Quality checks** - Run `npm run lint` and `npm run format` regularly
6. 📊 **Monitor coverage** - Maintain 80%+ test coverage

---

## Support

**Found a bug?** Create an issue in the repository.

**Need help?** Check:
1. Browser console for error messages (F12)
2. Test output for failures
3. ESLint output for code issues
4. This quickstart guide's troubleshooting section

---

**Happy coding! 🎮🕹️**
