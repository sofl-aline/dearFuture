import { useEffect, useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
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

  if (result.status === 'loading') return <Typography role="status">Carregando feriados…</Typography>
  if (result.status === 'error') return <Alert severity="error">Não foi possível consultar os feriados.</Alert>
  if (result.holidays.length === 0) return <Typography>Nenhum feriado nacional neste mês.</Typography>
  return (
    <Stack component="ul" spacing={1}>
      {result.holidays.map((holiday) => (
        <Typography component="li" key={holiday.date}>
          {holiday.date.split('-').reverse().join('/')} — {holiday.name}
        </Typography>
      ))}
    </Stack>
  )
}

export default function HolidayContext({ createdAt }: { createdAt: string }) {
  const [attempt, setAttempt] = useState(0)
  return (
    <Stack component="section" spacing={1}>
      <Typography component="h2" variant="h6">Feriados no mês de criação</Typography>
      <HolidayRequest key={`${createdAt}-${attempt}`} createdAt={createdAt} />
      <Button onClick={() => setAttempt((current) => current + 1)}>
        Consultar novamente
      </Button>
    </Stack>
  )
}