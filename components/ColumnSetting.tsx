import React, { useState } from 'react'
import { Box, Stack, Text, IconButton } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { AttributesList } from './AttributesList'
import { Label } from './Label'

export const ColumnSetting = ({ id, ...rest }) => {
  const { store } = useStore()
  const { key } = store[id]
  const [isEdit, setEdit] = useState(false)

  return (
    <Box borderWidth={1} rounded="lg" overflow="hidden" {...rest}>
      <Stack isInline justify="space-between" align="center" p={2} bg="gray.50">
        <Label type="Column">
          <Text>{key}</Text>
        </Label>
        <IconButton
          size="sm"
          icon={isEdit ? 'check' : 'edit'}
          aria-label={isEdit ? 'Done editing column' : 'Edit column'}
          onClick={() => setEdit((val) => !val)}
        />
      </Stack>
      {isEdit && (
        <Box p={2}>
          <AttributesList id={id} />
        </Box>
      )}
    </Box>
  )
}
