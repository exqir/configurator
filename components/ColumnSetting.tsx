import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { AttributesList } from './AttributesList'
import { Label } from './Label'

export const ColumnSetting = ({ id, ...rest }) => {
  const { store } = useStore()
  const { key, data } = store[id]

  const widthId = data.find((attributeId) => store[attributeId].key === 'width')
  const width = store[widthId]?.value

  return (
    <Box
      borderWidth={1}
      rounded="lg"
      overflow="hidden"
      gridColumn={`auto / span ${width ?? 1}`}
      {...rest}
    >
      <Stack isInline justify="space-between" align="center" p={2} bg="gray.50">
        <Label type="Column">
          <Text>{key}</Text>
        </Label>
      </Stack>
      {
        <Box p={2}>
          <AttributesList id={id} />
        </Box>
      }
    </Box>
  )
}
