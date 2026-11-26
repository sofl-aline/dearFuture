import { Box, Button, Stack, Typography } from '@mui/material'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Capsule } from '../../types/capsule'

type NextOpeningCardProps = {
  capsule: Capsule
  now: number
}

export default function NextOpeningCard({ capsule, now }: NextOpeningCardProps) {
  const seconds = Math.max(0, Math.ceil((Date.parse(capsule.opensAt) - now) / 1000))
  const parts = [
    { value: Math.floor(seconds / 86400), label: 'dias' },
    { value: Math.floor(seconds / 3600) % 24, label: 'horas' },
    { value: Math.floor(seconds / 60) % 60, label: 'min' },
    { value: seconds % 60, label: 'seg' },
  ]
  const opensAt = new Date(capsule.opensAt).toLocaleString('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Stack spacing={2}>
      <Box>
        <Typography component="h3" variant="subtitle1" sx={{ fontSize: '1.15rem', overflowWrap: 'anywhere' }}>
          {capsule.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary', mt: 0.5 }}>
          <CalendarDays size={18} strokeWidth={1.75} aria-hidden="true" />
          <Typography variant="body2">Abertura em {opensAt}</Typography>
        </Stack>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 1 }}>
        {parts.map((part) => (
          <Box
            key={part.label}
            sx={{
              py: 1.25,
              textAlign: 'center',
              borderRadius: '12px',
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.1 }}>
              {String(part.value).padStart(2, '0')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{part.label}</Typography>
          </Box>
        ))}
      </Box>

      <Button
        component={Link}
        to={`/capsules/${capsule.id}`}
        endIcon={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}
        sx={{ alignSelf: 'flex-start', px: 1 }}
      >
        Ver cápsula
      </Button>
    </Stack>
  )
}
