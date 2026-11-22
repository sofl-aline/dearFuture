import { useEffect, useState } from 'react'
import { Alert, MenuItem, Stack, TextField, Typography } from '@mui/material'
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
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Minhas cápsulas</Typography>
      {result.error ? <Alert severity="error">{result.error}</Alert> : (
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
