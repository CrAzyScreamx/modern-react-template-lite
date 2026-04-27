import Box from '@mui/material/Box';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

const DRAWER_WIDTH = 260;
const APPBAR_HEIGHT = 64;

export function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          ml: `${DRAWER_WIDTH}px`,
          pt: `${APPBAR_HEIGHT}px`,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <MainContent />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
