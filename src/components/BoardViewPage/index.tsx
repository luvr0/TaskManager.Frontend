'use client'

import { useState } from 'react'
import { Box, Button, CircularProgress, Alert, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { Column } from '@/components/ui/Column'
import { useBoardData } from '@/hooks/useBoardData'
import type { BoardViewPageProps } from '@/interfaces/components'
import type { Card, CardStatus } from '@/types/card'

const CARD_STATUS_OPTIONS: CardStatus[] = ['Pending', 'Done', 'Incomplete']

export function BoardViewPage({ boardId }: BoardViewPageProps) {
  const {
    columns,
    isLoading,
    error,
    clearError,
    addColumn,
    addCard,
    renameColumn,
    editCard,
    removeColumn,
    removeCard,
  } = useBoardData(boardId)
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [isAddingCard, setIsAddingCard] = useState<string | null>(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [newCardDescription, setNewCardDescription] = useState('')
  const [renamingColumnId, setRenamingColumnId] = useState<string | null>(null)
  const [renameColumnTitle, setRenameColumnTitle] = useState('')
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [editCardTitle, setEditCardTitle] = useState('')
  const [editCardDescription, setEditCardDescription] = useState('')
  const [editCardStatus, setEditCardStatus] = useState<CardStatus>('Pending')

  const handleAddColumn = async () => {
    if (!newColumnTitle.trim()) return

    try {
      await addColumn(newColumnTitle)
      setNewColumnTitle('')
      setIsAddingColumn(false)
    } catch (err) {
      // TODO: insert error handling after
    }
  }

  const handleAddCard = async (columnId: string) => {
    if (!newCardTitle.trim()) return

    try {
      await addCard(columnId, newCardTitle, newCardDescription || undefined)
      setNewCardTitle('')
      setNewCardDescription('')
      setIsAddingCard(null)
    } catch (err) {
      // TODO: insert error handling after
    }
  }

  const handleRenameColumn = async () => {
    if (!renamingColumnId || !renameColumnTitle.trim()) return

    try {
      await renameColumn(renamingColumnId, renameColumnTitle.trim())
      setRenamingColumnId(null)
      setRenameColumnTitle('')
    } catch (err) {
      // TODO: insert error handling after
    }
  }

  const handleEditCard = async () => {
    if (!editingCard || !editCardTitle.trim()) return

    try {
      await editCard(editingCard.id, {
        title: editCardTitle.trim(),
        description: editCardDescription.trim() ? editCardDescription : undefined,
        status: editCardStatus,
      })
      setEditingCard(null)
      setEditCardTitle('')
      setEditCardDescription('')
      setEditCardStatus('Pending')
    } catch (err) {
      // TODO: insert error handling after
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error" onClose={clearError}>
              {error}
            </Alert>
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            overflowX: 'auto',
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              height: '100%',
            }}
          >
            {columns.map((column) => (
              <Column 
                key={column.id}
                column={column}
                onAddCard={() => setIsAddingCard(column.id)}
                onRenameColumn={(columnId, currentTitle) => {
                  setRenamingColumnId(columnId)
                  setRenameColumnTitle(currentTitle)
                }}
                onDeleteColumn={() => removeColumn(column.id)}
                onDeleteCard={(cardId) => removeCard(cardId)}
                onEditCard={(card) => {
                  setEditingCard(card)
                  setEditCardTitle(card.title)
                  setEditCardDescription(card.description ?? '')
                  setEditCardStatus(card.status)
                }}
              />
            ))}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setIsAddingColumn(true)}
              sx={{
                width: 288,
                height: 48,
                flexShrink: 0,
                borderStyle: 'dashed',
                textTransform: 'none',
              }}
            >
              Add Column
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={isAddingColumn} onClose={() => setIsAddingColumn(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Column</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Column Title"
            fullWidth
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddColumn()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingColumn(false)}>Cancel</Button>
          <Button onClick={handleAddColumn} variant="contained" disabled={!newColumnTitle.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAddingCard !== null} onClose={() => setIsAddingCard(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Card</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Card Title"
            fullWidth
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            fullWidth
            multiline
            rows={3}
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingCard(null)}>Cancel</Button>
          <Button 
            onClick={() => isAddingCard && handleAddCard(isAddingCard)} 
            variant="contained" 
            disabled={!newCardTitle.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={renamingColumnId !== null} onClose={() => {
        setRenamingColumnId(null)
        setRenameColumnTitle('')
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Rename Column</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Column Title"
            fullWidth
            value={renameColumnTitle}
            onChange={(e) => setRenameColumnTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                void handleRenameColumn()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRenamingColumnId(null)
              setRenameColumnTitle('')
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRenameColumn}
            variant="contained"
            disabled={!renameColumnTitle.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editingCard !== null} onClose={() => {
        setEditingCard(null)
        setEditCardTitle('')
        setEditCardDescription('')
        setEditCardStatus('Pending')
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Card Title"
            fullWidth
            value={editCardTitle}
            onChange={(e) => setEditCardTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={editCardDescription}
            onChange={(e) => setEditCardDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            value={editCardStatus}
            onChange={(e) => setEditCardStatus(e.target.value as CardStatus)}
          >
            {CARD_STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEditingCard(null)
              setEditCardTitle('')
              setEditCardDescription('')
              setEditCardStatus('Pending')
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditCard}
            variant="contained"
            disabled={!editCardTitle.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

