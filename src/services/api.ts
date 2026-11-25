let accessToken: string | null = null
const listeners = new Set<() => void>()

// A sessão existe somente nesta aba e não é gravada no navegador.
export function setToken(token: string | null) {
  accessToken = token
  listeners.forEach((listener) => listener())
}

export const session = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  },
  snapshot: () => accessToken,
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const baseUrl = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '')

function errorMessage(status: number, path: string, authenticated: boolean) {
  switch (status) {
    case 400: return 'Confira os campos informados.'
    case 401: return authenticated
      ? 'Sua sessão expirou. Entre novamente.'
      : 'E-mail ou senha inválidos.'
    case 403: return 'Você não tem permissão para esta ação.'
    case 404: return 'Cápsula não encontrada.'
    case 409: return path.endsWith('/message')
      ? 'Esta cápsula ainda está selada. Aguarde o horário de abertura.'
      : 'Este e-mail já está cadastrado.'
    case 429: return 'Muitas tentativas. Aguarde um pouco antes de tentar novamente.'
    default: return 'Não foi possível concluir a operação. Tente novamente.'
  }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = accessToken
  const headers = new Headers(options.headers)
  if (options.body) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${baseUrl}${path}`, { ...options, headers })
  } catch (error) {
    if (options.signal?.aborted) throw error
    throw new Error('Não foi possível conectar à API. Verifique sua conexão e tente novamente.', { cause: error })
  }

  if (!response.ok) {
    // Uma resposta antiga não deve encerrar uma sessão mais recente.
    if (response.status === 401 && token && token === accessToken) setToken(null)
    throw new ApiError(response.status, errorMessage(response.status, path, Boolean(token)))
  }

  try {
    return await response.json() as T
  } catch {
    throw new Error('A API retornou uma resposta inválida. Tente novamente.')
  }
}
