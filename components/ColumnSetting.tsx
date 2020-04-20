import React, { useState } from 'react'
import { Box, Stack, Button, Text } from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { AttributesList } from './AttributesList'

export const ColumnSetting = ({ id, ...rest }) => {
  const { store } = useData()
  const { key } = store[id]
  const [isEdit, setEdit] = useState(false)

  return (
    <Box bg="gray.50" {...rest}>
      <Stack isInline justify="space-between" align="center">
        <Text>{key}</Text>
        <Button size="sm" onClick={() => setEdit((val) => !val)}>
          Edit
        </Button>
      </Stack>
      {isEdit && <AttributesList id={id} />}
    </Box>
  )
}
