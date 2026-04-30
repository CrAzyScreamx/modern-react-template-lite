import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { RefreshCw, Moon, Sun, LogOut } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ActivityTable } from './ActivityTable';
import { LineChart } from './LineChart';
import { Card } from './Card';
import { useAuth } from '../hooks/useAuth';
import { useMetrics } from '../hooks/useMetrics';
import { useActivity } from '../hooks/useActivity';
import { useColorTheme } from '../context/ThemeContext';

function LoginForm() {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: 360 }}
      >
        <Typography variant="h5" gutterBottom>
          Sign in to Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Use admin / password123 in dev.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
          autoComplete="username"
          inputProps={{ 'aria-label': 'Username' }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          autoComplete="current-password"
          inputProps={{ 'aria-label': 'Password' }}
        />

        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign in'}
        </Button>
      </Box>
    </Box>
  );
}

interface DashboardNavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: DashboardNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'users', label: 'Users' },
];

export function MetricsDashboard() {
  const { token, logout } = useAuth();
  const { mode, toggleTheme } = useColorTheme();
  const [activeSection, setActiveSection] = useState('overview');

  const {
    overview,
    timeseries,
    loading: metricsLoading,
    error: metricsError,
    refresh,
  } = useMetrics(token);
  const {
    data: activityData,
    loading: activityLoading,
    error: activityError,
    page,
    setPage,
  } = useActivity(token);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Dashboard header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Metrics Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Live overview — refreshed on demand
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={mode === 'dark'}
          >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          <Button
            startIcon={<RefreshCw size={16} />}
            onClick={refresh}
            disabled={metricsLoading}
            variant="outlined"
            size="small"
          >
            Refresh
          </Button>

          <IconButton size="small" onClick={logout} aria-label="Sign out">
            <LogOut size={18} />
          </IconButton>
        </Box>
      </Box>

      {/* Internal nav */}
      <Box sx={{ display: 'flex', gap: 0.5, mb: 3, flexShrink: 0 }}>
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.id}
            size="small"
            variant={activeSection === item.id ? 'contained' : 'text'}
            onClick={() => setActiveSection(item.id)}
            sx={{ borderRadius: 6 }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {metricsError && (
        <Alert severity="warning" sx={{ mb: 2, flexShrink: 0 }}>
          {metricsError}
        </Alert>
      )}

      {/* Scrollable content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', minHeight: 0 }}>
        {/* Metric cards — always visible */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {metricsLoading && !overview
            ? Array.from({ length: 6 }, (_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <MetricCard loading />
                </Grid>
              ))
            : (overview ?? []).map((m) => (
                <Grid item xs={12} sm={6} md={4} key={m.id}>
                  <MetricCard metric={m} error={!!metricsError && !overview} />
                </Grid>
              ))}

          {!metricsLoading && !overview && !metricsError && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" align="center">
                No metrics available
              </Typography>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Line chart */}
        <Card sx={{ mb: 3 }}>
          <LineChart
            data={timeseries?.data}
            loading={metricsLoading && !timeseries}
            error={!!metricsError && !timeseries}
            label="Active Users — Last 30 Days"
          />
        </Card>

        {/* Activity table */}
        <Card>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Recent Activity
          </Typography>
          <ActivityTable
            data={activityData}
            loading={activityLoading}
            error={activityError}
            page={page}
            onPageChange={setPage}
          />
        </Card>
      </Box>
    </Box>
  );
}
