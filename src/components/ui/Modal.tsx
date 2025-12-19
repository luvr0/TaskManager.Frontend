'use client'

import { forwardRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ModalProps } from '@/interfaces/components'
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      actions,
      children,
      maxWidth = 'sm',
      fullWidth = true,
      centered = true,
      sx,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog
        ref={ref as any}
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        aria-labelledby={title ? 'modal-title' : undefined}
        PaperProps={{
            sx: {
            borderRadius: 0,
            m: 2,
            boxShadow: 8,
            ...(centered ? { display: 'flex', flexDirection: 'column' } : {}),
            ...sx,
          },
        }}
        {...props}
      >
        {title && (
          <DialogTitle id="modal-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="span" sx={{ fontWeight: 600 }}>
              {title}
            </Box>
            {onClose && (
              <IconButton
                aria-label="close"
                onClick={() => onClose?.({} as any, 'backdropClick')}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </DialogTitle>
        )}

        <DialogContent dividers sx={{ p: 3 }}>
          {children}
        </DialogContent>

        {actions && <DialogActions sx={{ px: 2, pb: 2 }}>{actions}</DialogActions>}
      </Dialog>
    )
  }
)

Modal.displayName = 'Modal'
