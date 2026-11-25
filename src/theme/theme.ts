import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'

export function createAppTheme(mode: PaletteMode) {
  const light = mode === 'light'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: light ? '#5835C5' : '#CDB8FF',
        contrastText: light ? '#FFFFFF' : '#1B1433',
      },
      secondary: { main: '#45A5FF' },
      background: {
        default: light ? '#F8F4FC' : '#17142D',
        paper: light ? '#FCF9FF' : '#2D264B',
      },
      text: {
        primary: light ? '#241644' : '#F8F5FF',
        secondary: light ? '#625372' : '#D6CEE8',
      },
      divider: light ? '#DED2EF' : '#594975',
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Nunito Variable", "Segoe UI", system-ui, sans-serif',
      h1: {
        fontSize: '2.25rem',
        fontWeight: 800,
        lineHeight: 1.2,
        '@media (max-width:600px)': { fontSize: '1.75rem' },
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 800,
        lineHeight: 1.2,
        '@media (max-width:600px)': { fontSize: '1.625rem' },
      },
      h6: { fontSize: '1.2rem', fontWeight: 800 },
      subtitle1: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700, fontSize: '0.95rem' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 24,
            minHeight: 44,
            paddingInline: 20,
            variants: [
              {
                props: { variant: 'contained', color: 'primary' },
                style: {
                  color: '#FFFFFF',
                  background: light
                    ? 'linear-gradient(135deg, #7952CA, #6745C2)'
                    : 'linear-gradient(135deg, #2462C6, #6940CC)',
                  '&:hover': {
                    background: light
                      ? 'linear-gradient(135deg, #6A43BC, #5835B0)'
                      : 'linear-gradient(135deg, #1D55AF, #5B33B8)',
                  },
                },
              },
            ],
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: light ? '0 8px 24px rgba(59, 45, 109, 0.06)' : 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 14 } },
      },
      MuiAlert: {
        styleOverrides: { root: { borderRadius: 14 } },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 700 } },
      },
    },
  })
}