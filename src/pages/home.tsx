import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Typography component="h1" variant="h4">Dear Future</Typography>
      <Typography>Escreva uma carta para o seu futuro.</Typography>
      <Button component={Link} to="/capsules/new" variant="contained">
        Nova cápsula
      </Button>
    </Stack>
  )
}
