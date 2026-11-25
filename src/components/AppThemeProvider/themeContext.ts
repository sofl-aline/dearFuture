import { createContext, useContext } from 'react'
import type { PaletteMode } from '@mui/material'

export const THEME_STORAGE_KEY = 'dear-future:theme'

type ThemeModeValue = {
  mode: PaletteMode
  toggleMode: () => void
}

export const ThemeModeContext = createContext<ThemeModeValue>({
  mode: 'light',
  toggleMode: () => {},
})

export function useThemeMode() {
  return useContext(ThemeModeContext)
}