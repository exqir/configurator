import React from 'react'
import { Stack, Badge } from '@chakra-ui/core'

export const Label: React.FC<{ type?: React.ReactNode }> = ({
  type,
  children,
}) => {
  return (
    <Stack isInline spacing={2} align="center" pl={2}>
      {children}
      {type && <Badge>{type}</Badge>}
    </Stack>
  )
}
