import React, { useState } from 'react'
import { Stack, FormLabel, IconButton } from '@chakra-ui/core'
import { useId } from '../hooks/useId'
import { Key, config } from '../lib/config'
import { useData } from '../lib/DataContext'
import { ActionType } from '../reducers'
import { AttributesList } from './AttributesList'

type ComponentSettingProps = {
  parentId: string
  attribute: Key
}

export const ComponentSetting = ({
  parentId,
  attribute: key,
}: ComponentSettingProps) => {
  const { dispatch } = useData()
  const { id } = useId({ parentId, key })
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
      {id && isEdit && <AttributesList key={id} id={id} />}
    </Stack>
  )
}
