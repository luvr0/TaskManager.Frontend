'use client'

import { useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { BoardsItemPage } from '@/components/BoardsItemPage'
import { Navbar } from '@/components/ui/Navbar'
import { useAuth } from '@/hooks'

export default function Boards() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (!isAuthenticated) {
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
    <>
      <Navbar />
      <BoardsItemPage />
    </>
  )
}