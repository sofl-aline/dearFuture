import { useId } from 'react'

type BrandSymbolProps = { size?: number }

export default function BrandSymbol({ size = 40 }: BrandSymbolProps) {
  const gradientId = useId()

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="50" x2="60" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#45A5FF" />
          <stop offset="1" stopColor="#7C63DB" />
        </linearGradient>
      </defs>
      <path
        d="M12 40C2 50 18 60 38 55C50 52 60 44 56 36"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 10L50 20V40L32 50L14 40V20L32 10Z M14 20L32 30L50 20 M32 30V50"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M52 2C52.7 6 54 7.3 58 8C54 8.7 52.7 10 52 14C51.3 10 50 8.7 46 8C50 7.3 51.3 6 52 2Z" fill="#7C63DB" />
      <path d="M41 30C41.4 32.4 42.2 33.2 44.5 33.5C42.2 33.8 41.4 34.6 41 37C40.6 34.6 39.8 33.8 37.5 33.5C39.8 33.2 40.6 32.4 41 30Z" fill="#7C63DB" />
    </svg>
  )
}