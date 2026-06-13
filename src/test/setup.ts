import '@testing-library/jest-dom/vitest';

HTMLFormElement.prototype.requestSubmit = function requestSubmit() {
  this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
};
