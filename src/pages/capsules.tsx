import { useEffect, useState } from 'react'
import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import CapsuleCard from '../components/CapsuleCard/CapsuleCard'
import useCapsules from '../hooks/useCapsules'

export default function Capsules() {
  const { result, retry } = useCapsules()
  const [filter, setFilter] = useState('all')
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const visible = result.status === 'ready' ? result.capsules.filter((capsule) => {
    if (filter === 'future') return Date.parse(capsule.opensAt) > now
    if (filter === 'available') return Date.parse(capsule.opensAt) <= now
    return true
  }) : []

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Minhas cápsulas</Typography>
      {result.status === 'loading' && <Typography role="status">Carregando cápsulas…</Typography>}
      {result.status === 'error' && (
        <Alert severity="error" action={<Button onClick={retry}>Tentar novamente</Button>}>
          {result.message}
        </Alert>
      )}
      {result.status === 'ready' && (
        <>
          <TextField select label="Exibir" value={filter}
            onChange={(event) => setFilter(event.target.value)}>
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="future">Seladas</MenuItem>
            <MenuItem value="available">Disponíveis para abertura</MenuItem>
          </TextField>
          {visible.length === 0 && <Typography>Nenhuma cápsula encontrada.</Typography>}
          {visible.map((capsule) => <CapsuleCard key={capsule.id} capsule={capsule} />)}
        </>
      )}
    </Stack>
  )
}
