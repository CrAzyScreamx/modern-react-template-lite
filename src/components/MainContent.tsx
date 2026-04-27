import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
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
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Mail,
  Calendar,
  FileText,
  Zap,
} from 'lucide-react';

const kpiCards = [
  {
    label: 'Total Users',
    value: '1,234',
    trend: '+12.5%',
    trendUp: true,
    icon: Users,
    iconBg: 'rgba(99,102,241,0.15)',
    iconColor: '#6366F1',
  },
  {
    label: 'Revenue',
    value: '$45,678',
    trend: '+8.2%',
    trendUp: true,
    icon: DollarSign,
    iconBg: 'rgba(34,197,94,0.15)',
    iconColor: '#22C55E',
  },
  {
    label: 'Active Sessions',
    value: '892',
    trend: '-3.1%',
    trendUp: false,
    icon: Activity,
    iconBg: 'rgba(245,158,11,0.15)',
    iconColor: '#F59E0B',
  },
  {
    label: 'Growth',
    value: '+12.5%',
    trend: '+4.6%',
    trendUp: true,
    icon: TrendingUp,
    iconBg: 'rgba(59,130,246,0.15)',
    iconColor: '#3B82F6',
  },
];

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

const channels = [
  { channel: 'Organic Search', value: 45, color: '#6366F1' },
  { channel: 'Direct', value: 28, color: '#22C55E' },
  { channel: 'Referral', value: 18, color: '#F59E0B' },
  { channel: 'Social Media', value: 9, color: '#3B82F6' },
];

const transactions = [
  {
    id: '#TXN-1234',
    customer: 'Alice Johnson',
    email: 'alice@example.com',
    amount: '$1,250.00',
    date: 'Apr 23, 2026',
    status: 'completed' as const,
  },
  {
    id: '#TXN-1235',
    customer: 'Bob Smith',
    email: 'bob@example.com',
    amount: '$890.00',
    date: 'Apr 22, 2026',
    status: 'pending' as const,
  },
  {
    id: '#TXN-1236',
    customer: 'Carol White',
    email: 'carol@example.com',
    amount: '$2,100.00',
    date: 'Apr 21, 2026',
    status: 'completed' as const,
  },
  {
    id: '#TXN-1237',
    customer: 'David Brown',
    email: 'david@example.com',
    amount: '$450.00',
    date: 'Apr 20, 2026',
    status: 'failed' as const,
  },
  {
    id: '#TXN-1238',
    customer: 'Eva Martinez',
    email: 'eva@example.com',
    amount: '$3,200.00',
    date: 'Apr 19, 2026',
    status: 'completed' as const,
  },
];

const statusStyle = {
  completed: { bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E' },
  pending: { bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  failed: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
};

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Lead Developer',
    initials: 'JD',
    status: 'Online',
    statusColor: '#22C55E',
    statusBg: 'rgba(34,197,94,0.1)',
  },
  {
    name: 'Sarah Kim',
    role: 'UI Designer',
    initials: 'SK',
    status: 'Online',
    statusColor: '#22C55E',
    statusBg: 'rgba(34,197,94,0.1)',
  },
  {
    name: 'Mike Chen',
    role: 'Backend Dev',
    initials: 'MC',
    status: 'Away',
    statusColor: '#F59E0B',
    statusBg: 'rgba(245,158,11,0.1)',
  },
  {
    name: 'Lisa Park',
    role: 'QA Engineer',
    initials: 'LP',
    status: 'Offline',
    statusColor: '#4B5563',
    statusBg: 'rgba(255,255,255,0.05)',
  },
];

const quickActions = [
  {
    label: 'Send Invoice',
    icon: Mail,
    iconBg: 'rgba(99,102,241,0.15)',
    iconColor: '#6366F1',
  },
  {
    label: 'Schedule Meeting',
    icon: Calendar,
    iconBg: 'rgba(34,197,94,0.15)',
    iconColor: '#22C55E',
  },
  {
    label: 'Create Report',
    icon: FileText,
    iconBg: 'rgba(59,130,246,0.15)',
    iconColor: '#3B82F6',
  },
  {
    label: 'Quick Deploy',
    icon: Zap,
    iconBg: 'rgba(245,158,11,0.15)',
    iconColor: '#F59E0B',
  },
];

export function MainContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Layer 1 — Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography variant="h1">Dashboard</Typography>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Welcome back, John. Here&apos;s what&apos;s happening.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Download size={18} />}>
          Export Report
        </Button>
      </Box>

      {/* Layer 2 — KPI Cards */}
      <Grid container spacing={3}>
        {kpiCards.map((card) => (
          <Grid key={card.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Card>
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      {card.label}
                    </Typography>
                    <Typography variant="h2" sx={{ color: 'text.primary' }}>
                      {card.value}
                    </Typography>
                    <Chip
                      size="small"
                      icon={
                        card.trendUp ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )
                      }
                      label={card.trend}
                      sx={{
                        mt: 1.5,
                        bgcolor: card.trendUp
                          ? 'rgba(34,197,94,0.1)'
                          : 'rgba(239,68,68,0.1)',
                        color: card.trendUp ? 'success.main' : 'error.main',
                        '& .MuiChip-icon': { color: 'inherit' },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: card.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <card.icon size={24} color={card.iconColor} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Layer 3 — Revenue Chart + Traffic Channels */}
      <Grid container spacing={3}>
        {/* Revenue */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Revenue Overview
              </Typography>
              <Typography variant="subtitle2">Jan – Dec 2026</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 1.5,
                  height: 200,
                  mt: 3,
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
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', fontSize: '0.65rem' }}
                    >
                      {d.amount}
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: `${d.value}%`,
                        bgcolor: 'primary.main',
                        borderRadius: '4px 4px 0 0',
                        minHeight: 4,
                        transition: 'background-color 0.2s',
                        '&:hover': { bgcolor: 'primary.light' },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', fontSize: '0.65rem' }}
                    >
                      {d.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Channels */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Traffic Channels
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 3 }}>
                This month
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {channels.map((ch) => (
                  <Box key={ch.channel}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body1">{ch.channel}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {ch.value}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={ch.value}
                      sx={{ '& .MuiLinearProgress-bar': { bgcolor: ch.color } }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Layer 4 — Transactions Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Recent Transactions
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    sx={{ '&:last-child td': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontFamily: 'monospace',
                        }}
                      >
                        {tx.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            fontSize: '0.75rem',
                          }}
                        >
                          {tx.customer
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {tx.customer}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                          >
                            {tx.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {tx.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
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
                          bgcolor: statusStyle[tx.status].bgcolor,
                          color: statusStyle[tx.status].color,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <MoreHorizontal size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Layer 5 — Team Members + Quick Actions */}
      <Grid container spacing={3}>
        {/* Team */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Team Members
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {teamMembers.map((m) => (
                  <Stack
                    key={m.name}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar
                        sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}
                      >
                        {m.initials}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {m.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary' }}
                        >
                          {m.role}
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip
                      size="small"
                      label={m.status}
                      sx={{ bgcolor: m.statusBg, color: m.statusColor }}
                    />
                  </Stack>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action) => (
                  <Grid key={action.label} size={{ xs: 6 }}>
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.06)',
                          transform: 'translateY(-2px)',
                        },
                        textAlign: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          bgcolor: action.iconBg,
                          mx: 'auto',
                          mb: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <action.icon size={22} color={action.iconColor} />
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {action.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
