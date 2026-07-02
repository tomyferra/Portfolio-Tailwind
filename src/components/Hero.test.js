import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver;
});

test('renders keyword-led bio and dot-grid hero background', () => {
  const { container } = render(<Hero />);
  expect(screen.getAllByText(/Full-Stack Software Developer/).length).toBeGreaterThan(0);
  expect(container.querySelector('.bg-dot-grid')).toBeInTheDocument();
});
