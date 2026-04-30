import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ActivityPage } from '../types/api';

interface ActivityTableProps {
  data?: ActivityPage | null;
  loading?: boolean;
  error?: string | null;
  page: number;
  onPageChange: (p: number) => void;
}

const STATUS_COLOR = {
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ActivityTable({
  data,
  loading,
  error,
  page,
  onPageChange,
}: ActivityTableProps) {
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Resource</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }, (_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }, (__, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data?.rows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.user}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>
                      {row.action}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>
                      {row.resource.replace('_', ' ')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={STATUS_COLOR[row.status]}
                        size="small"
                        sx={{ height: 20, textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}
                    >
                      {formatTime(row.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}

            {!loading && data?.rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 3 }}
                  >
                    No activity found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {data && data.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={(_, p) => onPageChange(p)}
            size="small"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
