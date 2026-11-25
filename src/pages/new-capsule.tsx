import { useState } from 'react'
import { Alert, Stack, Typography } from '@mui/material'
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
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Nova cápsula</Typography>
      {saveError && <Alert severity="error">{saveError}</Alert>}
      <CapsuleForm onSubmit={handleSubmit} saving={saving} />
    </Stack>
  )
}
