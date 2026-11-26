import { Button, IconButton, Tooltip } from '@mui/material'
import { Moon, Sun } from 'lucide-react'
import { useThemeMode } from '../AppThemeProvider/themeContext'

type ThemeToggleProps = { showLabel?: boolean }

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { mode, toggleMode } = useThemeMode()
  const label = mode === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'
  const icon = mode === 'light'
    ? <Moon size={20} strokeWidth={1.75} aria-hidden="true" />
    : <Sun size={20} strokeWidth={1.75} aria-hidden="true" />

  if (showLabel) {
    return (
      <Button
        onClick={toggleMode}
        fullWidth
        startIcon={icon}
        sx={{ justifyContent: 'flex-start', color: 'inherit', borderRadius: '12px', px: 2, fontWeight: 600 }}
      >
        {mode === 'light' ? 'Tema escuro' : 'Tema claro'}
      </Button>
    )
  }

  return (
    <Tooltip title={label}>
      <IconButton onClick={toggleMode} aria-label={label} sx={{ width: 44, height: 44, color: 'inherit' }}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}