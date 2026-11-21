import { useState } from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import CapsuleCard from '../components/CapsuleCard/CapsuleCard'
import { listCapsules } from '../services/capsuleStorage'
import type { Capsule } from '../types/capsule'

type Result = { capsules: Capsule[]; error: string }

export default function Capsules() {
  const [result] = useState<Result>(() => {
    try {
      return { capsules: listCapsules(), error: '' }
    } catch {
      return { capsules: [], error: 'Não foi possível ler as cápsulas salvas.' }
    }
  })

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Minhas cápsulas</Typography>
      {result.error ? <Alert severity="error">{result.error}</Alert> : (
        <>
          {result.capsules.length === 0 && <Typography>Nenhuma cápsula encontrada.</Typography>}
          {result.capsules.map((capsule) => <CapsuleCard key={capsule.id} capsule={capsule} />)}
        </>
      )}
    </Stack>
  )
}
