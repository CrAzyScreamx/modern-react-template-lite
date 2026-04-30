import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
export type ThemeMode = 'light' | 'dark';

declare module '@mui/material/styles' {
  interface Palette {
    surface: string;
    surfaceElevated: string;
    surfaceOverlay: string;
  }
  interface PaletteOptions {
    surface?: string;
    surfaceElevated?: string;
    surfaceOverlay?: string;
  }
}

export function createAppTheme(mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366F1',
        light: '#818CF8',
        dark: '#4F46E5',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#8B5CF6',
        light: '#A78BFA',
        dark: '#7C3AED',
      },
      success: { main: '#22C55E', light: '#4ADE80', dark: '#16A34A' },
      warning: { main: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
      error: { main: '#EF4444', light: '#F87171', dark: '#DC2626' },
      info: { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
      background: {
        default: mode === 'dark' ? '#0B0F1A' : '#F9FAFB',
        paper: mode === 'dark' ? '#111827' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#F9FAFB' : '#111827',
        secondary: mode === 'dark' ? '#9CA3AF' : '#6B7280',
        disabled: mode === 'dark' ? '#4B5563' : '#9CA3AF',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      surface: mode === 'dark' ? '#111827' : '#FFFFFF',
      surfaceElevated: mode === 'dark' ? '#1F2937' : '#F3F4F6',
      surfaceOverlay:
        mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
    },
    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3 },
      h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.35 },
      h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
      h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
      h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
      h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
      subtitle1: { fontSize: '0.875rem', fontWeight: 500, color: '#9CA3AF' },
      subtitle2: { fontSize: '0.75rem', fontWeight: 500, color: '#9CA3AF' },
      body1: { fontSize: '0.875rem', lineHeight: 1.6 },
      body2: { fontSize: '0.75rem', lineHeight: 1.5 },
      button: {
        textTransform: 'none' as const,
        fontWeight: 600,
        fontSize: '0.875rem',
      },
      caption: { fontSize: '0.75rem', color: '#6B7280' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: '#374151 transparent',
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none' as const,
            fontWeight: 600,
            padding: '8px 16px',
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #6366F1, #818CF8)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 2,
            '&.Mui-selected': {
              backgroundColor: 'rgba(99,102,241,0.15)',
              '&:hover': { backgroundColor: 'rgba(99,102,241,0.25)' },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
          },
          head: {
            fontWeight: 600,
            color: '#9CA3AF',
            fontSize: '0.75rem',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 600, fontSize: '0.75rem' } },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
            backgroundColor: 'rgba(255,255,255,0.08)',
          },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: 'rgba(255,255,255,0.06)' } },
      },
    },
  });
}

export default createAppTheme('dark');
