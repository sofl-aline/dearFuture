import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { House } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandSymbol from '../components/BrandLogo/BrandSymbol'

export default function NotFound() {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, md: 6 }, borderRadius: '28px', maxWidth: 640 }}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ color: 'primary.main' }}>
          <BrandSymbol size={72} />
        </Box>
        <Typography component="h1" variant="h4">Página não encontrada</Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          O endereço que você abriu não existe ou foi digitado errado.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<House size={20} strokeWidth={1.75} aria-hidden="true" />}
        >
          Voltar ao início
        </Button>
      </Stack>
    </Paper>
  )
}