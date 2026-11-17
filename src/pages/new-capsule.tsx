import { Stack, Typography } from '@mui/material'
import CapsuleForm from '../components/CapsuleForm/CapsuleForm'

export default function NewCapsule() {
  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Nova cápsula</Typography>
      <CapsuleForm />
    </Stack>
  )
}
