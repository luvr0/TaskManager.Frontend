"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Divider from "@mui/material/Divider"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import TextField from "@mui/material/TextField"
import { useTheme } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import NotificationsIcon from "@mui/icons-material/Notifications"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LogoutIcon from "@mui/icons-material/Logout"
import { Popover } from "./Popover"
import { PopoverItem } from "./PopoverItem"
import type { Board } from "@/types/board"
import { setAccessToken } from "@/services/tokenStore"
import { logout } from "@/services/authService"
import { useUserProfile, useBoards } from "@/hooks"

export function Navbar() {
  const theme = useTheme()
  const router = useRouter()
  const params = useParams()
  
  const { userEmail, userInitials } = useUserProfile()
  const { boards, isLoading: isLoadingBoards } = useBoards()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const open = Boolean(anchorEl)
  const profileOpen = Boolean(profileAnchorEl)

  useEffect(() => {
    const boardId = params?.id as string | undefined
    if (boardId && boards.length > 0) {
      const board = boards.find(b => b.id === boardId)
      setSelectedBoard(board || null)
    }
  }, [params, boards])

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(e.currentTarget)
  const handleProfileMenuClose = () => setProfileAnchorEl(null)
  
  const handleSelectBoard = (board: Board) => {
    setSelectedBoard(board)
    router.push(`/boards/${board.id}`)
    handleMenuClose()
  }

  const handleProfileAction = async (action: string) => {
    if (action === 'profile') {
      setProfileModalOpen(true)
      handleProfileMenuClose()
    } else if (action === 'signout') {
      try {
        await logout()
        setAccessToken(null)
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
          setAccessToken(null)
        router.push('/login')
      }
    } else {
      handleProfileMenuClose()
    }
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }
    console.log('Change password:', { currentPassword, newPassword })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setProfileModalOpen(false)
  }

  const handleLogoClick = () => {
    router.push('/boards')
  }

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar
        sx={{
          height: 56,
          px: { xs: 2, lg: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            aria-label="Toggle menu"
            size="large"
            sx={{ 
              width: 40, 
              height: 40, 
              display: { lg: 'none' },
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box 
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'primary.contrastText', fontWeight: 700, fontSize: '0.875rem' }}>
                TM
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline' } }}>
              TaskManager
            </Typography>
          </Box>

          <Button
            id="select-board-button"
            aria-haspopup="menu"
            aria-controls={open ? 'select-board-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenuOpen}
            disabled={isLoadingBoards}
            sx={{
              height: 40,
              px: 2,
              py: 0.5,
              gap: 1,
              textTransform: 'none',
              fontWeight: 600,
              maxWidth: 192,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            endIcon={isLoadingBoards ? <CircularProgress size={16} /> : <ExpandMoreIcon fontSize="small" />}
          >
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedBoard ? selectedBoard.title : 'Select Board'}
            </Box>
          </Button>

          <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            minWidth={224}
          >
            {boards.length === 0 && !isLoadingBoards && (
              <PopoverItem onClick={() => {}} variant="disabled">
                No boards available
              </PopoverItem>
            )}
            {boards.map((board) => (
              <PopoverItem 
                key={board.id} 
                onClick={() => handleSelectBoard(board)}
              >
                {board.title}
              </PopoverItem>
            ))}
            {boards.length > 0 && (
              <>
                <Divider sx={{ my: 0.5, mx: -0.5 }} />
                <PopoverItem onClick={() => router.push('/boards')} variant="disabled">
                  View all boards
                </PopoverItem>
              </>
            )}
          </Popover>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            onClick={handleProfileMenuOpen}
            sx={{
              height: 40,
              px: 1,
              py: 1,
              gap: 1,
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 0.375,
              '&:hover': {
                bgcolor: 'action.hover',
                color: 'text.secondary',
              },
            }}
          >
            <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', color: 'primary.contrastText', fontSize: '0.75rem' }}>
              {userInitials}
            </Avatar>
            <ExpandMoreIcon sx={{ fontSize: '1rem', display: { xs: 'none', sm: 'inline-flex' } }} />
          </Button>

          <Popover
            anchorEl={profileAnchorEl}
            open={profileOpen}
            onClose={handleProfileMenuClose}
          >
            <PopoverItem
              onClick={() => handleProfileAction('profile')}
              icon={<PersonOutlineIcon sx={{ fontSize: '1rem' }} />}
            >
              Profile
            </PopoverItem>
            <Divider sx={{ my: 0.5, mx: -0.5 }} />
            <PopoverItem
              onClick={() => handleProfileAction('signout')}
              icon={<LogoutIcon sx={{ fontSize: '1rem' }} />}
              variant="destructive"
            >
              Sign out
            </PopoverItem>
          </Popover>
        </Box>
      </Toolbar>

      
      <Dialog open={profileModalOpen} onClose={() => setProfileModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Email"
              value={userEmail}
              disabled
              fullWidth
            />
            
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="subtitle2" fontWeight="600">
              Change Password
            </Typography>
            
            <TextField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
            />
            
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleChangePassword} 
            variant="contained"
            disabled={!currentPassword || !newPassword || !confirmPassword}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}
