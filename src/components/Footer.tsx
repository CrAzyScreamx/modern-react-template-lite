import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        py: 3,
        px: 4,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          © 2026 MyApp. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={1}>
          {([Github, Twitter, Linkedin] as const).map((Icon, i) => (
            <IconButton
              key={i}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <Icon size={18} />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
