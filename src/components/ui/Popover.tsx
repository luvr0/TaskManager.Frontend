import React from "react"
import Menu from "@mui/material/Menu"
import { useTheme } from "@mui/material/styles"
import type { PopoverProps } from '@/interfaces/components'

export const Popover: React.FC<PopoverProps> = ({
  anchorEl,
  open,
  onClose,
  children,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  minWidth = 192,
}) => {
  const theme = useTheme()

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{
        sx: {
          minWidth,
          bgcolor: 'hsl(214, 31%, 91%)',
          color: 'text.primary',
          p: 0.5,
          borderRadius: 0.375,
          border: 1,
          borderColor: 'divider',
          boxShadow: theme.shadows[5],
          mt: 0.5,
        },
      }}
    >
      {children}
    </Menu>
  )
}
