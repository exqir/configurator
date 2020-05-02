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

  // TODO: Find a better solution then this workaround.
  // Setting the ref to id will cause the first statemant to be true
  // for the first time the id is defined and therefore generate a
  // store node for the value and add it to the data array of the
  // column_type node. Maybe we need an action for adding nested nodes
  // in one action.
  const valueRef = useRef(id)
  useEffect(() => {
    if (id && valueRef.current !== value) {
      valueRef.current = value
      dispatch({
        type: ActionType.REPLACE_DATALINK_EVENT,
        payload: { parentId: id, key: value },
      })
    }
    if (!id) {
      dispatch({
        type: ActionType.ADD_DATALINK_EVENT,
        payload: { parentId, key, value },
      })
    }
  }, [id, value])

  return (
    <Stack spacing={2}>
      <SelectSetting parentId={parentId} attribute={key} />
      {data.map((componentId) => (
        <AttributesList key={componentId} id={componentId} />
      ))}
    </Stack>
  )
}
