import type { Capsule } from '../types/capsule'

const STORAGE_KEY = 'dear-future:capsules'

function isCapsule(value: unknown): value is Capsule {
  if (typeof value !== 'object' || value === null) return false
  return 'id' in value && typeof value.id === 'string'
    && 'title' in value && typeof value.title === 'string'
    && 'message' in value && typeof value.message === 'string'
    && 'createdAt' in value && typeof value.createdAt === 'string'
    && Number.isFinite(Date.parse(value.createdAt))
    && 'opensAt' in value && typeof value.opensAt === 'string'
    && Number.isFinite(Date.parse(value.opensAt))
}

export function listCapsules(): Capsule[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === null) return []
  const parsed: unknown = JSON.parse(saved)
  if (!Array.isArray(parsed) || !parsed.every(isCapsule)) {
    throw new Error('Os dados salvos estão inválidos.')
  }
  return parsed
}

export function getCapsule(id: string): Capsule | undefined {
  return listCapsules().find((capsule) => capsule.id === id)
}
