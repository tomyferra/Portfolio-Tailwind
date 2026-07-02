import React from 'react';
import { render } from '@testing-library/react';
import Skills from './Skills';

test('renders on a paper-themed section', () => {
  const { container } = render(<Skills />);
  expect(container.firstChild.className).toMatch(/bg-paper/);
});
