'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import { NewBoardModal } from './NewBoardModal';
import { BoardCard } from './BoardCard';
import { BoardsHeader } from './BoardsHeader';
import { Container } from '@/components/ui/Container';
import { useNewBoardModal, useBoards } from '@/hooks';

export function BoardsItemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    boards,
    isLoading,
    error,
    createNewBoard,
    deleteBoardById,
    addMemberToBoard,
    removeMemberFromBoard,
    clearError,
    renameBoard,
  } = useBoards();

  const {
    closeModal,
    createAndClose,
    open,
    openModal,
  } = useNewBoardModal(false, createNewBoard);

  const filteredBoards = (boards || []).filter((board) =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth='xl' centered>
      <Box
        sx={{
          p: { xs: 3, lg: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <BoardsHeader
          subtitle={`${boards?.length || 0} boards total`}
          onCreate={openModal}
        />

        <NewBoardModal
          open={open}
          onClose={closeModal}
          onCreate={createAndClose}
        />

        <Box sx={{ maxWidth: 480, position: 'relative' }}>
          <TextField
            fullWidth
            placeholder='Search boards...'
            aria-label='Search boards'
            variant='outlined'
            size='small'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search
                    sx={{
                      fontSize: 16,
                      color: 'text.secondary',
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" onClose={clearError}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredBoards.length === 0 ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    color: 'text.secondary',
                  }}
                >
                  {searchQuery
                    ? 'No board found with that name.'
                    : 'You don\'t have any boards yet. Create one to get started!'}
                </Box>
              </Grid>
            ) : (
              filteredBoards.map((board) => (
                <Grid
                  item
                  key={board.id}
                  xs={12}
                  sm={6}
                  lg={3}
                  xl={3}
                >
                  <BoardCard
                    boardId={board.id}
                    title={board.title}
                    stats={board.stats}
                    members={board.members}
                    onDelete={() => deleteBoardById(board.id)}
                    onAddMember={(email, role) => addMemberToBoard(board.id, email, role)}
                    onRemoveMember={(memberId) => removeMemberFromBoard(board.id, memberId)}
                    onRenameBoard={(newName) => renameBoard(board.id, newName)}
                  />
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

