import React, { useState, Fragment } from 'react'
import {
  Stack,
  Button,
  IconButton,
  Text,
  Badge,
  Grid,
  Icon,
} from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { config, Key } from '../lib/config'
import { ActionType } from '../reducers'
import { useAttribute } from '../hooks/useAttribute'
import { ColumnSetting } from './ColumnSetting'
import { SettingProps } from '../types'
import { Label } from './Label'

export const GridSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { dispatch } = useStore()
  const [isOpen, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const { id, data } = useAttribute({ parentId, key })
  const { attributes } = config[key]

  return (
    <Stack spacing={1}>
      <Stack isInline justify="space-between" align="center">
        <Label type="Grid">
          <Text>{key}</Text>
          {data.length > 0 && <Badge>{data.length}</Badge>}
        </Label>
        <IconButton
          size="sm"
          icon={isOpen ? 'check' : 'edit'}
          aria-label={isOpen ? 'Done editing grid' : 'Edit grid'}
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
        <Stack spacing={1}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}>
            {data.map((columnId) => (
              <Column
                key={columnId}
                id={columnId}
                isActive={active === columnId}
                onClick={() => {
                  setActive(active === columnId ? null : columnId)
                }}
              />
            ))}
            <IconButton
              gridColumn="auto / span 1"
              size="sm"
              icon="add"
              aria-label="Add column"
              variant="outline"
              onClick={() => {
                dispatch({
                  type: ActionType.ADD_DATALINK_EVENT,
                  payload: { parentId: id, key: attributes[0] as Key },
                })
              }}
            />
          </Grid>
          {active && <ColumnSetting key={active} id={active} />}
        </Stack>
      )}
    </Stack>
  )
}

const Column = ({ id, isActive, onClick, ...rest }) => {
  const { store } = useStore()
  const { data } = store[id]

  const widthId = data.find((attributeId) => store[attributeId].key === 'width')
  const width = store[widthId]?.value
  const typeId = data.find(
    (attributeId) => store[attributeId].key === 'column_type',
  )
  const type = store[typeId]?.value
  return (
    <Button
      size="sm"
      variant={isActive ? 'solid' : 'outline'}
      onClick={onClick}
      gridColumn={`auto / span ${width ?? 1}`}
      {...rest}
    >
      <Icon name="edit" mr={1} />
      <Text isTruncated>{type}</Text>
    </Button>
  )
}
