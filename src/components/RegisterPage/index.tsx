'use client'

import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material'
import { useRouter } from 'next/navigation'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import { useRegisterForm } from '@/hooks'

export default function RegisterPage() {
  const router = useRouter()
  
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    formError,
    fieldErrors,
    handleSubmit,
    handleFieldChange,
  } = useRegisterForm()

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
          Create Account
        </Typography>

        {formError && (
          <Typography
            sx={{
              color: '#ef4444',
              textAlign: 'center',
              mb: 2,
              fontSize: '0.875rem',
            }}
          >
            {formError}
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
              Name
            </Typography>
            <TextField
              type="text"
              placeholder="Your full name"
              required
              autoComplete="name"
              fullWidth
              disabled={isSubmitting}
              value={name}
              onChange={(e) => handleFieldChange(setName, e.target.value, 'name')}
              error={Boolean(fieldErrors.name)}
              helperText={fieldErrors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#94a3b8', width: 20, height: 20 }} />
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
                maxLength: 100,
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
              Email
            </Typography>
            <TextField
              type="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              fullWidth
              disabled={isSubmitting}
              value={email}
              onChange={(e) => handleFieldChange(setEmail, e.target.value, 'email')}
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email}
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
                maxLength: 200,
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
              placeholder="Minimum 8 characters"
              required
              autoComplete="new-password"
              fullWidth
              disabled={isSubmitting}
              value={password}
              onChange={(e) => handleFieldChange(setPassword, e.target.value, 'password')}
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password}
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
                maxLength: 100,
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
              Confirm Password
            </Typography>
            <TextField
              type="password"
              placeholder="Enter password again"
              required
              autoComplete="new-password"
              fullWidth
              disabled={isSubmitting}
              value={confirmPassword}
              onChange={(e) => handleFieldChange(setConfirmPassword, e.target.value, 'confirmPassword')}
              error={Boolean(fieldErrors.confirmPassword)}
              helperText={fieldErrors.confirmPassword}
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
                maxLength: 100,
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
            disabled={isSubmitting}
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
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button
                onClick={() => router.push('/login')}
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
                Sign in
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
