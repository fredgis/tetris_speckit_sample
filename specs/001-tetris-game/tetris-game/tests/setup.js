/**
 * Jest Setup
 * Global configuration for Jest test environment
 */

// Mock requestAnimationFrame for jsdom
global.requestAnimationFrame = (callback) => setTimeout(callback, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Mock HTMLCanvasElement.getContext if needed
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = function getContext(contextType) {
    if (contextType === '2d') {
      return {
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        fillRect: jest.fn(),
        strokeRect: jest.fn(),
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        closePath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        save: jest.fn(),
        restore: jest.fn(),
        translate: jest.fn(),
        rotate: jest.fn(),
        scale: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        canvas: this,
      };
    }
    return null;
  };
}

// Suppress console warnings during tests (optional)
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
