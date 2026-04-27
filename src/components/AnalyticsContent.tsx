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
import Stack from '@mui/material/Stack';
import {
  Eye,
  Users,
  Clock,
  MousePointerClick,
  Download,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

// --- Data ---
const kpiCards = [
  {
    label: 'Page Views',
    value: '284,391',
    trend: '+14.2%',
    up: true,
    icon: Eye,
    bg: 'rgba(99,102,241,0.15)',
    color: '#6366F1',
  },
  {
    label: 'Unique Visitors',
    value: '89,724',
    trend: '+7.8%',
    up: true,
    icon: Users,
    bg: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
  },
  {
    label: 'Avg. Session',
    value: '4m 32s',
    trend: '-2.1%',
    up: false,
    icon: Clock,
    bg: 'rgba(59,130,246,0.15)',
    color: '#3B82F6',
  },
  {
    label: 'Bounce Rate',
    value: '38.4%',
    trend: '-5.3%',
    up: true,
    icon: MousePointerClick,
    bg: 'rgba(245,158,11,0.15)',
    color: '#F59E0B',
  },
];

const pageViewsData = [
  { month: 'Jan', value: 58 },
  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 65 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 74 },
  { month: 'Jun', value: 88 },
  { month: 'Jul', value: 95 },
  { month: 'Aug', value: 82 },
  { month: 'Sep', value: 90 },
  { month: 'Oct', value: 78 },
  { month: 'Nov', value: 92 },
  { month: 'Dec', value: 100 },
];

const trafficSources = [
  { label: 'Organic Search', value: 42, color: '#6366F1' },
  { label: 'Direct', value: 24, color: '#22C55E' },
  { label: 'Social Media', value: 19, color: '#3B82F6' },
  { label: 'Referral', value: 11, color: '#F59E0B' },
  { label: 'Email', value: 4, color: '#EF4444' },
];

const devices = [
  { label: 'Desktop', value: 58, icon: Monitor, color: '#6366F1' },
  { label: 'Mobile', value: 34, icon: Smartphone, color: '#22C55E' },
  { label: 'Tablet', value: 8, icon: Tablet, color: '#3B82F6' },
];

const topLocations = [
  { country: 'United States', value: 38, dot: '#6366F1' },
  { country: 'United Kingdom', value: 14, dot: '#22C55E' },
  { country: 'Germany', value: 11, dot: '#F59E0B' },
  { country: 'Canada', value: 9, dot: '#3B82F6' },
  { country: 'Australia', value: 7, dot: '#EF4444' },
];

type TrendDir = 'up' | 'down';

const topPages: {
  page: string;
  views: string;
  unique: string;
  avgTime: string;
  bounce: string;
  trend: TrendDir;
}[] = [
  { page: '/dashboard', views: '42,318', unique: '28,491', avgTime: '5m 12s', bounce: '24.3%', trend: 'up' },
  { page: '/products', views: '38,204', unique: '25,887', avgTime: '3m 45s', bounce: '31.7%', trend: 'up' },
  { page: '/pricing', views: '31,569', unique: '22,104', avgTime: '4m 08s', bounce: '28.9%', trend: 'up' },
  { page: '/blog/getting-started', views: '24,891', unique: '19,342', avgTime: '6m 34s', bounce: '19.2%', trend: 'down' },
  { page: '/docs/api-reference', views: '18,743', unique: '14,218', avgTime: '7m 51s', bounce: '15.8%', trend: 'up' },
  { page: '/about', views: '12,106', unique: '9,874', avgTime: '2m 19s', bounce: '52.1%', trend: 'down' },
];

const trendSx: Record<TrendDir, { bgcolor: string; color: string }> = {
  up: { bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E' },
  down: { bgcolor: 'rgba(239,68,68,0.1)', color: '#EF4444' },
};

const funnelStages = [
  { label: 'Visitors', value: 100, color: '#6366F1' },
  { label: 'Sign-ups', value: 24, color: '#22C55E' },
  { label: 'Active Users', value: 18, color: '#3B82F6' },
  { label: 'Paid', value: 6.2, color: '#F59E0B' },
];

export function AnalyticsContent() {
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
            Analytics
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Traffic, engagement & conversion insights
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

      {/* Left col top: Page Views Chart */}
      <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Page Views
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
          {pageViewsData.map((d) => (
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
        {/* Traffic Sources */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              Traffic Sources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {trafficSources.map((src) => (
                <Box key={src.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.25 }}
                  >
                    <Typography variant="caption">{src.label}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {src.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={src.value}
                    sx={{
                      height: 5,
                      '& .MuiLinearProgress-bar': { bgcolor: src.color },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Device Breakdown
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {devices.map((d) => (
                <Box key={d.label}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 0.25 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <d.icon size={14} color={d.color} />
                      <Typography variant="caption">{d.label}</Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {d.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={d.value}
                    sx={{
                      height: 5,
                      '& .MuiLinearProgress-bar': { bgcolor: d.color },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Top Locations
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {topLocations.map((loc) => (
                <Stack
                  key={loc.country}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: loc.dot,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      {loc.country}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    {loc.value}%
                  </Typography>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom left: Top Pages Table */}
      <Card sx={{ minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Top Pages
          </Typography>
        </CardContent>
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Page</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Unique Views</TableCell>
                <TableCell>Avg. Time</TableCell>
                <TableCell>Bounce Rate</TableCell>
                <TableCell>Trend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topPages.map((p) => (
                <TableRow key={p.page}>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
                    >
                      {p.page}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {p.views}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {p.unique}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {p.avgTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {p.bounce}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      icon={
                        p.trend === 'up'
                          ? <TrendingUp size={10} color="#22C55E" />
                          : <TrendingDown size={10} color="#EF4444" />
                      }
                      label={p.trend === 'up' ? 'Up' : 'Down'}
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        ...trendSx[p.trend],
                        '& .MuiChip-label': { px: 0.5 },
                        '& .MuiChip-icon': { ml: 0.5 },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Bottom right: Conversion Funnel */}
      <Card sx={{ minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
            Conversion Funnel
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, justifyContent: 'center' }}>
            {funnelStages.map((stage, i) => (
              <Box key={stage.label}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.25 }}
                >
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    {i > 0 && (
                      <Typography
                        sx={{ fontSize: '0.55rem', color: 'text.disabled', lineHeight: 1 }}
                      >
                        &darr;
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {stage.label}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {stage.value}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={stage.value}
                  sx={{
                    height: 6,
                    '& .MuiLinearProgress-bar': { bgcolor: stage.color },
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
