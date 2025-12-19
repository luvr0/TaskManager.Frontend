'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'
import { Navbar } from '@/components/ui/Navbar'
import { BoardViewPage } from '@/components/BoardViewPage'
import { useAuth } from '@/hooks'

export default function BoardPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, isLoading } = useAuth()
  const boardId = params?.id as string

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (!isAuthenticated || !boardId) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <BoardViewPage boardId={boardId} />
    </Box>
  )
}
