'use client'

import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useLoginForm } from '@/hooks'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, clearError } = useAuth()
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    errorMessage,
    handleSubmit,
    handleFieldChange,
  } = useLoginForm()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/boards')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    return () => clearError()
  }, [clearError])

  const isFormDisabled = isSubmitting || isLoading

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #ffffff, #f1f5f9)',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 448,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          boxShadow: '0 10px 15px -3px rgba(148, 163, 184, 0.1), 0 4px 6px -2px rgba(148, 163, 184, 0.05)',
          border: '1px solid rgba(203, 213, 225, 0.3)',
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: '1.875rem',
            fontWeight: 700,
            color: '#475569',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Login
        </Typography>

        {errorMessage && (
          <Typography
            sx={{
              color: '#ef4444',
              textAlign: 'center',
              mb: 2,
              fontSize: '0.875rem',
            }}
          >
            {errorMessage}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <Box>
            <Typography
              component="label"
              sx={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#64748b',
                mb: 0.5,
              }}
            >
              Email
            </Typography>
            <TextField
              type="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              fullWidth
              disabled={isFormDisabled}
              value={email}
              onChange={(e) => handleFieldChange(setEmail, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#94a3b8', width: 20, height: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  height: 40,
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover': {
                    borderColor: '#cbd5e1',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              }}
              inputProps={{
                style: {
                  padding: '8px 12px',
                  paddingLeft: 0,
                  color: '#1e293b',
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              component="label"
              sx={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#64748b',
                mb: 0.5,
              }}
            >
              Password
            </Typography>
            <TextField
              type="password"
              placeholder="Your password"
              required
              autoComplete="current-password"
              fullWidth
              disabled={isFormDisabled}
              value={password}
              onChange={(e) => handleFieldChange(setPassword, e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#94a3b8', width: 20, height: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  height: 40,
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&:hover': {
                    borderColor: '#cbd5e1',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                },
              }}
              inputProps={{
                style: {
                  padding: '8px 12px',
                  paddingLeft: 0,
                  color: '#1e293b',
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            disabled={isFormDisabled}
            fullWidth
            sx={{
              height: 48,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.25)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                transform: 'scale(1.02)',
                boxShadow: '0 8px 25px 0 rgba(59, 130, 246, 0.35)',
              },
              '&:disabled': {
                opacity: 0.6,
                transform: 'none',
                cursor: 'not-allowed',
              },
            }}
          >
            {isFormDisabled ? 'Signing in...' : 'Sign In'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button
                onClick={() => router.push('/register')}
                disabled={isFormDisabled}
                sx={{
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  color: '#3b82f6',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'none',
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign up
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}