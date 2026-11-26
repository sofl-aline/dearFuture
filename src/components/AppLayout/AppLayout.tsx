import { Box, Button, Stack, Typography } from '@mui/material'
import { LogIn, LogOut } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useSession from '../../hooks/useSession'
import { setToken } from '../../services/api'
import AppNavigation from '../AppNavigation/AppNavigation'
import AuthLayout from '../AuthLayout/AuthLayout'
import BrandLogo from '../BrandLogo/BrandLogo'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const SIDEBAR_WIDTH = 248

const sideButton = { color: 'inherit', justifyContent: 'flex-start', borderRadius: '12px', px: 2, fontWeight: 600 }

function SessionButton({ loggedIn, fullWidth = false }: { loggedIn: boolean; fullWidth?: boolean }) {
  return loggedIn ? (
    <Button
      onClick={() => setToken(null)}
      fullWidth={fullWidth}
      startIcon={<LogOut size={20} strokeWidth={1.75} aria-hidden="true" />}
      sx={sideButton}
    >
      Sair
    </Button>
  ) : (
    <Button
      component={Link}
      to="/login"
      fullWidth={fullWidth}
      startIcon={<LogIn size={20} strokeWidth={1.75} aria-hidden="true" />}
      sx={sideButton}
    >
      Entrar
    </Button>
  )
}

export default function AppLayout() {
  const token = useSession()
  const { pathname } = useLocation()

  // entrar e criar conta: só o formulário, sem o menu
  if (pathname === '/login' || pathname === '/register') {
    return <AuthLayout />
  }

  // página inicial de quem não entrou: a apresentação ocupa a tela toda
  if (pathname === '/' && !token) {
    return <Outlet />
  }

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
        <Stack spacing={0.5} sx={{ borderTop: '1px solid rgba(185, 167, 245, 0.25)', pt: 2 }}>
          <ThemeToggle showLabel />
          <SessionButton loggedIn={Boolean(token)} fullWidth />
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
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <ThemeToggle />
              <SessionButton loggedIn={Boolean(token)} />
            </Stack>
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