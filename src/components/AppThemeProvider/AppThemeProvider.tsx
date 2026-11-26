import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { PaletteMode } from '@mui/material'
import { createAppTheme } from '../../theme/theme'
import { THEME_STORAGE_KEY, ThemeModeContext } from './themeContext'

function readInitialMode(): PaletteMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // se não der para ler, usa o tema do sistema
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(readInitialMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  const value = useMemo(() => ({
    mode,
    toggleMode: () => {
      const next = mode === 'light' ? 'dark' : 'light'
      setMode(next)
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        // se não der para salvar, o tema muda só agora
      }
    },
  }), [mode])

  return (
    <ThemeModeContext value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext>
  )
}