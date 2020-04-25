import React from 'react'
import { Stack, Box } from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { config, Key } from '../lib/config'
import { AttributeSetting } from './AttributeSetting'

export const AttributesList = ({ id, ...rest }) => {
  const { store } = useData()
  const { key } = store[id]
  const { attributes } = config[key]
  console.log('AttributesList', id, key)
  return (
    <Stack spacing={4} {...rest}>
      {(attributes as readonly Key[]).map((attribute) => {
        return (
          <Box key={attribute}>
            <AttributeSetting parentId={id} attribute={attribute} />
          </Box>
        )
      })}
    </Stack>
  )
}
