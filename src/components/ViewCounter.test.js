import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ViewCounter, { buildCounterUrl } from './ViewCounter';

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV, REACT_APP_COUNTER_WORKSPACE: 'ws', REACT_APP_COUNTER_NAME: 'portfolio' };
  global.fetch = jest.fn();
});

afterEach(() => {
  process.env = OLD_ENV;
  jest.restoreAllMocks();
});

test('buildCounterUrl builds the CounterAPI "up" endpoint', () => {
  expect(buildCounterUrl('ws', 'portfolio')).toBe('https://api.counterapi.dev/v1/ws/portfolio/up');
});

test('renders the count on a successful fetch', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ count: 42 }) });
  render(<ViewCounter />);
  await waitFor(() => expect(screen.getByText(/42 views/)).toBeInTheDocument());
});

test('renders nothing when the fetch fails', async () => {
  global.fetch.mockRejectedValueOnce(new Error('network error'));
  const { container } = render(<ViewCounter />);
  await waitFor(() => expect(container).toBeEmptyDOMElement());
});

test('renders nothing when env vars are missing', () => {
  process.env.REACT_APP_COUNTER_WORKSPACE = '';
  const { container } = render(<ViewCounter />);
  expect(container).toBeEmptyDOMElement();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('does not double-fetch under React.StrictMode double-invoked effects', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ count: 5 }) });
  render(
    <React.StrictMode>
      <ViewCounter />
    </React.StrictMode>
  );
  await waitFor(() => expect(screen.getByText(/5 views/)).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
