import React, { useState, useEffect, Fragment } from 'react'
import { Stack, IconButton, Text, RadioGroup, Radio } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { config, Key } from '../lib/config'
import { ActionType } from '../reducers'
import { useAttribute } from '../hooks/useAttribute'
import { AttributesList } from './AttributesList'
import { SettingProps } from '../types'
import { Label } from './Label'

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
        <Label type="Component">
          <Text>{key}</Text>
        </Label>
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
          <RadioGroup
            defaultValue={value}
            isInline
            spacing={2}
            onChange={(event) => {
              dispatch({
                type: ActionType.UPDATE_VALUE_EVENT,
                payload: { id, value: event.target.value },
              })
            }}
          >
            {(attributes as readonly Key[]).map((column) => (
              <Radio key={column} value={column}>
                {column}
              </Radio>
            ))}
          </RadioGroup>
          {data.map((componentId) => (
            <AttributesList key={componentId} id={componentId} />
          ))}
        </Fragment>
      )}
    </Stack>
  )
}
