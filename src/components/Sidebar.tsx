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

const DRAWER_WIDTH = 260;

const mainMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Reports', icon: FileText, active: false },
  { label: 'Users', icon: Users, active: false },
  { label: 'Analytics', icon: BarChart3, active: false },
];

const bottomMenu = [
  { label: 'Settings', icon: Settings, active: false },
  { label: 'Help', icon: HelpCircle, active: false },
];

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: 64,
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
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
        {mainMenu.map(({ label, icon: Icon, active }) => (
          <ListItemButton key={label} selected={active}>
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
        ))}
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
