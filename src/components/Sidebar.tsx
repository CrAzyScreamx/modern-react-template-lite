import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
} from 'lucide-react';

import { DRAWER_WIDTH, APPBAR_HEIGHT } from '../App';

const mainMenu = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Reports', icon: FileText },
  { label: 'Users', icon: Users },
  { label: 'Analytics', icon: BarChart3 },
];

const bottomMenu = [
  { label: 'Settings', icon: Settings },
  { label: 'Help', icon: HelpCircle },
];

interface SidebarProps {
  open?: boolean;
  activePage?: string;
  onNavigate?: (label: string) => void;
}

export function Sidebar({ open = true, activePage = 'Dashboard', onNavigate }: SidebarProps) {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: 'width 0.2s',
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: APPBAR_HEIGHT,
          height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'none' : `translateX(-${DRAWER_WIDTH}px)`,
          transition: 'transform 0.2s',
          overflowX: 'hidden',
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          px: 3,
          pt: 2,
          pb: 1,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'text.disabled',
        }}
      >
        Main
      </Typography>

      <List disablePadding>
        {mainMenu.map(({ label, icon: Icon }) => {
          const active = activePage === label;
          return (
            <ListItemButton key={label} selected={active} onClick={() => onNavigate?.(label)}>
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: active ? 'primary.main' : 'text.secondary',
                }}
              >
                <Icon size={20} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="subtitle2"
        sx={{
          px: 3,
          pb: 1,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'text.disabled',
        }}
      >
        Support
      </Typography>

      <List disablePadding>
        {bottomMenu.map(({ label, icon: Icon }) => (
          <ListItemButton key={label}>
            <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
              <Icon size={20} />
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ fontSize: '0.875rem' }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Profile card */}
      <Box
        sx={{
          p: 2,
          mx: 1,
          mb: 1,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.04)',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
            JD
          </Avatar>
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              John Doe
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              john@myapp.com
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
