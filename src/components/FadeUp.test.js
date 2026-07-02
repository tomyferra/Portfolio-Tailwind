import React from 'react';
import { render, screen, act } from '@testing-library/react';
import FadeUp from './FadeUp';

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
  window.matchMedia = window.matchMedia || (() => ({ matches: false }));
});

test('starts hidden and becomes visible once in view', () => {
  render(<FadeUp><span>content</span></FadeUp>);
  const wrapper = screen.getByText('content').parentElement;
  expect(wrapper.className).toMatch(/opacity-0/);

  act(() => {
    observerCallback([{ isIntersecting: true }]);
  });

  expect(wrapper.className).toMatch(/opacity-100/);
});

test('skips transform when prefers-reduced-motion is set', () => {
  window.matchMedia = () => ({ matches: true });
  render(<FadeUp><span>content2</span></FadeUp>);
  const wrapper = screen.getByText('content2').parentElement;
  expect(wrapper.style.transform).toBe('');
});
