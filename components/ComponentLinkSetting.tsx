import React, { useState, useEffect } from 'react'
import { Stack, FormLabel, IconButton } from '@chakra-ui/core'
import { useDispatch } from '../hooks/useDispatch'
import { useId } from '../hooks/useId'
import { Key, config } from '../lib/config'
import { useData } from '../lib/DataContext'
import { ActionType } from '../reducers'
import { AttributesList } from './AttributesList'

type ComponentLinkSettingProps = {
  parentId: string
  attribute: Key
}

export const ComponentLinkSetting = ({
  parentId,
  attribute: key,
}: ComponentLinkSettingProps) => {
  const { dispatch } = useData()
  const {
    attributes: [linkedComponent],
  } = config[key]
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

const ComponentSetting = ({ parentId, attribute: key }) => {
  const { dispatch } = useData()
  const { id } = useId({ parentId, key })

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
