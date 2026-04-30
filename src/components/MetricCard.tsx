import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';
import type { MetricOverview } from '../types/api';

interface MetricCardProps {
  metric?: MetricOverview;
  loading?: boolean;
  error?: boolean;
}

function formatValue(value: number, unit: string): string {
  if (unit === '$') {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
    return `$${value}`;
  }
  if (unit === '%') return `${value}%`;
  if (unit === 'ms') return `${value}ms`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
}

export function MetricCard({ metric, loading, error }: MetricCardProps) {
  if (loading) {
    return (
      <Card>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={40} sx={{ mt: 1 }} />
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          sx={{ mt: 1, borderRadius: 4 }}
        />
      </Card>
    );
  }

  if (error || !metric) {
    return (
      <Card>
        <Typography variant="body2" color="error">
          Failed to load metric
        </Typography>
      </Card>
    );
  }

  const isPositive = metric.change >= 0;
  const TrendIcon =
    metric.trend === 'up'
      ? TrendingUp
      : metric.trend === 'down'
        ? TrendingDown
        : Minus;
  const chipColor =
    metric.trend === 'up'
      ? 'success'
      : metric.trend === 'down'
        ? 'error'
        : 'default';

  return (
    <Card data-testid={`metric-card-${metric.id}`}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {metric.label}
      </Typography>

      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: 700, my: 0.5 }}
      >
        {formatValue(metric.value, metric.unit)}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Chip
          icon={<TrendIcon size={12} />}
          label={`${isPositive ? '+' : ''}${metric.change}%`}
          color={chipColor}
          size="small"
          sx={{ height: 22 }}
        />
        <Typography variant="caption" color="text.secondary">
          vs last period
        </Typography>
      </Box>
    </Card>
  );
}
