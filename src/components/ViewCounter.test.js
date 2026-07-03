import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ViewCounter from './ViewCounter';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the count on a successful fetch', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ data: { up_count: 42 } }) });
  render(<ViewCounter />);
  await waitFor(() => expect(screen.getByText('42')).toBeInTheDocument());
});

test('renders nothing when the fetch fails', async () => {
  global.fetch.mockRejectedValueOnce(new Error('network error'));
  const { container } = render(<ViewCounter />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  await waitFor(() => expect(container).toBeEmptyDOMElement());
});

test('renders nothing when the response is missing up_count', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ data: {} }) });
  const { container } = render(<ViewCounter />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  await waitFor(() => expect(container).toBeEmptyDOMElement());
});

test('does not double-fetch under React.StrictMode double-invoked effects', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ data: { up_count: 5 } }) });
  render(
    <React.StrictMode>
      <ViewCounter />
    </React.StrictMode>
  );
  await waitFor(() => expect(screen.getByText('5')).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
