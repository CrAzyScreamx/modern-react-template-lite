import { useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { ReportsContent } from './components/ReportsContent';
import { MetricsDashboard } from './components/MetricsDashboard';
import { Footer } from './components/Footer';

export const DRAWER_WIDTH = 260;
export const APPBAR_HEIGHT = 64;

export function App() {
  const isMobile = useMediaQuery('(max-width:767px)');
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setMobileSidebarOpen((o) => !o);

  function renderPage() {
    if (activePage === 'Reports') return <ReportsContent />;
    if (activePage === 'Metrics') return <MetricsDashboard />;
    return <MainContent />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Navbar onMenuToggle={isMobile ? toggleSidebar : undefined} />
      <Sidebar
        open={isMobile ? mobileSidebarOpen : true}
        variant={isMobile ? 'temporary' : 'permanent'}
        activePage={activePage}
        onNavigate={(label) => {
          setActivePage(label);
          if (isMobile) setMobileSidebarOpen(false);
        }}
        onClose={() => setMobileSidebarOpen(false)}
      />
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
          {renderPage()}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
