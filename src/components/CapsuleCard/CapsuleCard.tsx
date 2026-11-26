import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import { Box as BoxIcon, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Capsule } from '../../types/capsule'
import CapsuleStatus from '../CapsuleStatus/CapsuleStatus'

type Props = {
  capsule: Capsule
  now?: number
  headingComponent?: 'h2' | 'h3'
}

export default function CapsuleCard({ capsule, now, headingComponent = 'h3' }: Props) {
  const available = now !== undefined && Date.parse(capsule.opensAt) <= now
  const opensAt = new Date(capsule.opensAt).toLocaleString('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        component={Link}
        to={`/capsules/${capsule.id}`}
        sx={{
          height: '100%',
          p: 2.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: 'rgba(185, 167, 245, 0.22)',
            }}
          >
            <BoxIcon size={22} strokeWidth={1.75} />
          </Box>
          {now !== undefined && <CapsuleStatus available={available} />}
        </Stack>
        <Typography
          component={headingComponent}
          variant="subtitle1"
          sx={{ fontSize: '1.05rem', overflowWrap: 'anywhere' }}
        >
          {capsule.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'text.secondary', mt: 'auto' }}>
          <CalendarDays size={18} strokeWidth={1.75} aria-hidden="true" />
          <Typography variant="body2">Abertura em {opensAt}</Typography>
        </Stack>
      </CardActionArea>
    </Card>
  )
}