import React, { useEffect, useRef } from 'react'
import { Stack } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { ActionType } from '../reducers'
import { useAttribute } from '../hooks/useAttribute'
import { AttributesList } from './AttributesList'
import { SettingProps } from '../types'
import { SelectSetting } from './SelectSetting'

export const ColumnSelectionSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { dispatch } = useStore()
  const { id, value, data } = useAttribute({ parentId, key })

  const valueRef = useRef(value)
  useEffect(() => {
    if (id && valueRef.current !== value) {
      valueRef.current = value
      dispatch({
        type: ActionType.REPLACE_DATALINK_EVENT,
        payload: { parentId: id, key: value },
      })
    }
  }, [id, value])

  return (
    <Stack spacing={2}>
      {/* TODO: Component link is only added after changing the type once */}
      <SelectSetting parentId={parentId} attribute={key} />
      {data.map((componentId) => (
        <AttributesList key={componentId} id={componentId} />
      ))}
    </Stack>
  )
}
