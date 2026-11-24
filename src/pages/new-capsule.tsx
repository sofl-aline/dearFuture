import { Stack, Typography } from '@mui/material'
import CapsuleForm from '../components/CapsuleForm/CapsuleForm'
import type { NewCapsule } from '../types/capsule'

export default function NewCapsule() {
  // Provisório: no commit 3 isso vai salvar de verdade
  function handleSubmit(values: NewCapsule) {
    console.log('Cápsula enviada:', values)
  }

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Nova cápsula</Typography>
      <CapsuleForm onSubmit={handleSubmit} />
    </Stack>
  )
}
