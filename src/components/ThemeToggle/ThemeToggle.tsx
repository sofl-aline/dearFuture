import { IconButton, Tooltip } from '@mui/material'
import { Moon, Sun } from 'lucide-react'
import { useThemeMode } from '../AppThemeProvider/themeContext'

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode()
  const label = mode === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'

  return (
    <Tooltip title={label}>
      <IconButton onClick={toggleMode} aria-label={label} sx={{ width: 44, height: 44, color: 'inherit' }}>
        {mode === 'light'
          ? <Moon size={20} strokeWidth={1.75} aria-hidden="true" />
          : <Sun size={20} strokeWidth={1.75} aria-hidden="true" />}
      </IconButton>
    </Tooltip>
  )
}