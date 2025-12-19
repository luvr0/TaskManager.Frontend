import React from "react"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import type { PopoverItemProps } from '@/interfaces/components'

export const PopoverItem: React.FC<PopoverItemProps> = ({
  onClick,
  icon,
  children,
  variant = 'default',
}) => {
  const getColor = () => {
    switch (variant) {
      case 'destructive':
        return 'error.main'
      case 'disabled':
        return 'text.disabled'
      default:
        return 'inherit'
    }
  }

  return (
    <MenuItem
      onClick={onClick}
      sx={{
        px: 2,
        py: 1.5,
        fontSize: '0.875rem',
        gap: 2,
        color: getColor(),
        '&:hover': {
          bgcolor: 'action.hover',
          color: variant === 'destructive' ? 'error.main' : 'text.secondary',
        },
      }}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
          {icon}
        </ListItemIcon>
      )}
      {children}
    </MenuItem>
  )
}
