import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// JSDOM does not implement layout observation.
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

HTMLElement.prototype.scrollTo = function (options: ScrollToOptions | number, y?: number) {
  this.scrollTop = typeof options === "number" ? y ?? 0 : options.top ?? 0;
};
HTMLElement.prototype.scrollIntoView = function () {};
