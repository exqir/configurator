import React, { useState } from 'react'
import {
  Stack,
  SimpleGrid,
  Button,
  IconButton,
  Text,
  Badge,
} from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { config, Key } from '../lib/config'
import { ActionType } from '../reducers'
import { useAttribute } from '../hooks/useAttribute'
import { ColumnSetting } from './ColumnSetting'
import { SettingProps } from '../types'

export const GridSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { dispatch } = useStore()
  const [isOpen, setOpen] = useState(false)
  const { id, data } = useAttribute({ parentId, key })
  const { attributes } = config[key]

  return (
    <Stack spacing={1}>
      <Stack isInline justify="space-between" align="center">
        <Text>{key}</Text>
        {data.length > 0 && <Badge>{data.length}</Badge>}
        <IconButton
          size="sm"
          icon={isOpen ? 'close' : 'add'}
          aria-label={isOpen ? 'Close column selection' : 'Add column'}
          onClick={() => {
            setOpen((val) => !val)

            if (!id) {
              dispatch({
                type: ActionType.ADD_DATALINK_EVENT,
                payload: { parentId, key },
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
                  type: ActionType.ADD_DATALINK_EVENT,
                  payload: { parentId: id, key: column },
                })
              }}
            >
              {column}
            </Button>
          ))}
        </SimpleGrid>
      )}
      <Stack spacing={1}>
        {data.map((columnId) => (
          <ColumnSetting key={columnId} id={columnId} />
        ))}
      </Stack>
    </Stack>
  )
}
