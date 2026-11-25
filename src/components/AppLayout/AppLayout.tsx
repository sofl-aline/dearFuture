import { Button, Container, Stack } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import useSession from '../../hooks/useSession'
import { setToken } from '../../services/api'

export default function AppLayout() {
  const token = useSession()

  return (
    <>
      <Container component="header" maxWidth="md" sx={{ py: 2 }}>
        <Stack component="nav" aria-label="Navegação principal" direction="row"
          useFlexGap spacing={1}
          sx={{
            flexWrap: 'wrap',
            '& [aria-current="page"]': {
              bgcolor: 'action.selected',
              fontWeight: 'bold',
            },
          }}>
          <Button component={NavLink} to="/" end>Início</Button>
          <Button component={NavLink} to="/capsules/new">Nova cápsula</Button>
          <Button component={NavLink} to="/capsules" end>Minhas cápsulas</Button>
          {token
            ? <Button onClick={() => setToken(null)}>Sair</Button>
            : <Button component={NavLink} to="/login">Entrar</Button>}
        </Stack>
      </Container>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}
