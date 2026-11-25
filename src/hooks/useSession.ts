import { useSyncExternalStore } from 'react'
import { session } from '../services/api'
export default function useSession() {
  return useSyncExternalStore(session.subscribe, session.snapshot)
}
