import { useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { getCapsule } from '../services/capsuleStorage'
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
  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">{result.capsule.title}</Typography>
      <Typography>Abertura em {new Date(result.capsule.opensAt).toLocaleString('pt-BR')}</Typography>
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
