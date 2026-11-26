import { useState } from 'react'
import { Alert, Box, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CapsuleForm from '../components/CapsuleForm/CapsuleForm'
import { createCapsule } from '../services/capsuleApi'
import type { NewCapsule as NewCapsuleData } from '../types/capsule'

export default function NewCapsule() {
  const navigate = useNavigate()
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(values: NewCapsuleData) {
    if (saving) return
    setSaving(true)
    setSaveError('')

    try {
      const capsule = await createCapsule(values)
      navigate(`/capsules/${capsule.id}`)
    } catch (error) {
      // Mantém os campos preenchidos para permitir uma nova tentativa.
      setSaveError(error instanceof Error ? error.message : 'Não foi possível salvar a cápsula.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 760 }}>
      <Box>
        <Typography component="h1" variant="h4">Nova cápsula</Typography>
        <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
          Escreva uma mensagem, registre memórias, sonhos ou planos para o seu eu do futuro.
        </Typography>
      </Box>
      {saveError && <Alert severity="error">{saveError}</Alert>}
      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: '24px' }}>
        <CapsuleForm onSubmit={handleSubmit} saving={saving} />
      </Paper>
    </Stack>
  )
}