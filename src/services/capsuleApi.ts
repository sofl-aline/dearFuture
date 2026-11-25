import type { Capsule, NewCapsule } from '../types/capsule'
import { request } from './api'

export function listCapsules(signal?: AbortSignal) {
  return request<Capsule[]>('/capsules', { signal })
}

export function getCapsule(id: string, signal?: AbortSignal) {
  return request<Capsule>(`/capsules/${encodeURIComponent(id)}`, { signal })
}

export function readMessage(id: string, signal?: AbortSignal) {
  return request<{ id: string; message: string }>(`/capsules/${encodeURIComponent(id)}/message`, { signal })
}

export function createCapsule(input: NewCapsule) {
  return request<Capsule>('/capsules', {
    method: 'POST',
    body: JSON.stringify({
      title: input.title.trim(),
      message: input.message.trim(),
      opensAt: new Date(input.opensAt).toISOString(),
    }),
  })
}
