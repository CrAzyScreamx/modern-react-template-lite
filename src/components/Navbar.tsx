import { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Box as BoxIcon, Search, Bell, Moon, Sun } from 'lucide-react';
import { useColorTheme } from '../context/ThemeContext';

export function Navbar() {
  const { mode, toggleTheme } = useColorTheme();

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64, px: 3 }}>
        {/* Left: logo */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <BoxIcon size={24} color="#6366F1" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            MyApp
          </Typography>
        </Stack>

        {/* Center: search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            width: 320,
          }}
        >
          <Search size={18} style={{ color: '#9CA3AF', marginRight: 8 }} />
          <InputBase
            placeholder="Search..."
            sx={{ color: 'text.primary', flex: 1, fontSize: '0.875rem' }}
          />
        </Box>

        {/* Right: theme toggle + bell + avatar */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            onClick={handleToggleTheme}
            aria-pressed={mode === 'dark'}
            aria-label="Toggle dark mode"
            sx={{
              color: 'text.secondary',
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
            }}
          >
            JD
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
