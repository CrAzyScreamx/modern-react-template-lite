import { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { ReportsContent } from './components/ReportsContent';
import { SettingsContent } from './components/SettingsContent';
import { Footer } from './components/Footer';

export const DRAWER_WIDTH = 260;
export const APPBAR_HEIGHT = 64;

export function App() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [activePage, setActivePage] = useState<string>('Dashboard');

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <Sidebar open={isDesktop} activePage={activePage} onNavigate={setActivePage} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          pt: `${APPBAR_HEIGHT}px`,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            p: 3,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {activePage === 'Reports' ? <ReportsContent /> : activePage === 'Settings' ? <SettingsContent /> : <MainContent />}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
