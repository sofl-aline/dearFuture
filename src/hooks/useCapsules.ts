import { useEffect, useState } from 'react'
import { listCapsules } from '../services/capsuleApi'
import type { Capsule } from '../types/capsule'

type Result =
  | { status: 'loading' }
  | { status: 'ready'; capsules: Capsule[] }
  | { status: 'error'; message: string }

export default function useCapsules() {
  const [result, setResult] = useState<Result>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    listCapsules(controller.signal)
      .then((capsules) => {
        if (!controller.signal.aborted) setResult({ status: 'ready', capsules })
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setResult({ status: 'error', message: error.message })
      })
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setResult({ status: 'loading' })
    setAttempt((current) => current + 1)
  }

  return { result, retry }
}
