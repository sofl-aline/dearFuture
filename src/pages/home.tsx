import { useEffect, useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CapsuleCard from '../components/CapsuleCard/CapsuleCard'
import useCapsules from '../hooks/useCapsules'
import type { Capsule } from '../types/capsule'

export default function Home() {
  const { result, retry } = useCapsules()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const nextCapsule = result.status === 'ready'
    ? result.capsules.reduce<Capsule | undefined>((next, capsule) => {
      const opensAt = Date.parse(capsule.opensAt)
      if (!Number.isFinite(opensAt) || opensAt <= now) return next
      if (!next || opensAt < Date.parse(next.opensAt)) return capsule
      return next
    }, undefined)
    : undefined

  return (
    <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
      <Typography component="h1" variant="h4">Dear Future</Typography>
      <Typography>Escreva uma carta para o seu futuro.</Typography>
      <Button component={Link} to="/capsules/new" variant="contained">Nova cápsula</Button>
      <Stack component="section" spacing={1} sx={{ width: '100%' }}>
        <Typography component="h2" variant="h6">Próxima cápsula</Typography>
        {result.status === 'loading' && <Typography role="status">Carregando cápsulas…</Typography>}
        {result.status === 'error' && (
          <Alert severity="error" action={<Button onClick={retry}>Tentar novamente</Button>}>
            {result.message}
          </Alert>
        )}
        {result.status === 'ready' && (
          nextCapsule
            ? <CapsuleCard capsule={nextCapsule} />
            : <Typography>Nenhuma cápsula com abertura futura.</Typography>
        )}
      </Stack>
    </Stack>
  )
}
