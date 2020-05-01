import React, { useState } from 'react'
import { Box, Stack, Button, Text, IconButton } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'

export const Debug = () => {
  const { store } = useStore()
  const [isVisible, setVisibility] = useState(false)

  return (
    <Stack spacing={2}>
      <Stack isInline spacing={2}>
        <Text>Debugger</Text>
        <IconButton
          size="sm"
          icon={isVisible ? 'view-off' : 'view'}
          aria-label={isVisible ? 'Hide debugger' : 'Show debugger'}
          onClick={() => setVisibility((val) => !val)}
        />
      </Stack>
      {isVisible && (
        <pre className="card">
          <code>{JSON.stringify(store, undefined, 2)}</code>
        </pre>
      )}
    </Stack>
  )
}
