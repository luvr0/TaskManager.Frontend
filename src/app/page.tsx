'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { apiClient } from '@/services/apiClient';

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const [apiMessage, setApiMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleProtectedPing = async () => {
    setIsFetching(true);
    try {
      const { data } = await apiClient.get<{ message: string }>('/protected/ping');
      setApiMessage(data.message ?? 'Ping executed.');
    } catch (error) {
      console.error('Protected ping failed', error);
      setApiMessage('Failed to call the protected endpoint.');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Stack spacing={3} sx={{ maxWidth: 480, width: '100%' }}>
        <Typography variant="h4" component="h1">
          Task Manager
        </Typography>
        <Typography color="text.secondary">
          {isAuthenticated
            ? 'You are authenticated. Use the button below to test a protected call.'
            : 'Log in to access your boards and call protected endpoints.'}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            disabled={!isAuthenticated || isFetching}
            onClick={handleProtectedPing}
          >
            {isFetching ? 'Calling...' : 'Call Protected API'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!isAuthenticated}
            onClick={() => {
              void logout();
            }}
          >
            Sign Out
          </Button>
        </Stack>
        {apiMessage && (
          <Typography variant="body2" color="text.secondary">
            {apiMessage}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
