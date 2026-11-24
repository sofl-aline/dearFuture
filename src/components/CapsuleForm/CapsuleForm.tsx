import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import type { NewCapsule } from '../../types/capsule'

type CapsuleFormProps = {
  onSubmit: (values: NewCapsule) => void
}

export default function CapsuleForm({ onSubmit }: CapsuleFormProps) {
  // Um único estado com os três campos
  const [values, setValues] = useState<NewCapsule>({
    title: '',
    message: '',
    opensAt: '',
  })

  // Serve para todos os campos: usa o "name" do campo para saber qual atualizar
  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // impede a página de recarregar
    onSubmit(values)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          label="Título"
          name="title"
          value={values.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Mensagem"
          name="message"
          value={values.message}
          onChange={handleChange}
          multiline
          minRows={6}
          fullWidth
        />
        <TextField
          label="Abrir em"
          name="opensAt"
          type="datetime-local"
          value={values.opensAt}
          onChange={handleChange}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button type="submit" variant="contained">
          Selar cápsula
        </Button>
      </Stack>
    </Box>
  )
}