'use client';

import { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import type { BoardCardProps } from '@/interfaces/components';
import type { BoardMember } from '@/types/board';
import { fetchBoardMembers, addBoardMember, removeBoardMember, updateBoardMemberRole, updateBoard } from '@/services/boardService';
import { useMenu, useDialog } from '@/hooks';

import {
  PeopleAltOutlined,
  MoreHoriz,
  PersonAdd,
  Delete,
  Edit,
} from '@mui/icons-material';


export function BoardCard({
  members,
  onClick,
  onMenuClick,
  onDelete,
  onAddMember,
  onRemoveMember,
  onRenameBoard,
  title,
  boardId,
}: BoardCardProps) {
  const router = useRouter();
  const { anchorEl, open: menuOpen, handleOpen, handleClose } = useMenu();
  const { open: manageOpen, handleOpen: openManage, handleClose: closeManage } = useDialog();
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('Reader');
  const [membersList, setMembersList] = useState<Array<{ userId: number; role: string; email: string; alias: string }>>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [isRenamingBoard, setIsRenamingBoard] = useState(false);
  const [boardNameInput, setBoardNameInput] = useState(title);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/boards/${boardId}`);
    }
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleOpen(e);
    onMenuClick?.();
  };

  const handleAddMember = async () => {
    if (!memberEmail || !memberRole) {
      return;
    }

    try {
      if (onAddMember) {
        await onAddMember(memberEmail, memberRole);
      } else {
        await addBoardMember(boardId, memberEmail, memberRole);
      }

      setMemberEmail('');
      setMemberRole('Reader');
      if (manageOpen) {
        await fetchMembers();
      }
    } catch {
      // ignore for now
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    try {
      if (onRemoveMember) {
        await onRemoveMember(memberId);
      } else {
        await removeBoardMember(boardId, String(memberId));
      }

      if (manageOpen) {
        await fetchMembers();
      }
    } catch {
      // ignore for now
    }
  };

  const handleDelete = () => {
    handleClose();
    onDelete?.();
  };

  const handleAddMemberClick = () => {
    handleClose();
    openManage();
  };

  const handleRenameBoardClick = () => {
    setBoardNameInput(title);
    setIsRenamingBoard(true);
    handleClose();
  };

  const handleCloseRenameDialog = () => {
    setIsRenamingBoard(false);
    setBoardNameInput(title);
  };

  const handleRenameBoard = async () => {
    const trimmed = boardNameInput.trim();
    if (!trimmed || trimmed === title.trim()) {
      return;
    }

    try {
      if (onRenameBoard) {
        await onRenameBoard(trimmed);
      } else {
        await updateBoard(boardId, trimmed);
      }
      setIsRenamingBoard(false);
    } catch {
      // ignore for now
    }
  };

  const fetchMembers = async () => {
    setLoadingMembers(true);
    try {
      const items = await fetchBoardMembers(boardId);
      setMembersList(items);
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleUpdateRole = (memberId: number, role: string) => {
    updateBoardMemberRole(boardId, String(memberId), role)
      .then(() => fetchMembers())
      .catch(() => {});
  };

  useEffect(() => {
    if (manageOpen) {
      void fetchMembers();
    }
  }, [manageOpen]);

  useEffect(() => {
    if (!isRenamingBoard) {
      setBoardNameInput(title);
    }
  }, [title, isRenamingBoard]);

  const membersToShow = members.slice(0, 3);
  const membersCount = members.length;

  return (
    <Card
      role='article'
      aria-label={`Board: ${title}`}
      onClick={handleClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 200ms',
        borderColor: 'divider',
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
          borderColor: 'primary.light',
          '& .card-title': {
            color: 'primary.main',
          },
        },
      }}
    >
      <Box
        sx={{
          height: 96,
          position: 'relative',
          background:
            'linear-gradient(to bottom right, ' +
            'rgba(59, 69, 84, 0.2), ' +
            'rgba(71, 85, 105, 0.2), ' +
            'rgba(100, 116, 139, 0.2))',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: (theme) =>
              `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
          }}
        />
        <IconButton
          aria-label='Board options'
          size='small'
          onClick={handleMenuClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0,
            transition: 'opacity 200ms',
            bgcolor: 'background.paper',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              bgcolor: 'background.default',
            },
            '.MuiCard-root:hover &': {
              opacity: 1,
            },
          }}
        >
          <MoreHoriz sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleRenameBoardClick}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Rename Board
        </MenuItem>
        <MenuItem onClick={handleAddMemberClick}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Manage Members
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          Delete Board
        </MenuItem>
      </Menu>

      <Dialog
        open={manageOpen}
        onClose={closeManage}
        onClick={(e) => e.stopPropagation()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Manage Members</DialogTitle>
        <DialogContent sx={{ minWidth: 480, pt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
            <TextField
              margin="dense"
              size="small"
              label="Add member by email"
              type="email"
              fullWidth
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            <FormControl sx={{ minWidth: 140 }} size="small">
              <InputLabel id={`role-label-${boardId}`}>Role</InputLabel>
              <Select
                labelId={`role-label-${boardId}`}
                id={`role-select-${boardId}`}
                value={memberRole}
                label="Role"
                onChange={(e) => setMemberRole(e.target.value)}
                size="small"
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Reader">Reader</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" sx={{ alignSelf: 'center', ml: 1 }} onClick={handleAddMember} disabled={!memberEmail}>
              Add
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {loadingMembers ? (
              <Typography variant="body2">Loading members...</Typography>
            ) : membersList.length === 0 ? (
              <Typography variant="body2">No members</Typography>
            ) : (
              membersList.map((m) => (
                <Box key={m.userId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">{m.email}</Typography>
                  </Box>
                  <FormControl sx={{ minWidth: 140 }} size="small">
                    <Select value={m.role} onChange={(e) => handleUpdateRole(m.userId, e.target.value)}>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Editor">Editor</MenuItem>
                      <MenuItem value="Reader">Reader</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    aria-label={`Remove ${m.email}`}
                    color="error"
                    size="small"
                    onClick={() => handleRemoveMember(m.userId)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeManage}>Close</Button>
        </DialogActions>
      </Dialog>

      <CardContent
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography
          className='card-title'
          variant='h6'
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            transition: 'color 200ms',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction='row' spacing={-1}>
            {membersToShow.map((member: BoardMember, index: number) => (
              <Avatar
                key={`${member.initials}-${index}`}
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.75rem',
                  border: '2px solid',
                  borderColor: 'background.paper',
                  bgcolor: member.color ?? 'secondary.main',
                  color: 'secondary.contrastText',
                  zIndex: membersToShow.length - index,
                }}
              >
                {member.initials}
              </Avatar>
            ))}
          </Stack>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              color: 'text.secondary',
            }}
          >
            <PeopleAltOutlined sx={{ fontSize: 14 }} />
            <Typography variant='caption' component='span'>
              {membersCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Dialog
        open={isRenamingBoard}
        onClose={handleCloseRenameDialog}
        onClick={(e) => e.stopPropagation()}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Rename Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Board Name"
            fullWidth
            value={boardNameInput}
            onChange={(e) => setBoardNameInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                void handleRenameBoard();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRenameDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleRenameBoard}
            disabled={!boardNameInput.trim() || boardNameInput.trim() === title.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

BoardCard.displayName = 'BoardCard';

