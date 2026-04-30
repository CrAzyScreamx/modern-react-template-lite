import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeModeProvider } from './lib/ThemeModeContext';
import { getTheme } from './lib/theme';
import { App } from './App';

describe('App', () => {
  it('renders without crashing and shows key UI elements', () => {
    render(
      <ThemeModeProvider>
        <ThemeProvider theme={getTheme('dark')}>
          <App />
        </ThemeProvider>
      </ThemeModeProvider>
    );
    expect(screen.getByText('MyApp')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
  });
});
