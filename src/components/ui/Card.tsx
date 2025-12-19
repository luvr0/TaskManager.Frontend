'use client'

import { Box, IconButton, Paper, Typography, Chip, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material'
import { MoreHoriz as MoreHorizIcon, DragIndicator, Edit, Delete } from '@mui/icons-material'
import type { CardStatus } from '@/types/card'
import type { CardProps } from '@/interfaces/components'
import { useMenu } from '@/hooks'

const statusColors: Record<CardStatus, { bg: string; text: string; border: string }> = {
  'Pending': { bg: 'rgba(128, 128, 128, 0.1)', text: 'text.secondary', border: 'rgba(128, 128, 128, 0.3)' },
  'Done': { bg: 'rgba(46, 125, 50, 0.1)', text: 'success.main', border: 'rgba(46, 125, 50, 0.3)' },
  'Incomplete': { bg: 'rgba(211, 47, 47, 0.1)', text: 'error.main', border: 'rgba(211, 47, 47, 0.3)' }
}

export function Card({ card, onEdit, onDelete }: CardProps) {
  const { anchorEl, open: menuOpen, handleOpen, handleClose } = useMenu();
  const statusStyle = statusColors[card.status];

  const handleEdit = () => {
    handleClose();
    onEdit?.();
  };

  const handleDelete = () => {
    handleClose();
    onDelete?.();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        p: 1.5,
        cursor: 'grab',
        transition: 'all 0.2s',
        border: 1,
        borderColor: 'divider',
        '&:hover': {
          boxShadow: 2,
          borderColor: 'primary.main',
          '& .drag-indicator': { opacity: 1 },
          '& .card-menu': { opacity: 1 },
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box
        className="drag-indicator"
        sx={{
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      >
        <DragIndicator sx={{ fontSize: 16, color: 'text.secondary' }} />
      </Box>

      <Box sx={{ pl: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {card.title}
          </Typography>

          <IconButton
            className="card-menu"
            size="small"
            onClick={handleOpen}
            sx={{
              opacity: 0,
              transition: 'opacity 0.2s',
              p: 0.5,
            }}
            aria-label="Card options"
          >
            <MoreHorizIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit Card
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            Delete Card
          </MenuItem>
        </Menu>

        {card.description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {card.description}
          </Typography>
        )}

        <Box sx={{ mt: 1.5 }}>
          <Chip
            label={card.status}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.7rem',
              fontWeight: 500,
              bgcolor: statusStyle.bg,
              color: statusStyle.text,
              border: 1,
              borderColor: statusStyle.border,
            }}
          />
        </Box>
      </Box>
    </Paper>
  )
}
