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
  DollarSign,
  Activity,
  TrendingUp,
  MoreHorizontal,
  Mail,
  Calendar,
  FileText,
  Zap,
  Download,
} from 'lucide-react';

// --- Data ---
const kpiCards = [
  {
    label: 'Total Users',
    value: '1,234',
    trend: '+12.5%',
    up: true,
    icon: Users,
    bg: 'rgba(99,102,241,0.15)',
    color: '#6366F1',
  },
  {
    label: 'Revenue',
    value: '$45,678',
    trend: '+8.2%',
    up: true,
    icon: DollarSign,
    bg: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
  },
  {
    label: 'Active Sessions',
    value: '892',
    trend: '-3.1%',
    up: false,
    icon: Activity,
    bg: 'rgba(245,158,11,0.15)',
    color: '#F59E0B',
  },
  {
    label: 'Growth',
    value: '+12.5%',
    trend: '+4.6%',
    up: true,
    icon: TrendingUp,
    bg: 'rgba(59,130,246,0.15)',
    color: '#3B82F6',
  },
];

const revenueData = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 62 },
  { month: 'Mar', value: 55 },
  { month: 'Apr', value: 78 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 70 },
  { month: 'Jul', value: 92 },
  { month: 'Aug', value: 68 },
  { month: 'Sep', value: 80 },
  { month: 'Oct', value: 75 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 95 },
];

const channels = [
  { label: 'Organic', value: 45, color: '#6366F1' },
  { label: 'Direct', value: 28, color: '#22C55E' },
  { label: 'Referral', value: 18, color: '#F59E0B' },
  { label: 'Social', value: 9, color: '#3B82F6' },
];

const transactions = [
  {
    id: '#1234',
    name: 'Alice Johnson',
    amount: '$1,250',
    date: 'Apr 23',
    status: 'completed' as const,
  },
  {
    id: '#1235',
    name: 'Bob Smith',
    amount: '$890',
    date: 'Apr 22',
    status: 'pending' as const,
  },
  {
    id: '#1236',
    name: 'Carol White',
    amount: '$2,100',
    date: 'Apr 21',
    status: 'completed' as const,
  },
  {
    id: '#1237',
    name: 'David Brown',
    amount: '$450',
    date: 'Apr 20',
    status: 'failed' as const,
  },
];

const statusSx = {
  completed: { bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E' },
  pending: { bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  failed: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
};

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Lead Dev',
    initials: 'JD',
    statusColor: '#22C55E',
    statusBg: 'rgba(34,197,94,0.1)',
    status: 'Online',
  },
  {
    name: 'Sarah Kim',
    role: 'Designer',
    initials: 'SK',
    statusColor: '#22C55E',
    statusBg: 'rgba(34,197,94,0.1)',
    status: 'Online',
  },
  {
    name: 'Mike Chen',
    role: 'Backend Dev',
    initials: 'MC',
    statusColor: '#F59E0B',
    statusBg: 'rgba(245,158,11,0.1)',
    status: 'Away',
  },
  {
    name: 'Lisa Park',
    role: 'QA Engineer',
    initials: 'LP',
    statusColor: '#4B5563',
    statusBg: 'rgba(255,255,255,0.05)',
    status: 'Offline',
  },
];

const quickActions = [
  {
    label: 'Invoice',
    icon: Mail,
    bg: 'rgba(99,102,241,0.15)',
    color: '#6366F1',
  },
  {
    label: 'Meeting',
    icon: Calendar,
    bg: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
  },
  {
    label: 'Report',
    icon: FileText,
    bg: 'rgba(59,130,246,0.15)',
    color: '#3B82F6',
  },
  { label: 'Deploy', icon: Zap, bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' },
];

export function MainContent() {
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
            Welcome, Amit 👋
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Here's your dashboard — here's what's happening today.
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

      {/* Left col top: Revenue Chart */}
      <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Revenue Overview
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Jan – Dec 2026
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <Box
          sx={{
            flexGrow: 1,
            px: 2,
            pb: 2,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
            minHeight: 0,
          }}
        >
          {revenueData.map((d) => (
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
                    borderRadius: '3px 3px 0 0',
                    minHeight: 2,
                    '&:hover': { bgcolor: 'primary.light' },
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                {d.month}
              </Typography>
            </Box>
          ))}
        </Box>
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
        {/* Channels */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              Channels
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {channels.map((ch) => (
                <Box key={ch.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.25 }}
                  >
                    <Typography variant="caption">{ch.label}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {ch.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={ch.value}
                    sx={{
                      height: 5,
                      '& .MuiLinearProgress-bar': { bgcolor: ch.color },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Team */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Team
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {teamMembers.map((m) => (
                <Stack
                  key={m.name}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: 'primary.main',
                        fontSize: '0.65rem',
                      }}
                    >
                      {m.initials}
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          lineHeight: 1.2,
                        }}
                      >
                        {m.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '0.65rem', color: 'text.secondary' }}
                      >
                        {m.role}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    size="small"
                    label={m.status}
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      bgcolor: m.statusBg,
                      color: m.statusColor,
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Quick Actions
            </Typography>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}
            >
              {quickActions.map((a) => (
                <Box
                  key={a.label}
                  sx={{
                    p: 1.25,
                    borderRadius: 1.5,
                    bgcolor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' },
                  }}
                >
                  <Box
                    sx={{
                      p: 0.75,
                      borderRadius: 1,
                      bgcolor: a.bg,
                      display: 'flex',
                    }}
                  >
                    <a.icon size={14} color={a.color} />
                  </Box>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 600 }}>
                    {a.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Left col bottom: Transactions */}
      <Card
        sx={{
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Transactions
          </Typography>
        </CardContent>
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        color: 'text.secondary',
                      }}
                    >
                      {tx.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: 'primary.main',
                          fontSize: '0.6rem',
                        }}
                      >
                        {tx.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Avatar>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {tx.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tx.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {tx.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        tx.status.charAt(0).toUpperCase() + tx.status.slice(1)
                      }
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...statusSx[tx.status],
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      sx={{ p: 0.25, color: 'text.secondary' }}
                    >
                      <MoreHorizontal size={14} />
                    </IconButton>
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
