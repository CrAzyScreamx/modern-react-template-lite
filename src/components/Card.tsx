import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  'data-testid'?: string;
}

/** Shared card primitive — thin wrapper over MUI Card with consistent padding. */
export function Card({ children, sx, 'data-testid': testId }: CardProps) {
  return (
    <MuiCard sx={{ height: '100%', ...sx }} data-testid={testId}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {children}
      </CardContent>
    </MuiCard>
  );
}
