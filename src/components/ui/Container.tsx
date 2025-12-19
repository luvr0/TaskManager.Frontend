'use client'

import { forwardRef } from 'react'
import { Box } from '@mui/material'
import type { ContainerProps } from '@/interfaces/components'
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = 'lg', centered = true, children, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: maxWidth === 'sm' ? 600 : '100%',
            md: maxWidth === 'md' ? 960 : maxWidth === 'sm' ? 600 : '100%',
            lg: maxWidth === 'lg' ? 1280 : maxWidth === 'md' ? 960 : maxWidth === 'sm' ? 600 : '100%',
            xl: maxWidth === 'xl' ? 1920 : maxWidth === 'lg' ? 1280 : maxWidth === 'md' ? 960 : maxWidth === 'sm' ? 600 : '100%',
          },
          mx: centered ? 'auto' : 0,
          px: { xs: 2, sm: 3, md: 4 },
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

Container.displayName = 'Container'