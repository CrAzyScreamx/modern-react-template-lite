import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeContextProvider } from './context/ThemeContext';
import { App } from './App';

describe('App', () => {
  it('renders without crashing and shows key UI elements', () => {
    render(
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    );
    expect(screen.getByText('MyApp')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
  });
});
