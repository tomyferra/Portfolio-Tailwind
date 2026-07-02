import React from 'react';
import { render, screen } from '@testing-library/react';
import Project from './Project';

test('renders outline-style tech pills and descriptive image alt text', () => {
  render(
    <Project
      name="Test Project"
      sitepicture="test.webp"
      summary="A test project"
      url="https://example.com"
      technologies={['React', 'Python']}
    />
  );

  const img = screen.getByAltText(/Test Project/);
  expect(img).toBeInTheDocument();

  const pill = screen.getByText('React');
  expect(pill.className).toMatch(/border-ink/);
});
