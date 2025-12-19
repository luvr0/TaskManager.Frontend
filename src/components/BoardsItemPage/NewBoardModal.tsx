'use client'

import React, { forwardRef, useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Modal } from '@/components/ui/Modal'
import type { NewBoardModalProps } from '@/interfaces/components'
export const NewBoardModal = forwardRef<HTMLDivElement, NewBoardModalProps>(
  ({ open, onClose, onCreate, defaultName = '' }, ref) => {
    const [name, setName] = useState(defaultName)

    useEffect(() => {
      if (open) setName(defaultName)
    }, [open, defaultName])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = name.trim()
      if (!trimmed) return
      onCreate?.(trimmed)
      onClose()
      setName('')
    }

    return (
      <Modal
        open={open}
        onClose={onClose}
        title={<Typography variant="h5" component="h2">Create New Board</Typography>}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Give your board a name to get started.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              id="board-name"
              label="Board Name"
              placeholder="e.g., Project Alpha"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
            <Button type="button" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={!name.trim()}>
              Create Board
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  }
)

NewBoardModal.displayName = 'NewBoardModal';
