import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders paper background and all nav links', () => {
  const { container } = render(<Navbar />);
  const root = container.firstChild;
  expect(root.className).toMatch(/bg-paper/);

  ['About', 'Experience', 'Apps', 'Skills', 'Contact'].forEach((label) => {
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
  });
});
