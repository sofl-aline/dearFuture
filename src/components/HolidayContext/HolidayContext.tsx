import { useEffect, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material'
import { CalendarHeart, RefreshCw } from 'lucide-react'
import { getHolidays } from '../../services/holidaysApi'
import type { Holiday } from '../../services/holidaysApi'

type Result =
  | { status: 'loading' }
  | { status: 'ready'; holidays: Holiday[] }
  | { status: 'error' }

function HolidayRequest({ createdAt }: { createdAt: string }) {
  const [result, setResult] = useState<Result>({ status: 'loading' })
  useEffect(() => {
    const controller = new AbortController()
    const date = new Date(createdAt)
    getHolidays(date.getFullYear(), controller.signal)
      .then((holidays) => {
        if (controller.signal.aborted) return
        const month = String(date.getMonth() + 1).padStart(2, '0')
        setResult({
          status: 'ready',
          holidays: holidays.filter((holiday) => holiday.date.slice(5, 7) === month),
        })
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ status: 'error' })
      })
    return () => controller.abort()
  }, [createdAt])

  if (result.status === 'loading') {
    return <Typography role="status" sx={{ color: 'text.secondary' }}>Carregando feriados…</Typography>
  }
  if (result.status === 'error') {
    return <Alert severity="error">Não foi possível consultar os feriados.</Alert>
  }
  if (result.holidays.length === 0) {
    return <Typography sx={{ color: 'text.secondary' }}>Nenhum feriado nacional neste mês.</Typography>
  }
  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {result.holidays.map((holiday) => (
        <Stack
          component="li"
          key={holiday.date}
          direction="row"
          spacing={1.5}
          sx={{ alignItems: 'center', p: 1.25, borderRadius: '12px', bgcolor: 'rgba(185, 167, 245, 0.14)' }}
        >
          <Box
            component="span"
            sx={{ fontWeight: 800, minWidth: 92, color: 'primary.main', fontVariantNumeric: 'tabular-nums' }}
          >
            {holiday.date.split('-').reverse().join('/')}
          </Box>
          <Typography component="span">{holiday.name}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default function HolidayContext({ createdAt }: { createdAt: string }) {
  const [attempt, setAttempt] = useState(0)
  return (
    <Paper component="section" aria-labelledby="holidays-title" variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '24px' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ display: 'flex', color: 'primary.main' }}>
            <CalendarHeart size={24} strokeWidth={1.75} aria-hidden="true" />
          </Box>
          <Typography id="holidays-title" component="h2" variant="h6">Feriados no mês de criação</Typography>
        </Stack>
        <HolidayRequest key={`${createdAt}-${attempt}`} createdAt={createdAt} />
        <Button
          variant="outlined"
          onClick={() => setAttempt((current) => current + 1)}
          startIcon={<RefreshCw size={18} strokeWidth={1.75} aria-hidden="true" />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Consultar novamente
        </Button>
      </Stack>
    </Paper>
  )
}