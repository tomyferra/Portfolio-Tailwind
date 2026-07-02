import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

beforeEach(() => {
  global.fetch = jest.fn().mockRejectedValue(new Error('no counter in test'));
});

test('renders on a paper-themed section with all four social links', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild.className).toMatch(/bg-paper|border-line/);
  const links = container.querySelectorAll('a');
  expect(links).toHaveLength(4);
});
