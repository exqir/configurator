import React, { useState } from 'react'
import {
  Stack,
  SimpleGrid,
  Button,
  IconButton,
  Text,
  Badge,
} from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { config, Key } from '../lib/config'
import { ActionType } from '../reducers'
import { useId } from '../hooks/useId'
import { ColumnSetting } from './ColumnSetting'

type GridSettingProps = {
  parentId: string
  attribute: Key
}

export const GridSetting = ({ parentId, attribute: key }: GridSettingProps) => {
  const { dispatch } = useData()
  const [isOpen, setOpen] = useState(false)
  const { id, data } = useId({ parentId, key })
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
