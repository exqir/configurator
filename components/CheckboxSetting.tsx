import React from 'react'
import { Stack, FormLabel, Checkbox } from '@chakra-ui/core'
import { useDispatch } from '../hooks/useDispatch'
import { useId } from '../hooks/useId'
import { Key } from '../lib/config'

type CheckboxSettingProps = {
  parentId: string
  attribute: Key
}

export const CheckboxSetting = ({
  parentId,
  attribute: key,
}: CheckboxSettingProps) => {
  const { value } = useId({ parentId, key })
  const changeHandler = useDispatch({ parentId, key })

  const htmlId = `${parentId}-${key}`
  return (
    <Stack isInline justify="space-between" align="center">
      <FormLabel htmlFor={htmlId}>{key}</FormLabel>
      <Checkbox
        id={htmlId}
        isChecked={value as boolean}
        onChange={(event) => changeHandler(event.target.checked)}
      />
    </Stack>
  )
}
