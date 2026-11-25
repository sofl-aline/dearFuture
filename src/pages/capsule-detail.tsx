import { useEffect, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material'
import { ArrowLeft, CalendarDays, Clock, LockKeyholeOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getCapsule, readMessage } from '../services/capsuleApi'
import useCountdown from '../hooks/useCountdown'
import type { Capsule } from '../types/capsule'
import HolidayContext from '../components/HolidayContext/HolidayContext'
import CapsuleStatus from '../components/CapsuleStatus/CapsuleStatus'

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
    <Stack spacing={3}>
      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: '24px' }}>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <CapsuleStatus available={countdown.available} />
          <Typography component="h1" variant="h4" sx={{ overflowWrap: 'anywhere' }}>{capsule.title}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary' }}>
            <CalendarDays size={20} strokeWidth={1.75} aria-hidden="true" />
            <Typography>Abertura em {new Date(capsule.opensAt).toLocaleString('pt-BR')}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', color: 'primary.main' }}>
              <Clock size={20} strokeWidth={1.75} aria-hidden="true" />
            </Box>
            <Typography sx={{ fontWeight: 700 }}>
              {countdown.available ? 'Disponível para abertura.' : countdown.label}
            </Typography>
          </Stack>
          {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
          {countdown.available && message === null && (
            <Button
              variant="contained"
              disabled={busy}
              onClick={openCapsule}
              startIcon={<LockKeyholeOpen size={20} strokeWidth={1.75} aria-hidden="true" />}
            >
              {busy ? 'Abrindo…' : 'Abrir cápsula'}
            </Button>
          )}
          {message !== null && (
            <Box
              sx={{
                width: '100%',
                p: { xs: 2, md: 3 },
                borderRadius: '16px',
                bgcolor: 'rgba(185, 167, 245, 0.16)',
                borderLeft: '3px solid #7C63DB',
              }}
            >
              <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', lineHeight: 1.7 }}>
                {message}
              </Typography>
            </Box>
          )}
        </Stack>
      </Paper>
      <HolidayContext createdAt={capsule.createdAt} />
    </Stack>
  )
}

export default function CapsuleDetail() {
  const { id } = useParams()
  return (
    <Stack spacing={2} sx={{ maxWidth: 860 }}>
      <Button
        component={Link}
        to="/capsules"
        startIcon={<ArrowLeft size={20} strokeWidth={1.75} aria-hidden="true" />}
        sx={{ alignSelf: 'flex-start', px: 1 }}
      >
        Voltar às cápsulas
      </Button>
      <CapsuleDetails key={id} id={id ?? ''} />
    </Stack>
  )
}