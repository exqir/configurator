import React, { useState, useEffect, Fragment } from 'react'
import { Stack, SimpleGrid, Button, IconButton, Text } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { config, Key } from '../lib/config'
import { ActionType } from '../reducers'
import { useAttribute } from '../hooks/useAttribute'
import { AttributesList } from './AttributesList'
import { SettingProps } from '../types'

export const ComponentSelectionSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { dispatch } = useStore()
  const [isOpen, setOpen] = useState(false)
  const { id, value, data } = useAttribute({ parentId, key })
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
        <Fragment>
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
          </SimpleGrid>
          {data.map((componentId) => (
            <AttributesList key={componentId} id={componentId} />
          ))}
        </Fragment>
      )}
    </Stack>
  )
}
