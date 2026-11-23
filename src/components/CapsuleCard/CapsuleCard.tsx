import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Capsule } from '../../types/capsule'

type Props = { capsule: Capsule }

export default function CapsuleCard({ capsule }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography component="h3" variant="h6">{capsule.title}</Typography>
          <Typography>
            Abertura em {new Date(capsule.opensAt).toLocaleString('pt-BR')}
          </Typography>
          <Button component={Link} to={`/capsules/${capsule.id}`}>
            Ver cápsula
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
