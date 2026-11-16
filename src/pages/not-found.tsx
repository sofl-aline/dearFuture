import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Typography component="h1" variant="h4">Página não encontrada</Typography>
      <Button component={Link} to="/">Voltar ao início</Button>
    </Stack>
  )
}
