import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingDown,
  TrendingUp,
  MoreHorizontal,
  UserMinus,
  Activity,
  Download,
} from 'lucide-react';

// --- Data ---
const kpiCards = [
  {
    label: 'Total Users',
    value: '12,847',
    trend: '+9.4%',
    up: true,
    icon: Users,
    bg: 'rgba(99,102,241,0.15)',
    color: '#6366F1',
  },
  {
    label: 'Active Now',
    value: '1,023',
    trend: '+4.1%',
    up: true,
    icon: UserCheck,
    bg: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
  },
  {
    label: 'New This Month',
    value: '348',
    trend: '+21.7%',
    up: true,
    icon: UserPlus,
    bg: 'rgba(59,130,246,0.15)',
    color: '#3B82F6',
  },
  {
    label: 'Churn Rate',
    value: '2.3%',
    trend: '+0.4%',
    up: false,
    icon: UserMinus,
    bg: 'rgba(239,68,68,0.15)',
    color: '#EF4444',
  },
];

type UserStatus = 'active' | 'inactive' | 'pending' | 'banned';

const users: {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  email: string;
  role: string;
  status: UserStatus;
  joined: string;
}[] = [
  {
    id: 'USR-001',
    name: 'Alice Johnson',
    initials: 'AJ',
    avatarColor: '#6366F1',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    joined: 'Jan 12, 2025',
  },
  {
    id: 'USR-002',
    name: 'Bob Smith',
    initials: 'BS',
    avatarColor: '#22C55E',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'active',
    joined: 'Feb 3, 2025',
  },
  {
    id: 'USR-003',
    name: 'Carol White',
    initials: 'CW',
    avatarColor: '#F59E0B',
    email: 'carol@example.com',
    role: 'Viewer',
    status: 'inactive',
    joined: 'Mar 19, 2025',
  },
  {
    id: 'USR-004',
    name: 'David Brown',
    initials: 'DB',
    avatarColor: '#3B82F6',
    email: 'david@example.com',
    role: 'Editor',
    status: 'pending',
    joined: 'Apr 1, 2025',
  },
  {
    id: 'USR-005',
    name: 'Eve Martinez',
    initials: 'EM',
    avatarColor: '#EC4899',
    email: 'eve@example.com',
    role: 'Viewer',
    status: 'banned',
    joined: 'Apr 10, 2025',
  },
  {
    id: 'USR-006',
    name: 'Frank Lee',
    initials: 'FL',
    avatarColor: '#14B8A6',
    email: 'frank@example.com',
    role: 'Admin',
    status: 'active',
    joined: 'Nov 5, 2024',
  },
];

const statusSx: Record<UserStatus, { bgcolor: string; color: string }> = {
  active: { bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E' },
  inactive: { bgcolor: 'rgba(148,163,184,0.1)', color: '#94A3B8' },
  pending: { bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  banned: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
};

const roleSx: Record<string, { bgcolor: string; color: string }> = {
  Admin: { bgcolor: 'rgba(99,102,241,0.12)', color: '#6366F1' },
  Editor: { bgcolor: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  Viewer: { bgcolor: 'rgba(148,163,184,0.12)', color: '#94A3B8' },
};

const roleDistribution = [
  { label: 'Admin', value: 8, color: '#6366F1' },
  { label: 'Editor', value: 35, color: '#3B82F6' },
  { label: 'Viewer', value: 57, color: '#22C55E' },
];

const recentActivity = [
  { name: 'Alice Johnson', initials: 'AJ', color: '#6366F1', action: 'Updated profile settings', time: '2m ago' },
  { name: 'Frank Lee', initials: 'FL', color: '#14B8A6', action: 'Invited 3 new members', time: '18m ago' },
  { name: 'Bob Smith', initials: 'BS', color: '#22C55E', action: 'Exported user report', time: '1h ago' },
  { name: 'David Brown', initials: 'DB', color: '#3B82F6', action: 'Account pending approval', time: '3h ago' },
];

const growthData = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 60 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 78 },
  { month: 'Jul', value: 83 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 90 },
  { month: 'Oct', value: 87 },
  { month: 'Nov', value: 94 },
  { month: 'Dec', value: 100 },
];

const recentlyActive = [
  { name: 'Alice Johnson', initials: 'AJ', color: '#6366F1', role: 'Admin', lastSeen: '2m ago', sessions: 14 },
  { name: 'Frank Lee', initials: 'FL', color: '#14B8A6', role: 'Admin', lastSeen: '18m ago', sessions: 9 },
  { name: 'Bob Smith', initials: 'BS', color: '#22C55E', role: 'Editor', lastSeen: '1h ago', sessions: 22 },
  { name: 'Carol White', initials: 'CW', color: '#F59E0B', role: 'Viewer', lastSeen: '4h ago', sessions: 3 },
];

export function UsersContent() {
  return (
    <Box
      sx={{
        display: 'grid',
        height: '100%',
        gridTemplateRows: 'auto 1fr 160px',
        gridTemplateColumns: '1fr 280px',
        gap: 1.5,
      }}
    >
      {/* ── Row 1: Header + KPI chips ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gridColumn: '1 / -1',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Users
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Manage accounts, roles, and activity
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {kpiCards.map((k) => (
            <Card
              key={k.label}
              sx={{
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                minWidth: 140,
              }}
            >
              <Box
                sx={{ p: 1, borderRadius: 1.5, bgcolor: k.bg, display: 'flex' }}
              >
                <k.icon size={16} color={k.color} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    lineHeight: 1.2,
                  }}
                >
                  {k.label}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'text.primary',
                    }}
                  >
                    {k.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      color: k.up ? '#22C55E' : '#EF4444',
                      fontWeight: 600,
                    }}
                  >
                    {k.trend}
                  </Typography>
                </Stack>
              </Box>
            </Card>
          ))}
          <Button
            variant="contained"
            size="small"
            startIcon={<Download size={14} />}
            sx={{ flexShrink: 0 }}
          >
            Export
          </Button>
        </Stack>
      </Box>

      {/* Left col top: Users Table */}
      <Card sx={{ minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Users size={14} color="#6366F1" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              All Users
            </Typography>
          </Stack>
        </CardContent>
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: u.avatarColor,
                          fontSize: '0.65rem',
                          fontWeight: 700,
                        }}
                      >
                        {u.initials}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.2 }}>
                          {u.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                          {u.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {u.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={u.role}
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...roleSx[u.role],
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...statusSx[u.status],
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {u.joined}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ p: 0.25, color: 'text.secondary' }}>
                      <MoreHorizontal size={14} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Right col: stacked panels */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        {/* Role Distribution */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              Role Distribution
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {roleDistribution.map((r) => (
                <Box key={r.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.25 }}
                  >
                    <Typography variant="caption">{r.label}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {r.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={r.value}
                    sx={{
                      height: 5,
                      '& .MuiLinearProgress-bar': { bgcolor: r.color },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Activity size={14} color="#6366F1" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {recentActivity.map((a, i) => (
                <Stack key={i} direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: a.color,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {a.initials}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.2 }}>
                      {a.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.62rem', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {a.action}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', flexShrink: 0 }}>
                    {a.time}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* User Growth mini bar chart */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUp size={14} color="#22C55E" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  User Growth
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.65rem', color: '#22C55E', fontWeight: 600 }}>
                +21.7%
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 0.5,
                height: 52,
              }}
            >
              {growthData.map((d) => (
                <Box
                  key={d.month}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.25,
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: `${d.value}%`,
                        bgcolor: 'primary.main',
                        borderRadius: '2px 2px 0 0',
                        minHeight: 2,
                        '&:hover': { bgcolor: 'primary.light' },
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.25 }}>
              <Typography sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>Jan</Typography>
              <Typography sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>Jun</Typography>
              <Typography sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>Dec</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Left col bottom: Recently Active compact table */}
      <Card sx={{ minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recently Active
          </Typography>
        </CardContent>
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Last Seen</TableCell>
                <TableCell align="right">Sessions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentlyActive.map((u) => (
                <TableRow key={u.name}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: u.color,
                          fontSize: '0.6rem',
                          fontWeight: 700,
                        }}
                      >
                        {u.initials}
                      </Avatar>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {u.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={u.role}
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...roleSx[u.role],
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {u.lastSeen}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5}>
                      <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
                        {u.sessions}
                      </Typography>
                      <TrendingDown size={11} color="#94A3B8" />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
