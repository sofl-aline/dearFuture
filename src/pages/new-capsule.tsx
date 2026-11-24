import { useState } from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CapsuleForm from '../components/CapsuleForm/CapsuleForm'
import { createCapsule } from '../services/capsuleStorage'
import type { NewCapsule as NewCapsuleData } from '../types/capsule'

export default function NewCapsule() {
  const navigate = useNavigate()
  const [saveError, setSaveError] = useState('')

  function handleSubmit(values: NewCapsuleData) {
    setSaveError('') // limpa um erro antigo antes de tentar de novo

    try {
      // Grava no navegador e devolve a cápsula com o id
      const capsule = createCapsule(values)
      // Leva para a página de detalhe da cápsula criada
      navigate(`/capsules/${capsule.id}`)
    } catch {
      // Os campos continuam preenchidos: o formulário não é apagado
      setSaveError('Não foi possível salvar a cápsula. Tente novamente.')
    }
  }

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">Nova cápsula</Typography>
      {saveError && <Alert severity="error">{saveError}</Alert>}
      <CapsuleForm onSubmit={handleSubmit} />
    </Stack>
  )
}