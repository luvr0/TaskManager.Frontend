'use client'

import { Box, Button, IconButton, Paper, Typography, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material'
import { Add as AddIcon, MoreHoriz as MoreHorizIcon, DragIndicator, Delete, Edit } from '@mui/icons-material'
import { Card } from './Card'
import type { ColumnProps } from '@/interfaces/components'
import { useMenu } from '@/hooks'

export function Column({ column, onAddCard, onRenameColumn, onDeleteColumn, onDeleteCard, onEditCard }: ColumnProps) {
  const { anchorEl, open: menuOpen, handleOpen, handleClose } = useMenu();

  const handleRename = () => {
    handleClose();
    onRenameColumn?.(column.id, column.title);
  };

  const handleDelete = () => {
    handleClose();
    onDeleteColumn?.();
  };
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 288,
        flexShrink: 0,
        bgcolor: 'action.hover',
        border: 1,
        borderColor: 'divider',
        transition: 'all 0.2s',
      }}
      role="region"
      aria-label={`Column: ${column.title}`}
    >
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
          <DragIndicator
            sx={{
              fontSize: 16,
              color: 'text.secondary',
              cursor: 'grab',
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            fontWeight="semibold"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
              transition: 'color 0.2s',
            }}
            onClick={() => onRenameColumn?.(column.id, column.title)}
          >
            {column.title}
          </Typography>
          <Box
            sx={{
              px: 0.75,
              py: 0.25,
              bgcolor: 'action.selected',
              borderRadius: 0.5,
              flexShrink: 0,
            }}
          >
            <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
              {column.cards.length}
            </Typography>
          </Box>
        </Box>

        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{ flexShrink: 0, p: 0.5 }}
          aria-label="Column options"
        >
          <MoreHorizIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRename}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Rename Column
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          Delete Column
        </MenuItem>
      </Menu>

      
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minHeight: 200,
        }}
      >
        {column.cards.map((card) => (
          <Card 
            key={card.id} 
            card={card}
            onDelete={() => onDeleteCard?.(card.id)}
            onEdit={() => onEditCard?.(card)}
          />
        ))}
      </Box>

      
      <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={onAddCard}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.secondary',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'action.hover',
              color: 'text.primary',
            },
          }}
        >
          Add a card
        </Button>
      </Box>
    </Paper>
  )
}
