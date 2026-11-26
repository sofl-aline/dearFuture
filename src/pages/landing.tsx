import { Box, Button, Link as MuiLink, Paper, Stack, Typography, useTheme } from '@mui/material'
import { CalendarDays, Mail, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import capsuleHero from '../assets/illustrations/capsule-hero.webp'
import wavesLight from '../assets/decorations/background-waves-light.svg'
import wavesDark from '../assets/decorations/background-waves-dark.svg'
import sparkle from '../assets/decorations/sparkle.svg'
import BrandLogo from '../components/BrandLogo/BrandLogo'
import ThemeToggle from '../components/ThemeToggle/ThemeToggle'

const steps = [
  { icon: Pencil, title: '1. Escreva sua mensagem', text: 'Registre o que você quer lembrar.' },
  { icon: CalendarDays, title: '2. Escolha uma data', text: 'Decida quando abrir sua cápsula.' },
  { icon: Mail, title: '3. Reencontre suas memórias', text: 'Abra sua mensagem no momento certo.' },
]

export default function Landing() {
  const theme = useTheme()
  const light = theme.palette.mode === 'light'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: light
          ? 'linear-gradient(180deg, #F1EBFF 0%, #F8F4FC 70%)'
          : 'linear-gradient(180deg, #221B3E 0%, #17142D 70%)',
      }}
    >
      <Stack
        component="header"
        direction="row"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 5 },
          py: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ color: 'primary.main' }}>
          <BrandLogo size={40} />
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ThemeToggle />
          <Button component={Link} to="/login" sx={{ color: 'text.primary' }}>Entrar</Button>
          <Button component={Link} to="/register" variant="contained">Criar conta</Button>
        </Stack>
      </Stack>

      <Box component="main">
        <Box component="section" aria-labelledby="landing-title" sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            component="img"
            src={light ? wavesLight : wavesDark}
            alt=""
            sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', opacity: 0.8, pointerEvents: 'none' }}
          />
          <Box
            sx={{
              position: 'relative',
              maxWidth: 1200,
              mx: 'auto',
              px: { xs: 2, md: 5 },
              pt: { xs: 3, md: 6 },
              pb: { xs: 10, md: 14 },
              display: 'grid',
              gap: 4,
              alignItems: 'center',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' },
            }}
          >
            <Stack spacing={2.5} sx={{ alignItems: 'flex-start' }}>
              <Box
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: '999px',
                  bgcolor: 'rgba(185, 167, 245, 0.35)',
                  color: 'primary.main',
                  fontWeight: 700,
                }}
              >
                Uma mensagem para quem você vai ser
              </Box>
              <Typography id="landing-title" component="h1" variant="h1" sx={{ fontSize: { md: '3rem' } }}>
                O que você gostaria de dizer ao seu futuro?
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', maxWidth: 520 }}>
                Guarde sentimentos, sonhos e memórias em uma cápsula do tempo.
                Escolha uma data e reencontre suas palavras no futuro.
              </Typography>
              <Button component={Link} to="/register" variant="contained" size="large" sx={{ px: 5 }}>
                Criar minha cápsula
              </Button>
              <Typography sx={{ color: 'text.secondary' }}>
                Já tem uma conta?{' '}
                <MuiLink component={Link} to="/login" sx={{ fontWeight: 700 }}>Entrar</MuiLink>
              </Typography>
            </Stack>

            <Box aria-hidden="true" sx={{ position: 'relative', justifySelf: 'center', width: { xs: 220, md: 340 } }}>
              <Box component="img" src={capsuleHero} alt="" width={340} height={340} sx={{ width: '100%', height: 'auto' }} />
              <Box component="img" src={sparkle} alt="" sx={{ position: 'absolute', top: 0, right: 0, width: { xs: 32, md: 48 } }} />
              <Box component="img" src={sparkle} alt="" sx={{ position: 'absolute', left: { xs: -16, md: -40 }, top: '45%', width: { xs: 20, md: 28 } }} />
            </Box>
          </Box>
        </Box>

        <Box component="section" aria-labelledby="steps-title" sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 5 }, py: { xs: 5, md: 7 } }}>
          <Typography id="steps-title" component="h2" variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            Seu presente, guardado para o futuro
          </Typography>
          <Box
            component="ol"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' },
            }}
          >
            {steps.map(({ icon: Icon, title, text }) => (
              <Paper component="li" key={title} variant="outlined" sx={{ p: 3, borderRadius: '20px' }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', color: 'primary.main', pr: 2, borderRight: 1, borderColor: 'divider' }}>
                    <Icon size={40} strokeWidth={1.5} aria-hidden="true" />
                  </Box>
                  <Box>
                    <Typography component="h3" variant="subtitle1" sx={{ fontSize: '1.05rem' }}>{title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{text}</Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component="footer" sx={{ py: 4, px: 2 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box aria-hidden="true" sx={{ width: 60, height: '1px', bgcolor: '#B9A7F5' }} />
          <Typography sx={{ fontStyle: 'italic', color: 'text.secondary' }}>Guarde o hoje para o seu futuro.</Typography>
          <Box aria-hidden="true" sx={{ width: 60, height: '1px', bgcolor: '#B9A7F5' }} />
        </Stack>
      </Box>
    </Box>
  )
}