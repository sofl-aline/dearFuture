import { Box, Paper, Stack, useTheme } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import wavesLight from '../../assets/decorations/background-waves-light.svg'
import wavesDark from '../../assets/decorations/background-waves-dark.svg'
import BrandLogo from '../BrandLogo/BrandLogo'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

export default function AuthLayout() {
  const theme = useTheme()
  const light = theme.palette.mode === 'light'

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box
        component="img"
        src={light ? wavesLight : wavesDark}
        alt=""
        sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', opacity: 0.7, pointerEvents: 'none' }}
      />
      <Stack
        component="header"
        direction="row"
        sx={{ position: 'relative', justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, md: 5 }, py: 3 }}
      >
        <Box
          component={Link}
          to="/"
          aria-label="Dear Future — início"
          sx={{ color: 'primary.main', textDecoration: 'none', borderRadius: '8px' }}
        >
          <BrandLogo size={40} />
        </Box>
        <ThemeToggle />
      </Stack>
      <Box
        component="main"
        sx={{ position: 'relative', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', px: 2, py: { xs: 2, md: 4 } }}
      >
        <Paper variant="outlined" sx={{ width: '100%', maxWidth: 480, p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  )
}
