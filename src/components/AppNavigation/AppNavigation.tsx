import { Box, Button } from '@mui/material'
import { Box as BoxIcon, House, Plus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const items = [
  { to: '/', label: 'Início', icon: House, isActive: (path: string) => path === '/' },
  {
    to: '/capsules',
    label: 'Minhas cápsulas',
    icon: BoxIcon,
    isActive: (path: string) => path.startsWith('/capsules') && path !== '/capsules/new',
  },
  { to: '/capsules/new', label: 'Nova cápsula', icon: Plus, isActive: (path: string) => path === '/capsules/new' },
]

type AppNavigationProps = { orientation: 'vertical' | 'horizontal' }

export default function AppNavigation({ orientation }: AppNavigationProps) {
  const { pathname } = useLocation()
  const vertical = orientation === 'vertical'

  return (
    <Box component="nav" aria-label="Navegação principal">
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: 0.5,
        }}
      >
        {items.map(({ to, label, icon: Icon, isActive }) => {
          const active = isActive(pathname)
          return (
            <li key={to}>
              <Button
                component={Link}
                to={to}
                aria-current={active ? 'page' : undefined}
                fullWidth={vertical}
                startIcon={<Icon size={20} strokeWidth={1.75} aria-hidden="true" />}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'inherit',
                  borderRadius: '12px',
                  px: 2,
                  fontWeight: active ? 800 : 600,
                  bgcolor: active ? 'rgba(185, 167, 245, 0.22)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(185, 167, 245, 0.14)' },
                }}
              >
                {label}
              </Button>
            </li>
          )
        })}
      </Box>
    </Box>
  )
}