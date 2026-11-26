import { Box, Stack } from '@mui/material'
import BrandSymbol from './BrandSymbol'

type BrandLogoProps = {
  variant?: 'full' | 'symbol'
  size?: number
}

export default function BrandLogo({ variant = 'full', size = 44 }: BrandLogoProps) {
  if (variant === 'symbol') return <BrandSymbol size={size} />

  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
      <BrandSymbol size={size} />
      <Box
        component="span"
        aria-hidden="true"
        sx={{ fontWeight: 800, fontSize: size * 0.5, lineHeight: 1, letterSpacing: '-0.01em' }}
      >
        Dear
        <br />
        Future<Box component="span" sx={{ color: '#B9A7F5' }}>,</Box>
      </Box>
    </Stack>
  )
}
