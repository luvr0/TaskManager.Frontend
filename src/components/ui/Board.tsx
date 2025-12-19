

'use client'

import { forwardRef } from 'react'
import { Box, Typography, SvgIcon } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { BoardProps } from '@/interfaces/components'
import type { Member } from '@/types/board'

export const Board = forwardRef<HTMLDivElement, BoardProps>(
	({ title, subtitle, members = [], count, sx, children, ...props }, ref) => {
		const theme = useTheme()
		const displayCount = typeof count === 'number' ? count : members.length

		return (
			<Box
				ref={ref}
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 2,
					...sx,
				}}
				{...props}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					{title && (
						<Typography component="div" variant="subtitle1">
							{title}
						</Typography>
					)}
					{subtitle && (
						<Typography component="div" variant="body2" color="text.secondary">
							{subtitle}
						</Typography>
					)}
					{children}
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{members.slice(0, 3).map((m: Member, i: number) => (
							<Box
								key={i}
								sx={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: 32,
									height: 32,
									borderRadius: '50%',
									overflow: 'hidden',
									border: '2px solid',
									borderColor: theme.palette.divider,
									bgcolor: m.color ?? theme.palette.secondary.main,
									color: theme.palette.secondary.contrastText,
									fontSize: 12,
									fontWeight: 600,
									zIndex: 3 - i,
									ml: i === 0 ? 0 : -2,
								}}
							>
								{m.initials}
							</Box>
						))}
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.text.disabled, fontSize: 12 }}>
						<SvgIcon sx={{ fontSize: 14 }} viewBox="0 0 24 24">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
							<circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
							<path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
						</SvgIcon>
						<Box component="span">{displayCount}</Box>
					</Box>
				</Box>
			</Box>
		)
	}
)

Board.displayName = 'Board'

