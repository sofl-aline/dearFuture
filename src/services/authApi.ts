import { request } from './api'

export type Credentials = { email: string; password: string }
type TokenResponse = { accessToken: string; tokenType: string; expiresIn: number }

export function registerAccount(input: Credentials & { name: string }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ ...input, name: input.name.trim(), email: input.email.trim() }),
  })
}

export async function login(input: Credentials) {
  const response = await request<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ ...input, email: input.email.trim() }),
  })
  if (typeof response.accessToken !== 'string' || !response.accessToken) {
    throw new Error('A API não retornou uma sessão válida. Tente novamente.')
  }
  return response.accessToken
}
