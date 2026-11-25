import { Chip } from '@mui/material'
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react'

type CapsuleStatusProps = { available: boolean }

export default function CapsuleStatus({ available }: CapsuleStatusProps) {
  return (
    <Chip
      size="small"
      variant="outlined"
      color={available ? 'success' : 'default'}
      icon={available
        ? <LockKeyholeOpen size={16} strokeWidth={1.75} aria-hidden="true" />
        : <LockKeyhole size={16} strokeWidth={1.75} aria-hidden="true" />}
      label={available ? 'Disponível para abertura' : 'Selada'}
    />
  )
}
