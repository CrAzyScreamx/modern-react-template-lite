# Plan

## Problem

The `modern-react-template-lite` project currently uses Tailwind CSS v4 for styling across all components. The goal is to completely replace Tailwind with MUI (Material UI) v6, using MUI primitives, a centralized dark theme via `createTheme`/`ThemeProvider`, and the `sx` prop for all styling — while retaining lucide-react icons and "MyApp" branding. The existing dashboard is minimal; the redesign expands it to a rich 5-layer dark dashboard.

## Approach

Strip every Tailwind dependency and all `className` usage from every component. Install `@mui/material`, `@emotion/react`, and `@emotion/styled`. Create a single `src/lib/theme.ts` that calls `createTheme` with `palette.mode: 'dark'`, custom surface/accent tokens, typography (Inter), `shape.borderRadius`, and component-level `styleOverrides` for `MuiCard`, `MuiButton`, `MuiDrawer`, `MuiAppBar`, `MuiListItemButton`, `MuiTableCell`, `MuiChip`, `MuiLinearProgress`. Wrap the app in `<ThemeProvider>` + `<CssBaseline />` in `main.tsx`. Rewrite every component using exclusively MUI primitives and the `sx` prop — zero Tailwind classes. Remove the Tailwind Vite plugin from `vite.config.ts`. Keep lucide-react for all icons; do NOT add `@mui/icons-material`.

## Areas

- Frontend only

## Files to touch

- **`package.json`** — add `@mui/material`, `@emotion/react`, `@emotion/styled`; remove `tailwindcss`, `@tailwindcss/vite`
- **`vite.config.ts`** — remove Tailwind plugin
- **`src/lib/theme.ts`** *(new)* — MUI `createTheme` with dark palette + component overrides
- **`src/main.tsx`** — wrap in `ThemeProvider` + `CssBaseline`
- **`src/index.css`** — replace Tailwind import with Inter font import
- **`src/App.tsx`** — MUI `Box` layout shell
- **`src/components/Navbar.tsx`** — MUI `AppBar` + `Toolbar`
- **`src/components/Sidebar.tsx`** — MUI permanent `Drawer`
- **`src/components/MainContent.tsx`** — 5-layer MUI dashboard
- **`src/components/Footer.tsx`** — MUI `Box` footer

## Theme spec

### src/lib/theme.ts

```ts
import { createTheme } from '@mui/material/styles';

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

const theme = createTheme({
  palette: {
    mode: 'dark',
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
    error:   { main: '#EF4444', light: '#F87171', dark: '#DC2626' },
    info:    { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
    background: {
      default: '#0B0F1A',
      paper:   '#111827',
    },
    text: {
      primary:   '#F9FAFB',
      secondary: '#9CA3AF',
      disabled:  '#4B5563',
    },
    divider: 'rgba(255,255,255,0.08)',
    surface:         '#111827',
    surfaceElevated: '#1F2937',
    surfaceOverlay:  'rgba(255,255,255,0.05)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3 },
    h2: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: 1.35 },
    h3: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    subtitle1: { fontSize: '0.875rem', fontWeight: 500, color: '#9CA3AF' },
    subtitle2: { fontSize: '0.75rem',  fontWeight: 500, color: '#9CA3AF' },
    body1: { fontSize: '0.875rem', lineHeight: 1.6 },
    body2: { fontSize: '0.75rem',  lineHeight: 1.5 },
    button: { textTransform: 'none' as const, fontWeight: 600, fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem', color: '#6B7280' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: '#1F2937',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.06)',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none' as const, fontWeight: 600, padding: '8px 16px' },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          '&:hover': { background: 'linear-gradient(135deg, #4F46E5, #6366F1)' },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: '#111827', borderBottom: '1px solid rgba(255,255,255,0.06)' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#111827', borderRight: '1px solid rgba(255,255,255,0.06)' },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, marginLeft: 8, marginRight: 8, marginBottom: 2,
          '&.Mui-selected': {
            backgroundColor: 'rgba(99,102,241,0.15)',
            '&:hover': { backgroundColor: 'rgba(99,102,241,0.25)' },
          },
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px' },
        head: { fontWeight: 600, color: '#9CA3AF', fontSize: '0.75rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: '0.75rem' } },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 8, backgroundColor: 'rgba(255,255,255,0.08)' },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: 'rgba(255,255,255,0.06)' } },
    },
  },
});

export default theme;
```

## Per-component spec

### package.json

Remove from devDeps: `tailwindcss`, `@tailwindcss/vite`
Add to deps: `@mui/material: ^6.0.0`, `@emotion/react: ^11.13.0`, `@emotion/styled: ^11.13.0`

### vite.config.ts

Remove `import tailwindcss from '@tailwindcss/vite'` and `tailwindcss()` from plugins. Keep `react()` plugin only.

### src/main.tsx

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './lib/theme';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

### src/index.css

Replace entire contents:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### App.tsx

```tsx
import Box from '@mui/material/Box';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

const DRAWER_WIDTH = 260;
const APPBAR_HEIGHT = 64;

export function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: `${DRAWER_WIDTH}px`, pt: `${APPBAR_HEIGHT}px`, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <MainContent />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
```

---

### Navbar.tsx

```tsx
// Imports:
// AppBar, Toolbar, InputBase, IconButton, Badge, Avatar, Typography, Box, Stack from @mui/material
// { Box as BoxIcon, Search, Bell } from 'lucide-react'  ← alias Box to avoid collision

<AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
  <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64, px: 3 }}>

    {/* Left: logo */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <BoxIcon size={24} color="#6366F1" />
      <Typography variant="h5" sx={{ fontWeight: 700 }}>MyApp</Typography>
    </Stack>

    {/* Center: search */}
    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, px: 2, py: 0.5, width: 320 }}>
      <Search size={18} style={{ color: '#9CA3AF', marginRight: 8 }} />
      <InputBase placeholder="Search..." sx={{ color: 'text.primary', flex: 1, fontSize: '0.875rem' }} />
    </Box>

    {/* Right: bell + avatar */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton sx={{ color: 'text.secondary' }}>
        <Badge badgeContent={3} color="error">
          <Bell size={20} />
        </Badge>
      </IconButton>
      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>JD</Avatar>
    </Stack>

  </Toolbar>
</AppBar>
```

---

### Sidebar.tsx

```tsx
// Imports:
// Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Avatar, Divider, Stack from @mui/material
// LayoutDashboard, FileText, Users, BarChart3, Settings, HelpCircle from 'lucide-react'

const DRAWER_WIDTH = 260;

const mainMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Reports',   icon: FileText,         active: false },
  { label: 'Users',     icon: Users,            active: false },
  { label: 'Analytics', icon: BarChart3,        active: false },
];
const bottomMenu = [
  { label: 'Settings', icon: Settings,   active: false },
  { label: 'Help',     icon: HelpCircle, active: false },
];

<Drawer variant="permanent" sx={{
  width: DRAWER_WIDTH, flexShrink: 0,
  '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', top: 64, height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' },
}}>

  <Typography variant="subtitle2" sx={{ px: 3, pt: 2, pb: 1, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.disabled' }}>
    Main
  </Typography>

  <List disablePadding>
    {mainMenu.map(({ label, icon: Icon, active }) => (
      <ListItemButton key={label} selected={active}>
        <ListItemIcon sx={{ minWidth: 36, color: active ? 'primary.main' : 'text.secondary' }}>
          <Icon size={20} />
        </ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400 }} />
      </ListItemButton>
    ))}
  </List>

  <Divider sx={{ my: 2 }} />

  <Typography variant="subtitle2" sx={{ px: 3, pb: 1, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.disabled' }}>
    Support
  </Typography>

  <List disablePadding>
    {bottomMenu.map(({ label, icon: Icon }) => (
      <ListItemButton key={label}>
        <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}><Icon size={20} /></ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
      </ListItemButton>
    ))}
  </List>

  <Box sx={{ flexGrow: 1 }} />

  {/* Profile card */}
  <Box sx={{ p: 2, mx: 1, mb: 1, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.04)' }}>
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>JD</Avatar>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>John Doe</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>john@myapp.com</Typography>
      </Box>
    </Stack>
  </Box>

</Drawer>
```

---

### MainContent.tsx

Single `<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>` wrapper.

#### Layer 1 — Header

```tsx
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  <Box>
    <Typography variant="h1">Dashboard</Typography>
    <Typography variant="subtitle1" sx={{ mt: 0.5 }}>Welcome back, John. Here's what's happening.</Typography>
  </Box>
  <Button variant="contained" startIcon={<Download size={18} />}>Export Report</Button>
</Box>
```

#### Layer 2 — KPI Cards

```ts
const kpiCards = [
  { label: 'Total Users',     value: '1,234',  trend: '+12.5%', trendUp: true,  icon: Users,       iconBg: 'rgba(99,102,241,0.15)',  iconColor: '#6366F1' },
  { label: 'Revenue',         value: '$45,678', trend: '+8.2%',  trendUp: true,  icon: DollarSign,  iconBg: 'rgba(34,197,94,0.15)',   iconColor: '#22C55E' },
  { label: 'Active Sessions', value: '892',    trend: '-3.1%',  trendUp: false, icon: Activity,    iconBg: 'rgba(245,158,11,0.15)',  iconColor: '#F59E0B' },
  { label: 'Growth',          value: '+12.5%', trend: '+4.6%',  trendUp: true,  icon: TrendingUp,  iconBg: 'rgba(59,130,246,0.15)',  iconColor: '#3B82F6' },
];
```

Grid with `Grid container spacing={3}`, each item `Grid size={{ xs: 12, sm: 6, xl: 3 }}`:

Each card:
```tsx
<Card>
  <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>{card.label}</Typography>
        <Typography variant="h2" sx={{ color: 'text.primary' }}>{card.value}</Typography>
        <Chip
          size="small"
          icon={card.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          label={card.trend}
          sx={{
            mt: 1.5,
            bgcolor: card.trendUp ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: card.trendUp ? 'success.main' : 'error.main',
            '& .MuiChip-icon': { color: 'inherit' },
          }}
        />
      </Box>
      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <card.icon size={24} color={card.iconColor} />
      </Box>
    </Box>
  </CardContent>
</Card>
```

#### Layer 3 — Revenue Chart + Traffic Channels

`Grid container spacing={3}`:

**Revenue** (`Grid size={{ xs: 12, lg: 8 }}`):

```ts
const revenueData = [
  { month: 'Jan', value: 45, amount: '$12k' },
  { month: 'Feb', value: 62, amount: '$18k' },
  { month: 'Mar', value: 55, amount: '$15k' },
  { month: 'Apr', value: 78, amount: '$24k' },
  { month: 'May', value: 85, amount: '$28k' },
  { month: 'Jun', value: 70, amount: '$21k' },
  { month: 'Jul', value: 92, amount: '$32k' },
  { month: 'Aug', value: 68, amount: '$20k' },
  { month: 'Sep', value: 80, amount: '$26k' },
  { month: 'Oct', value: 75, amount: '$23k' },
  { month: 'Nov', value: 88, amount: '$30k' },
  { month: 'Dec', value: 95, amount: '$35k' },
];
```

Bar chart in a `Card`:
```tsx
<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 200, mt: 2 }}>
  {revenueData.map((d) => (
    <Box key={d.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="caption">{d.amount}</Typography>
      <Box sx={{
        width: '100%', height: `${d.value}%`,
        bgcolor: 'primary.main', borderRadius: '4px 4px 0 0', minHeight: 4,
        '&:hover': { bgcolor: 'primary.light' },
      }} />
      <Typography variant="caption">{d.month}</Typography>
    </Box>
  ))}
</Box>
```

**Channels** (`Grid size={{ xs: 12, lg: 4 }}`):

```ts
const channels = [
  { channel: 'Organic Search', value: 45, color: '#6366F1' },
  { channel: 'Direct',         value: 28, color: '#22C55E' },
  { channel: 'Referral',       value: 18, color: '#F59E0B' },
  { channel: 'Social Media',   value:  9, color: '#3B82F6' },
];
```

Per channel:
```tsx
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
  <Typography variant="body1">{ch.channel}</Typography>
  <Typography variant="body1" sx={{ fontWeight: 600 }}>{ch.value}%</Typography>
</Box>
<LinearProgress variant="determinate" value={ch.value}
  sx={{ '& .MuiLinearProgress-bar': { bgcolor: ch.color } }} />
```

#### Layer 4 — Transactions Table

```ts
const transactions = [
  { id: '#TXN-1234', customer: 'Alice Johnson', email: 'alice@example.com', amount: '$1,250.00', date: 'Apr 23, 2026', status: 'completed' },
  { id: '#TXN-1235', customer: 'Bob Smith',     email: 'bob@example.com',   amount: '$890.00',  date: 'Apr 22, 2026', status: 'pending' },
  { id: '#TXN-1236', customer: 'Carol White',   email: 'carol@example.com', amount: '$2,100.00',date: 'Apr 21, 2026', status: 'completed' },
  { id: '#TXN-1237', customer: 'David Brown',   email: 'david@example.com', amount: '$450.00',  date: 'Apr 20, 2026', status: 'failed' },
  { id: '#TXN-1238', customer: 'Eva Martinez',  email: 'eva@example.com',   amount: '$3,200.00',date: 'Apr 19, 2026', status: 'completed' },
];

const statusChip = {
  completed: { bgcolor: 'rgba(34,197,94,0.1)',  color: '#22C55E' },
  pending:   { bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  failed:    { bgcolor: 'rgba(239,68,68,0.1)',  color: '#EF4444' },
} as const;
```

Table in `Card`: `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell`. Customer cell uses `Stack direction="row"` with `Avatar` (initials = first letters of each name word) + name + email stacked.

Columns: Transaction ID, Customer, Amount, Date, Status (Chip), Actions (IconButton + MoreHorizontal).

#### Layer 5 — Team Members + Quick Actions

`Grid container spacing={3}`:

**Team** (`Grid size={{ xs: 12, lg: 6 }}`):

```ts
const teamMembers = [
  { name: 'John Doe',   role: 'Lead Developer', initials: 'JD', status: 'Online', statusColor: '#22C55E',  statusBg: 'rgba(34,197,94,0.1)' },
  { name: 'Sarah Kim',  role: 'UI Designer',    initials: 'SK', status: 'Online', statusColor: '#22C55E',  statusBg: 'rgba(34,197,94,0.1)' },
  { name: 'Mike Chen',  role: 'Backend Dev',    initials: 'MC', status: 'Away',   statusColor: '#F59E0B',  statusBg: 'rgba(245,158,11,0.1)' },
  { name: 'Lisa Park',  role: 'QA Engineer',    initials: 'LP', status: 'Offline',statusColor: '#4B5563',  statusBg: 'rgba(255,255,255,0.05)' },
];
```

**Quick Actions** (`Grid size={{ xs: 12, lg: 6 }}`):

```ts
const quickActions = [
  { label: 'Send Invoice',      icon: Mail,     iconBg: 'rgba(99,102,241,0.15)',  iconColor: '#6366F1' },
  { label: 'Schedule Meeting',  icon: Calendar, iconBg: 'rgba(34,197,94,0.15)',   iconColor: '#22C55E' },
  { label: 'Create Report',     icon: FileText, iconBg: 'rgba(59,130,246,0.15)',  iconColor: '#3B82F6' },
  { label: 'Quick Deploy',      icon: Zap,      iconBg: 'rgba(245,158,11,0.15)',  iconColor: '#F59E0B' },
];
```

Each action tile:
```tsx
<Box sx={{
  p: 2.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', transform: 'translateY(-2px)' },
  textAlign: 'center',
}}>
  <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: action.iconBg, mx: 'auto', mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <action.icon size={22} color={action.iconColor} />
  </Box>
  <Typography variant="body1" sx={{ fontWeight: 600 }}>{action.label}</Typography>
</Box>
```

**MainContent lucide imports:** `Users, DollarSign, Activity, TrendingUp, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal, Mail, Calendar, FileText, Zap`

---

### Footer.tsx

```tsx
// Imports: Box, Typography, IconButton, Stack from @mui/material
// Github, Twitter, Linkedin from 'lucide-react'

<Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', py: 3, px: 4 }}>
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      © 2026 MyApp. All rights reserved.
    </Typography>
    <Stack direction="row" spacing={1}>
      {[Github, Twitter, Linkedin].map((Icon, i) => (
        <IconButton key={i} size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
          <Icon size={18} />
        </IconButton>
      ))}
    </Stack>
  </Stack>
</Box>
```

## Preview pages

- `/` — the single-page dark dashboard (all content visible on root route)

## Risks

- **MUI v6 + React 19 peer deps:** The project uses React 19.2. MUI v6 peer dep is React 18+. May need `--legacy-peer-deps` or `overrides` in package.json. Workers should run `npm install --legacy-peer-deps` if needed.
- **`Box` naming collision:** `Box` from `@mui/material` and `Box` from `lucide-react` collide in Navbar. Use `import { Box as BoxIcon } from 'lucide-react'`.
- **Custom palette tokens:** `surface`, `surfaceElevated`, `surfaceOverlay` require the TypeScript `declare module` augmentation shown in theme.ts or TS will error on `theme.palette.surface`.
- **Inter font CDN:** Uses Google Fonts. If network is unavailable at dev time, font falls back to system stack gracefully.
- **`lucide-react` Twitter icon:** In recent versions may be named `X`. If `Twitter` causes an import error, use `import { X as Twitter } from 'lucide-react'`.
- **Vite config changes:** After removing `@tailwindcss/vite`, verify `vite.config.ts` does not still reference the import (would cause a build error).

## Out of scope

- React Router / page navigation
- Backend/API integration
- Authentication
- Mobile responsive sidebar toggle
- Dark/light theme toggle
- Unit test migration
- `@mui/icons-material`
- New npm packages beyond MUI + Emotion
