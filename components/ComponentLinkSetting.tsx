import React, { useState, useEffect } from 'react'
import { Stack, FormLabel, IconButton } from '@chakra-ui/core'
import { useAttribute } from '../hooks/useAttribute'
import { Key, config } from '../lib/config'
import { useStore } from '../context/StoreContext'
import { ActionType } from '../reducers'
import { AttributesList } from './AttributesList'
import { SettingProps } from '../types'

export const ComponentLinkSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { dispatch } = useStore()
  const {
    attributes: [linkedComponent],
  } = config[key]
  const { id } = useAttribute({ parentId, key })
  const [isEdit, setEdit] = useState(false)

  const htmlId = `${parentId}-${key}`
  return (
    <Stack spacing={1}>
      <Stack isInline justify="space-between" align="center">
        <FormLabel htmlFor={htmlId}>{key}</FormLabel>
        <IconButton
          size="sm"
          icon={isEdit ? 'check' : 'edit'}
          aria-label={isEdit ? 'Done editing component' : 'Edit component'}
          onClick={() => {
            setEdit((val) => !val)
            if (!id) {
              dispatch({
                type: ActionType.ADD_DATALINK_EVENT,
                payload: { parentId, key },
              })
            }
          }}
        />
      </Stack>
      {id && isEdit && (
        <ComponentSetting
          key={id}
          parentId={id}
          attribute={linkedComponent as Key}
        />
      )}
    </Stack>
  )
}

const ComponentSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { dispatch } = useStore()
  const { id } = useAttribute({ parentId, key })

  useEffect(() => {
    if (!id) {
      dispatch({
        type: ActionType.ADD_DATALINK_EVENT,
        payload: { parentId, key },
      })
    }
  }, [id])

  return id ? <AttributesList id={id} /> : null
}
