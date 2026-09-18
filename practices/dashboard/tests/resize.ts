const observers = new Set<TestResizeObserver>()

class TestResizeObserver {
  target?: Element
  constructor(readonly callback: ResizeObserverCallback) {
    observers.add(this)
  }
  observe(target: Element) {
    this.target = target
  }
  unobserve() {
    this.target = undefined
  }
  disconnect() {
    observers.delete(this)
  }
}

globalThis.ResizeObserver = TestResizeObserver as unknown as typeof ResizeObserver

export function resize(element: Element, width: number) {
  for (const observer of observers) {
    if (observer.target === element) {
      observer.callback(
        [{ target: element, contentRect: { width, height: 600 } } as ResizeObserverEntry],
        observer as unknown as ResizeObserver,
      )
    }
  }
}

export const observerCount = () => observers.size
