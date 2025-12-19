'use client'

import { createTheme } from '@mui/material/styles'

// TaskManager Theme - Obsidian Design System
// Converted from Tailwind CSS variables

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(216, 19%, 26%)',      // #3b4554
      light: 'hsl(215, 20%, 65%)',     // #95a3b8
      dark: 'hsl(215, 19%, 34%)',      // #475569
      contrastText: 'hsl(210, 19%, 98%)', // #f8fafc
    },
    secondary: {
      main: 'hsl(215, 19%, 34%)',      // #475569
      light: 'hsl(215, 16%, 46%)',     // #64748b
      dark: 'hsl(222, 47%, 11%)',      // #0f172a
      contrastText: 'hsl(210, 40%, 98%)', // #f8fafc
    },
    error: {
      main: 'hsl(0, 72%, 50%)',        // #dc2626
      light: 'hsl(0, 84%, 60%)',       // #ef4444
      dark: 'hsl(0, 72%, 40%)',        // #b91c1c
      contrastText: 'hsl(0, 85%, 97%)', // #fef2f2
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#fff',
    },
    info: {
      main: 'hsl(215, 20%, 65%)',      // #95a3b8
      light: 'hsl(212, 26%, 83%)',     // #cbd5e1
      dark: 'hsl(215, 16%, 46%)',      // #64748b
      contrastText: 'hsl(222, 47%, 11%)', // #0f172a
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#fff',
    },
    background: {
      default: 'hsl(209, 40%, 96%)',   // #f1f5f9
      paper: 'hsl(210, 40%, 98%)',     // #f8fafc
    },
    text: {
      primary: 'hsl(222, 47%, 11%)',   // #0f172a - foreground
      secondary: 'hsl(215, 16%, 46%)', // #64748b - accent-foreground (para stats, labels)
      disabled: 'hsl(215, 20%, 65%)',  // #95a3b8 - muted
    },
    divider: 'hsl(212, 26%, 83%)',     // #cbd5e1
    action: {
      active: 'hsl(216, 19%, 26%)',           // primary
      hover: 'hsl(210, 40%, 98%)',            // accent (bg-accent hover)
      selected: 'rgba(59, 69, 84, 0.08)',
      disabled: 'rgba(59, 69, 84, 0.26)',
      disabledBackground: 'rgba(59, 69, 84, 0.12)',
      focus: 'hsl(216, 19%, 26%)',            // ring (primary)
      hoverOpacity: 0.04,
    },
  },
  typography: {
    fontFamily: '"DM Sans", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
    h1: {
      fontSize: '2.25rem',      // 36px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem',     // 30px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',       // 24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',      // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',     // 18px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',         // 16px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 2.66,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
  },
  shape: {
    borderRadius: 0, // --radius: 0rem (design uses sharp corners)
  },
  shadows: [
    'none',
    '0 1px 3px 0px hsl(0 0% 0% / 0.05)',                                    // 1 - shadow-2xs
    '0 1px 3px 0px hsl(0 0% 0% / 0.05)',                                    // 2 - shadow-xs
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)',  // 3 - shadow-sm
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)',  // 4 - shadow
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 2px 4px -1px hsl(0 0% 0% / 0.1)',  // 5 - shadow-md
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1)',  // 6 - shadow-lg
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1)',  // 7
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1)', // 8 - shadow-xl
    '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1)', // 9
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 10 - shadow-2xl
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 11
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 12
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 13
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 14
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 15
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 16
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 17
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 18
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 19
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 20
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 21
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 22
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 23
    '0 1px 3px 0px hsl(0 0% 0% / 0.25)',                                    // 24
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'hsl(209, 40%, 96%)',
          color: 'hsl(222, 47%, 11%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: 'hsl(216, 19%, 26%)',
          '&:hover': {
            backgroundColor: 'hsl(215, 19%, 34%)',
          },
        },
        outlinedPrimary: {
          borderColor: 'hsl(212, 26%, 83%)',
          '&:hover': {
            borderColor: 'hsl(216, 19%, 26%)',
            backgroundColor: 'rgba(59, 69, 84, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(210, 40%, 98%)',
          boxShadow: '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)',
          borderRadius: 0,
          border: '1px solid hsl(212, 26%, 83%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 0,
        },
        elevation1: {
          boxShadow: '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(210, 40%, 98%)',
          color: 'hsl(222, 47%, 11%)',
          boxShadow: '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
          borderBottom: '1px solid hsl(212, 26%, 83%)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'hsl(0, 0%, 98%)',
          borderRight: '1px solid hsl(212, 26%, 83%)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': {
              borderColor: 'hsl(212, 26%, 83%)',
            },
            '&:hover fieldset': {
              borderColor: 'hsl(216, 19%, 26%)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'hsl(216, 19%, 26%)',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(212, 26%, 83%)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(216, 19%, 26%)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(216, 19%, 26%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: 'hsl(216, 19%, 26%)',
          color: 'hsl(210, 19%, 98%)',
        },
        colorSecondary: {
          backgroundColor: 'hsl(215, 19%, 34%)',
          color: 'hsl(210, 40%, 98%)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: '0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1)',
          border: '1px solid hsl(212, 26%, 83%)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          backgroundColor: 'hsl(214, 31%, 91%)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'hsl(222, 47%, 11%)',
          color: 'hsl(210, 40%, 98%)',
          fontSize: '0.75rem',
          borderRadius: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'hsl(212, 26%, 83%)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&.Mui-selected': {
            backgroundColor: 'hsl(210, 40%, 98%)',
            '&:hover': {
              backgroundColor: 'hsl(210, 40%, 96%)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'rgba(59, 69, 84, 0.04)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(215, 19%, 34%)',
          color: 'hsl(210, 40%, 98%)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'hsl(216, 19%, 26%)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'hsl(216, 19%, 26%)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            color: 'hsl(216, 19%, 26%)',
          },
        },
      },
    },
  },
})