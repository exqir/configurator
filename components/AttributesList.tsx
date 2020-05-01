import React from 'react'
import { Stack, Box } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { config, Key } from '../lib/config'
import { AttributeSetting } from './AttributeSetting'

export const AttributesList = ({ id, ...rest }) => {
  const { store } = useStore()
  const { key } = store[id]
  const { attributes } = config[key]
  console.log('AttributesList', id, key)
  return (
    <Stack spacing={2} {...rest}>
      {(attributes as readonly Key[]).map((attribute, index) => {
        return (
          <Box
            key={attribute}
            paddingTop={1}
            borderColor="gray.100"
            borderTopWidth={index > 0 ? 2 : 0}
          >
            <AttributeSetting parentId={id} attribute={attribute} />
          </Box>
        )
      })}
    </Stack>
  )
}
