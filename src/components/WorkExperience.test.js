// src/components/WorkExperience.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkExperience from './WorkExperience';

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver;
});

test('renders all role titles on a paper-themed section', () => {
  const { container } = render(<WorkExperience />);
  expect(container.firstChild.className).toMatch(/bg-paper/);
  expect(screen.getByText(/Founder & Full Stack Developer at EntreVinos/)).toBeInTheDocument();
  expect(screen.getByText(/Software Engineer at JP Morgan Chase/)).toBeInTheDocument();
});
