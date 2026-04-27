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
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

// --- Data ---
const kpiCards = [
  {
    label: 'Total Reports',
    value: '2,847',
    trend: '+18.3%',
    up: true,
    icon: FileText,
    bg: 'rgba(99,102,241,0.15)',
    color: '#6366F1',
  },
  {
    label: 'Avg. Processing',
    value: '1.4s',
    trend: '-22.1%',
    up: true,
    icon: Clock,
    bg: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
  },
  {
    label: 'Success Rate',
    value: '98.7%',
    trend: '+0.5%',
    up: true,
    icon: CheckCircle,
    bg: 'rgba(59,130,246,0.15)',
    color: '#3B82F6',
  },
  {
    label: 'Pending Reviews',
    value: '14',
    trend: '+3',
    up: false,
    icon: AlertCircle,
    bg: 'rgba(245,158,11,0.15)',
    color: '#F59E0B',
  },
];

const volumeData = [
  { month: 'Jan', value: 52 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 61 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 74 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 85 },
  { month: 'Aug', value: 77 },
  { month: 'Sep', value: 93 },
  { month: 'Oct', value: 88 },
  { month: 'Nov', value: 95 },
  { month: 'Dec', value: 100 },
];

const categories = [
  { label: 'Financial', value: 38, color: '#6366F1' },
  { label: 'Operational', value: 27, color: '#22C55E' },
  { label: 'Compliance', value: 22, color: '#F59E0B' },
  { label: 'Custom', value: 13, color: '#3B82F6' },
];

type ReportStatus = 'ready' | 'processing' | 'failed' | 'scheduled';

const reports: {
  id: string;
  name: string;
  type: string;
  generatedBy: string;
  initials: string;
  date: string;
  status: ReportStatus;
}[] = [
  {
    id: 'RPT-0091',
    name: 'Q1 Financial Summary',
    type: 'Financial',
    generatedBy: 'Alice Johnson',
    initials: 'AJ',
    date: 'Apr 26, 2026',
    status: 'ready',
  },
  {
    id: 'RPT-0090',
    name: 'Ops Efficiency Review',
    type: 'Operational',
    generatedBy: 'Bob Smith',
    initials: 'BS',
    date: 'Apr 25, 2026',
    status: 'ready',
  },
  {
    id: 'RPT-0089',
    name: 'SOC 2 Compliance Audit',
    type: 'Compliance',
    generatedBy: 'Carol White',
    initials: 'CW',
    date: 'Apr 24, 2026',
    status: 'processing',
  },
  {
    id: 'RPT-0088',
    name: 'Custom KPI Dashboard',
    type: 'Custom',
    generatedBy: 'David Brown',
    initials: 'DB',
    date: 'Apr 23, 2026',
    status: 'failed',
  },
  {
    id: 'RPT-0087',
    name: 'Monthly Revenue Report',
    type: 'Financial',
    generatedBy: 'Eve Martinez',
    initials: 'EM',
    date: 'Apr 22, 2026',
    status: 'scheduled',
  },
];

const statusSx: Record<ReportStatus, { bgcolor: string; color: string }> = {
  ready: { bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E' },
  processing: { bgcolor: 'rgba(59,130,246,0.1)', color: '#3B82F6' },
  failed: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
  scheduled: { bgcolor: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
};

const typeSx: Record<string, { bgcolor: string; color: string }> = {
  Financial: { bgcolor: 'rgba(99,102,241,0.12)', color: '#6366F1' },
  Operational: { bgcolor: 'rgba(34,197,94,0.12)', color: '#22C55E' },
  Compliance: { bgcolor: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  Custom: { bgcolor: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
};

const scheduled = [
  { name: 'Weekly Ops Digest', freq: 'Weekly', next: 'Mon, Apr 28' },
  { name: 'Monthly Finance Roll-up', freq: 'Monthly', next: 'May 1' },
  { name: 'Quarterly Compliance', freq: 'Quarterly', next: 'Jul 1' },
];

const quickStats = [
  { label: 'This week', value: 47, prev: 38, up: true },
  { label: 'Avg. size', value: '2.3 MB', prev: null, up: null },
  { label: 'Failed (7d)', value: 2, prev: 5, up: true },
];

export function ReportsContent() {
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
            Reports
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Monitor and manage all generated reports
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

      {/* Left col top: Report Volume Chart */}
      <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Report Volume
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Jan – Dec 2026
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.5}>
              {(['7D', '30D', '90D'] as const).map((label, i) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    bgcolor: i === 1 ? 'primary.main' : 'rgba(255,255,255,0.06)',
                    color: i === 1 ? '#fff' : 'text.secondary',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              ))}
            </Stack>
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
          {volumeData.map((d) => (
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
        {/* Categories */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {categories.map((cat) => (
                <Box key={cat.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.25 }}
                  >
                    <Typography variant="caption">{cat.label}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {cat.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={cat.value}
                    sx={{
                      height: 5,
                      '& .MuiLinearProgress-bar': { bgcolor: cat.color },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Calendar size={14} color="#6366F1" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Scheduled
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {scheduled.map((s) => (
                <Stack
                  key={s.name}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}
                    >
                      {s.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                      Next: {s.next}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={s.freq}
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      bgcolor: 'rgba(99,102,241,0.12)',
                      color: '#6366F1',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {quickStats.map((s) => (
                <Stack
                  key={s.label}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {s.label}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      {s.value}
                    </Typography>
                    {s.up !== null && (
                      s.up
                        ? <TrendingUp size={12} color="#22C55E" />
                        : <TrendingDown size={12} color="#EF4444" />
                    )}
                  </Stack>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Left col bottom: Reports Table */}
      <Card sx={{ minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Reports
          </Typography>
        </CardContent>
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Generated By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
                    >
                      {r.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {r.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={r.type}
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...typeSx[r.type],
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
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
                        {r.initials}
                      </Avatar>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {r.generatedBy}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {r.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...statusSx[r.status],
                        '& .MuiChip-label': { px: 0.75 },
                      }}
                    />
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
    </Box>
  );
}
