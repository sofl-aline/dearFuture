import { useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { getCapsule } from '../services/capsuleStorage'
import useCountdown from '../hooks/useCountdown'
import type { Capsule } from '../types/capsule'

type Result = { capsule: Capsule | undefined; error: boolean }

function CapsuleDetails({ id }: { id: string }) {
  const [result] = useState<Result>(() => {
    try {
      return { capsule: getCapsule(id), error: false }
    } catch {
      return { capsule: undefined, error: true }
    }
  })
  if (result.error) return <Alert severity="error">Não foi possível carregar a cápsula.</Alert>
  if (!result.capsule) return <Alert severity="info">Cápsula não encontrada.</Alert>
  return <CapsuleContent capsule={result.capsule} />
}

function CapsuleContent({ capsule }: { capsule: Capsule }) {
  const countdown = useCountdown(capsule.opensAt)
  const [opened, setOpened] = useState(false)
  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">{capsule.title}</Typography>
      <Typography>Abertura em {new Date(capsule.opensAt).toLocaleString('pt-BR')}</Typography>
      <Typography>{countdown.available ? 'Disponível para abertura.' : countdown.label}</Typography>
      {countdown.available && !opened && (
        <Button variant="contained" onClick={() => setOpened(true)}>Abrir cápsula</Button>
      )}
      {countdown.available && opened && (
        <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {capsule.message}
        </Typography>
      )}
    </Stack>
  )
}

export default function CapsuleDetail() {
  const { id } = useParams()
  return (
    <Stack spacing={2}>
      <Button component={Link} to="/capsules">Voltar às cápsulas</Button>
      <CapsuleDetails key={id} id={id ?? ''} />
    </Stack>
  )
}
