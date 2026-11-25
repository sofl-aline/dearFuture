import { Box, Stack, Typography } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import AppNavigation from '../AppNavigation/AppNavigation'
import BrandLogo from '../BrandLogo/BrandLogo'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const SIDEBAR_WIDTH = 248

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component="a"
        href="#conteudo"
        sx={{
          position: 'absolute',
          left: -9999,
          top: 8,
          zIndex: 10,
          px: 2,
          py: 1,
          borderRadius: '8px',
          bgcolor: 'background.paper',
          color: 'text.primary',
          '&:focus': { left: 8 },
        }}
      >
        Pular para o conteúdo
      </Box>

      {/* menu lateral no computador */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          gap: 4,
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          p: 3,
          color: '#F8F5FF',
          bgcolor: (theme) => (theme.palette.mode === 'light' ? '#2A1F45' : '#100D22'),
        }}
      >
        <Box
          component={Link}
          to="/"
          aria-label="Dear Future — início"
          sx={{ color: 'inherit', textDecoration: 'none', alignSelf: 'flex-start', borderRadius: '8px' }}
        >
          <BrandLogo />
        </Box>
        <AppNavigation orientation="vertical" />
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ fontStyle: 'italic', opacity: 0.8, borderLeft: '2px solid #B9A7F5', pl: 1.5 }}>
          Guarde o hoje para o seu futuro.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ThemeToggle />
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Tema</Typography>
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* topo no celular e no tablet */}
        <Box
          component="header"
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 1.5,
            px: 2,
            py: 2,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            color: 'text.primary',
          }}
        >
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              component={Link}
              to="/"
              aria-label="Dear Future — início"
              sx={{ color: 'primary.main', textDecoration: 'none', borderRadius: '8px' }}
            >
              <BrandLogo size={36} />
            </Box>
            <ThemeToggle />
          </Stack>
          <AppNavigation orientation="horizontal" />
        </Box>

        <Box
          component="main"
          id="conteudo"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 5 },
            py: { xs: 3, md: 5 },
            '&:focus': { outline: 'none' },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}