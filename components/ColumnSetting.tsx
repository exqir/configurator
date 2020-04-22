import React, { useState } from 'react'
import { Box, Stack, Button, Text, IconButton } from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { AttributesList } from './AttributesList'

export const ColumnSetting = ({ id, ...rest }) => {
  const { store } = useData()
  const { key } = store[id]
  const [isEdit, setEdit] = useState(false)

  return (
    <Box borderWidth="1px" rounded="lg" p={2} {...rest}>
      <Stack isInline justify="space-between" align="center">
        <Text>{key}</Text>
        <IconButton
          size="sm"
          icon={isEdit ? 'check' : 'edit'}
          aria-label={isEdit ? 'Done editing column' : 'Edit column'}
          onClick={() => setEdit((val) => !val)}
        />
      </Stack>
      {isEdit && (
        <Box p={1}>
          <AttributesList id={id} />
        </Box>
      )}
    </Box>
  )
}
