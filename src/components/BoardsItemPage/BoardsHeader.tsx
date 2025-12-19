'use client';

import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import type { BoardsHeaderProps } from '@/interfaces/components'

export function BoardsHeader({
  onCreate,
  subtitle = '3 boards total',
  title = 'Your Boards',
}: BoardsHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box>
        <Typography
          component='h1'
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: 0.5 }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Button
        variant='contained'
        color='primary'
        onClick={onCreate}
        startIcon={<Add sx={{ fontSize: 16 }} />}
        sx={{ height: 40, px: 2, py: 1 }}
      >
        New Board
      </Button>
    </Box>
  );
}

BoardsHeader.displayName = 'BoardsHeader';

