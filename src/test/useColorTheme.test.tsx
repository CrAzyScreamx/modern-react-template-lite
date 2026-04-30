import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ThemeContextProvider, useColorTheme } from '../context/ThemeContext';

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

function mockMatchMedia(prefersDark: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

beforeEach(() => {
  localStorage.clear();
  mockMatchMedia(false);
});

describe('useColorTheme', () => {
  it('reads dark from localStorage', () => {
    localStorage.setItem('theme-pref', 'dark');
    mockMatchMedia(false);

    const { result } = renderHook(() => useColorTheme(), { wrapper });
    expect(result.current.mode).toBe('dark');
  });

  it('reads light from localStorage', () => {
    localStorage.setItem('theme-pref', 'light');
    mockMatchMedia(true);

    const { result } = renderHook(() => useColorTheme(), { wrapper });
    expect(result.current.mode).toBe('light');
  });

  it('falls back to prefers-color-scheme: dark', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useColorTheme(), { wrapper });
    expect(result.current.mode).toBe('dark');
  });

  it('falls back to prefers-color-scheme: light', () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => useColorTheme(), { wrapper });
    expect(result.current.mode).toBe('light');
  });

  it('toggleTheme flips mode and persists to localStorage', () => {
    localStorage.setItem('theme-pref', 'dark');
    mockMatchMedia(false);

    const { result } = renderHook(() => useColorTheme(), { wrapper });
    expect(result.current.mode).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.mode).toBe('light');
    expect(localStorage.getItem('theme-pref')).toBe('light');
  });
});
