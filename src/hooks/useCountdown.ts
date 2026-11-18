import { useEffect, useState } from 'react'

export default function useCountdown(opensAt: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const remaining = Math.max(0, Date.parse(opensAt) - now)
  const seconds = Math.ceil(remaining / 1000)
  return {
    available: remaining === 0,
    label: `${Math.floor(seconds / 86400)}d ${Math.floor(seconds / 3600) % 24}h ${Math.floor(seconds / 60) % 60}m ${seconds % 60}s`,
  }
}
