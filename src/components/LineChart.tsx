import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { TimeseriesPoint } from '../types/api';

interface LineChartProps {
  data?: TimeseriesPoint[];
  loading?: boolean;
  error?: boolean;
  label?: string;
  height?: number;
}

const PADDING = { top: 16, right: 16, bottom: 32, left: 48 };

export function LineChart({
  data,
  loading,
  error,
  label = 'Active Users',
  height = 200,
}: LineChartProps) {
  const theme = useTheme();

  const { path, area, xTicks, yTicks, innerW, innerH } = useMemo(() => {
    const defaultResult = {
      path: '',
      area: '',
      xTicks: [] as string[],
      yTicks: [] as number[],
      innerW: 0,
      innerH: 0,
    };
    if (!data || data.length === 0) return defaultResult;

    const values = data.map((d) => d.value);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const range = maxV - minV || 1;

    // Use a fixed SVG width reference of 600 for coordinate math; CSS scales it
    const svgW = 600;
    const svgH = height;
    const iW = svgW - PADDING.left - PADDING.right;
    const iH = svgH - PADDING.top - PADDING.bottom;

    const toX = (i: number) => PADDING.left + (i / (data.length - 1)) * iW;
    const toY = (v: number) => PADDING.top + iH - ((v - minV) / range) * iH;

    const pts = data.map((d, i) => ({ x: toX(i), y: toY(d.value) }));

    const linePath = pts
      .map(
        (p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`
      )
      .join(' ');
    const areaPath =
      linePath +
      ` L${(pts.at(-1)?.x ?? 0).toFixed(1)},${(PADDING.top + iH).toFixed(1)}` +
      ` L${(pts.at(0)?.x ?? 0).toFixed(1)},${(PADDING.top + iH).toFixed(1)} Z`;

    // X ticks: every 6 days
    const xT = data
      .filter((_, i) => i % 6 === 0 || i === data.length - 1)
      .map((d) => d.date.slice(5)); // MM-DD

    // Y ticks: 4 evenly spaced
    const step = range / 3;
    const yT = [0, 1, 2, 3].map((i) => Math.round(minV + step * i));

    return {
      path: linePath,
      area: areaPath,
      xTicks: xT,
      yTicks: yT,
      innerW: iW,
      innerH: iH,
    };
  }, [data, height]);

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        height={height}
        sx={{ borderRadius: 2 }}
      />
    );
  }

  if (error || !data) {
    return (
      <Box
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" color="error">
          Failed to load chart data
        </Typography>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No data available
        </Typography>
      </Box>
    );
  }

  const primary = theme.palette.primary.main;
  const gridColor = theme.palette.divider;
  const textColor = theme.palette.text.secondary;
  const svgW = 600;
  const svgH = height;

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{ width: '100%', height, display: 'block' }}
          aria-label={`${label} line chart`}
          role="img"
        >
          <defs>
            <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primary} stopOpacity={0.25} />
              <stop offset="100%" stopColor={primary} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Y grid lines */}
          {yTicks.map((v) => {
            const y =
              PADDING.top +
              innerH -
              ((v - (yTicks[0] ?? 0)) /
                ((yTicks[yTicks.length - 1] ?? 1) - (yTicks[0] ?? 0) || 1)) *
                innerH;
            return (
              <g key={v}>
                <line
                  x1={PADDING.left}
                  y1={y}
                  x2={svgW - PADDING.right}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <text
                  x={PADDING.left - 6}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill={textColor}
                >
                  {v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                </text>
              </g>
            );
          })}

          {/* X tick labels */}
          {xTicks.map((tick, i) => {
            const x = PADDING.left + ((i * 6) / (data.length - 1)) * innerW;
            return (
              <text
                key={tick}
                x={x}
                y={svgH - 8}
                textAnchor="middle"
                fontSize={10}
                fill={textColor}
              >
                {tick}
              </text>
            );
          })}

          {/* Area fill */}
          <path d={area} fill="url(#chart-area-grad)" />

          {/* Line */}
          <path
            d={path}
            fill="none"
            stroke={primary}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Box>
  );
}
