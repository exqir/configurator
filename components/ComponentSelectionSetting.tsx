import React, { useState, useEffect } from 'react'
import { Stack, SimpleGrid, Button, IconButton, Text } from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { config, Key } from '../lib/config'
import { ActionType } from '../reducers'
import { useId } from '../hooks/useId'
import { AttributesList } from './AttributesList'

type ComponentSelectionSettingProps = {
  parentId: string
  attribute: Key
}

export const ComponentSelectionSetting = ({
  parentId,
  attribute: key,
}: ComponentSelectionSettingProps) => {
  const { dispatch } = useData()
  const [isOpen, setOpen] = useState(false)
  const { id, value, data } = useId({ parentId, key })
  console.log(parentId, key, id)
  const { attributes } = config[key]

  useEffect(() => {
    if (id) {
      dispatch({
        type: ActionType.REPLACE_DATALINK_EVENT,
        payload: { parentId: id, key: value },
      })
    }
  }, [id, value])

  return (
    <Stack spacing={1}>
      <Stack isInline justify="space-between" align="center">
        <Text>{key}</Text>
        <IconButton
          size="sm"
          icon={isOpen ? 'check' : 'edit'}
          aria-label={isOpen ? 'Done editing component' : 'Edit component'}
          onClick={() => {
            setOpen((val) => !val)

            if (!id) {
              dispatch({
                type: ActionType.ADD_DATALINK_EVENT,
                payload: { parentId, key, value },
              })
            }
          }}
        />
      </Stack>
      {isOpen && (
        <SimpleGrid columns={2} spacing={4}>
          {(attributes as readonly Key[]).map((column) => (
            <Button
              key={column}
              onClick={() => {
                dispatch({
                  type: ActionType.UPDATE_VALUE_EVENT,
                  payload: { id, value: column },
                })
              }}
            >
              {column}
            </Button>
          ))}
          {data.map((componentId) => (
            <AttributesList key={componentId} id={componentId} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  )
}
