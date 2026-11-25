import { useEffect, useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { getCapsule, readMessage } from '../services/capsuleApi'
import useCountdown from '../hooks/useCountdown'
import type { Capsule } from '../types/capsule'
import HolidayContext from '../components/HolidayContext/HolidayContext'

type Result =
  | { status: 'loading' }
  | { status: 'ready'; capsule: Capsule }
  | { status: 'error'; message: string }

function CapsuleDetails({ id }: { id: string }) {
  const [result, setResult] = useState<Result>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    getCapsule(id, controller.signal)
      .then((capsule) => {
        if (!controller.signal.aborted) setResult({ status: 'ready', capsule })
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setResult({ status: 'error', message: error.message })
      })
    return () => controller.abort()
  }, [id, attempt])

  function retry() {
    setResult({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  if (result.status === 'loading') return <Typography role="status">Carregando cápsula…</Typography>
  if (result.status === 'error') return (
    <Alert severity="error" action={<Button onClick={retry}>Tentar novamente</Button>}>
      {result.message}
    </Alert>
  )
  return <CapsuleContent capsule={result.capsule} />
}

function CapsuleContent({ capsule }: { capsule: Capsule }) {
  const countdown = useCountdown(capsule.opensAt)
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function openCapsule() {
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const result = await readMessage(capsule.id)
      setMessage(result.message)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível abrir a cápsula.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">{capsule.title}</Typography>
      <Typography>Abertura em {new Date(capsule.opensAt).toLocaleString('pt-BR')}</Typography>
      <Typography>{countdown.available ? 'Disponível para abertura.' : countdown.label}</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {countdown.available && message === null && (
        <Button variant="contained" disabled={busy} onClick={openCapsule}>
          {busy ? 'Abrindo…' : 'Abrir cápsula'}
        </Button>
      )}
      {message !== null && (
        <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{message}</Typography>
      )}
      <HolidayContext createdAt={capsule.createdAt} />
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
