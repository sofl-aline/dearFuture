import { useState } from 'react'
import type { FormEvent } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { login, registerAccount } from '../services/authApi'
import { setToken } from '../services/api'
import useSession from '../hooks/useSession'

export default function Auth({ register = false }: { register?: boolean }) {
  const location = useLocation()
  const navigate = useNavigate()
  const token = useSession()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (token) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return

    const data = new FormData(event.currentTarget)
    const credentials = {
      email: String(data.get('email')),
      password: String(data.get('password')),
    }
    setBusy(true)
    setError('')

    try {
      if (register) {
        await registerAccount({ ...credentials, name: String(data.get('name')) })
        navigate('/login', { replace: true, state: { registered: true } })
      } else {
        const accessToken = await login(credentials)
        setToken(accessToken)
        const from = location.state?.from
        const destination = typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
          ? from : '/'
        navigate(destination, { replace: true })
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível concluir a operação.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{ maxWidth: 440 }}>
      <Typography component="h1" variant="h4">{register ? 'Criar conta' : 'Entrar'}</Typography>
      <Typography>Por segurança, entre novamente ao recarregar a página.</Typography>
      {location.state?.from && !register && (
        <Alert severity="info">Entre para acessar suas cápsulas. Se sua sessão expirou, faça login novamente.</Alert>
      )}
      {location.state?.registered && !register && (
        <Alert severity="success">Conta criada. Entre com seu e-mail e senha.</Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {register && (
        <TextField name="name" label="Nome" required autoComplete="name" disabled={busy}
          slotProps={{ htmlInput: { maxLength: 120, pattern: '.*\\S.*', title: 'Informe seu nome.' } }} />
      )}
      <TextField name="email" label="E-mail" type="email" required autoComplete="email" disabled={busy}
        slotProps={{ htmlInput: { maxLength: 254 } }} />
      <TextField name="password" label="Senha" type="password" required disabled={busy}
        autoComplete={register ? 'new-password' : 'current-password'} helperText="De 12 a 128 caracteres."
        slotProps={{ htmlInput: { minLength: 12, maxLength: 128 } }} />
      <Button type="submit" variant="contained" disabled={busy}>
        {busy ? 'Aguarde…' : register ? 'Cadastrar' : 'Entrar'}
      </Button>
      <Button component={Link} to={register ? '/login' : '/register'} disabled={busy}>
        {register ? 'Já tenho uma conta' : 'Criar conta'}
      </Button>
    </Stack>
  )
}
