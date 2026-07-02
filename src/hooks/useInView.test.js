import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useInView } from './useInView';

let observerCallback;

class MockIntersectionObserver {
  constructor(callback) {
    observerCallback = callback;
  }
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  observerCallback = undefined;
  global.IntersectionObserver = MockIntersectionObserver;
});

function TestComponent() {
  const [ref, isInView] = useInView();
  return <div ref={ref}>{isInView ? 'in-view' : 'out-of-view'}</div>;
}

test('reports out-of-view initially, in-view after intersection fires', () => {
  render(<TestComponent />);
  expect(screen.getByText('out-of-view')).toBeInTheDocument();

  act(() => {
    observerCallback([{ isIntersecting: true }]);
  });

  expect(screen.getByText('in-view')).toBeInTheDocument();
});
