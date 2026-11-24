import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import type { NewCapsule } from '../../types/capsule'

type CapsuleFormProps = {
  onSubmit: (values: NewCapsule) => void
}

// Uma mensagem de erro opcional para cada campo
type FormErrors = Partial<Record<keyof NewCapsule, string>>

// Recebe os valores e devolve os erros encontrados (vazio = tudo certo)
function validate(values: NewCapsule): FormErrors {
  const errors: FormErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Informe um título.'
  }

  if (!values.message.trim()) {
    errors.message = 'Escreva a sua mensagem.'
  }

  const opensAt = Date.parse(values.opensAt)
  if (!values.opensAt) {
    errors.opensAt = 'Escolha a data e a hora de abertura.'
  } else if (!Number.isFinite(opensAt) || opensAt <= Date.now()) {
    errors.opensAt = 'Escolha uma data no futuro.'
  }

  return errors
}

export default function CapsuleForm({ onSubmit }: CapsuleFormProps) {
  const [values, setValues] = useState<NewCapsule>({
    title: '',
    message: '',
    opensAt: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Ao corrigir um campo, o erro dele some
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validate(values)
    setErrors(newErrors)

    // Se tiver algum erro, para aqui e não envia
    if (Object.keys(newErrors).length > 0) return

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
          error={Boolean(errors.title)}
          helperText={errors.title}
          required
          fullWidth
        />
        <TextField
          label="Mensagem"
          name="message"
          value={values.message}
          onChange={handleChange}
          error={Boolean(errors.message)}
          helperText={errors.message}
          required
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
          error={Boolean(errors.opensAt)}
          helperText={errors.opensAt}
          required
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