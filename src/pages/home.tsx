import { useEffect, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { ArrowRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import capsuleHero from '../assets/illustrations/capsule-hero.webp'
import wavesLight from '../assets/decorations/background-waves-light.svg'
import wavesDark from '../assets/decorations/background-waves-dark.svg'
import sparkle from '../assets/decorations/sparkle.svg'
import CapsuleCard from '../components/CapsuleCard/CapsuleCard'
import NextOpeningCard from '../components/NextOpeningCard/NextOpeningCard'
import useCapsules from '../hooks/useCapsules'
import type { Capsule } from '../types/capsule'

export default function Home() {
  const theme = useTheme()
  const light = theme.palette.mode === 'light'
  const { result, retry } = useCapsules()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const capsules = result.status === 'ready' ? result.capsules : []

  // a próxima a abrir é a de menor data que ainda está no futuro
  const nextCapsule = capsules.reduce<Capsule | undefined>((next, capsule) => {
    const opensAt = Date.parse(capsule.opensAt)

    if (!Number.isFinite(opensAt) || opensAt <= now) {
      return next
    }

    if (!next || opensAt < Date.parse(next.opensAt)) {
      return capsule
    }

    return next
  }, undefined)

  const sealed = capsules.filter((capsule) => Date.parse(capsule.opensAt) > now).length
  const available = capsules.length - sealed

  // as três criadas por último
  const recent = [...capsules]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 3)

  const stats = [
    { value: capsules.length, label: 'registradas' },
    { value: sealed, label: 'seladas' },
    { value: available, label: 'disponíveis' },
  ]

  return (
    <Stack spacing={4}>
      <Paper
        component="section"
        aria-labelledby="home-title"
        variant="outlined"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '28px',
          p: { xs: 3, md: 5 },
          minHeight: { sm: 300 },
          background: light
            ? 'linear-gradient(135deg, #EEE6FF 0%, #F8F4FC 60%, #E3F1FF 100%)'
            : 'linear-gradient(135deg, #2D264B 0%, #231D3F 60%, #1E2A4F 100%)',
        }}
      >
        {/* decoração: ondas no fundo, cápsula e brilho */}
        <Box
          component="img"
          src={light ? wavesLight : wavesDark}
          alt=""
          sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', opacity: 0.85, pointerEvents: 'none' }}
        />
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            right: { sm: 16, md: 48 },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { sm: 200, md: 260 },
            height: { sm: 200, md: 260 },
            pointerEvents: 'none',
          }}
        >
          <Box component="img" src={capsuleHero} alt="" width={260} height={260} sx={{ width: '100%', height: '100%' }} />
          <Box component="img" src={sparkle} alt="" sx={{ position: 'absolute', top: 0, right: 8, width: 36 }} />
        </Box>

        <Stack spacing={2} sx={{ position: 'relative', maxWidth: { sm: '62%' }, alignItems: 'flex-start' }}>
          <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem' }}>Olá,</Typography>
          <Typography id="home-title" component="h1" variant="h1">
            O que você gostaria de dizer ao seu futuro?
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Escreva uma carta, escolha a data de abertura e guarde até lá.
          </Typography>
          <Button
            component={Link}
            to="/capsules/new"
            variant="contained"
            size="large"
            startIcon={<Plus size={20} strokeWidth={1.75} aria-hidden="true" />}
          >
            Criar cápsula
          </Button>
        </Stack>
      </Paper>

      {result.status === 'loading' && <Typography role="status">Carregando cápsulas…</Typography>}
      {result.status === 'error' && (
        <Alert severity="error" action={<Button onClick={retry}>Tentar novamente</Button>}>
          {result.message}
        </Alert>
      )}

      {result.status === 'ready' && (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.3fr) minmax(0, 1fr)' } }}>
          <Paper component="section" aria-labelledby="next-title" variant="outlined" sx={{ p: 3, borderRadius: '24px' }}>
            <Stack spacing={2}>
              <Typography id="next-title" component="h2" variant="h6">Próxima abertura</Typography>
              {nextCapsule
                ? <NextOpeningCard capsule={nextCapsule} now={now} />
                : <Typography sx={{ color: 'text.secondary' }}>Nenhuma cápsula com abertura futura.</Typography>}
            </Stack>
          </Paper>

          <Paper component="section" aria-labelledby="summary-title" variant="outlined" sx={{ p: 3, borderRadius: '24px' }}>
            <Stack spacing={2}>
              <Typography id="summary-title" component="h2" variant="h6">Minhas cápsulas</Typography>
              <Box component="dl" sx={{ m: 0, display: 'grid', gap: 1, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
                {stats.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(185, 167, 245, 0.18)', display: 'flex', flexDirection: 'column-reverse' }}
                  >
                    <Typography component="dt" variant="body2" sx={{ color: 'text.secondary' }}>{stat.label}</Typography>
                    <Typography component="dd" sx={{ m: 0, fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.1 }}>
                      {String(stat.value).padStart(2, '0')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Paper>
        </Box>
      )}

      {result.status === 'ready' && (
        <Stack component="section" aria-labelledby="recent-title" spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="recent-title" component="h2" variant="h6">Suas cápsulas</Typography>
            {recent.length > 0 && (
              <Button
                component={Link}
                to="/capsules"
                endIcon={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />}
              >
                Ver todas
              </Button>
            )}
          </Stack>
          {recent.length === 0 ? (
            <Typography sx={{ color: 'text.secondary' }}>
              Você ainda não guardou nenhuma cápsula.
            </Typography>
          ) : (
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
              }}
            >
              {recent.map((capsule) => (
                <li key={capsule.id}>
                  <CapsuleCard capsule={capsule} now={now} />
                </li>
              ))}
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  )
}