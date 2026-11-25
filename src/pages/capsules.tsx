import { useEffect, useState } from 'react'
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { Inbox, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import CapsuleCard from '../components/CapsuleCard/CapsuleCard'
import { listCapsules } from '../services/capsuleStorage'
import type { Capsule } from '../types/capsule'

type Result = { capsules: Capsule[]; error: string }

export default function Capsules() {
  const [result] = useState<Result>(() => {
    try {
      return { capsules: listCapsules(), error: '' }
    } catch {
      return { capsules: [], error: 'Não foi possível ler as cápsulas salvas.' }
    }
  })
  const [filter, setFilter] = useState('all')
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const visible = result.capsules.filter((capsule) => {
    if (filter === 'future') return Date.parse(capsule.opensAt) > now
    if (filter === 'available') return Date.parse(capsule.opensAt) <= now
    return true
  })

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}
      >
        <Box>
          <Typography component="h1" variant="h4">Minhas cápsulas</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
            As cartas que você guardou para o futuro.
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/capsules/new"
          variant="contained"
          startIcon={<Plus size={20} strokeWidth={1.75} aria-hidden="true" />}
        >
          Nova cápsula
        </Button>
      </Stack>

      {result.error ? <Alert severity="error">{result.error}</Alert> : result.capsules.length === 0 ? (
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, textAlign: 'center' }}>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Box sx={{ color: 'primary.main' }}>
              <Inbox size={40} strokeWidth={1.5} aria-hidden="true" />
            </Box>
            <Typography>Você ainda não guardou nenhuma cápsula.</Typography>
            <Button component={Link} to="/capsules/new" variant="contained">Criar a primeira cápsula</Button>
          </Stack>
        </Paper>
      ) : (
        <>
          <TextField
            select
            size="small"
            label="Exibir"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            sx={{ width: '100%', maxWidth: 280 }}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="future">Seladas</MenuItem>
            <MenuItem value="available">Disponíveis para abertura</MenuItem>
          </TextField>

          {visible.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 5 }}>
              <Stack spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                <Typography>Nenhuma cápsula encontrada neste filtro.</Typography>
                <Button onClick={() => setFilter('all')}>Mostrar todas</Button>
              </Stack>
            </Paper>
          ) : (
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              }}
            >
              {visible.map((capsule) => (
                <li key={capsule.id}>
                  <CapsuleCard capsule={capsule} now={now} headingComponent="h2" />
                </li>
              ))}
            </Box>
          )}
        </>
      )}
    </Stack>
  )
}