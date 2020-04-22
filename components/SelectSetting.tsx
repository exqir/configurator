import React from 'react'
import { Stack, FormLabel, Select } from '@chakra-ui/core'
import { useDispatch } from '../hooks/useDispatch'
import { useId } from '../hooks/useId'
import { config, Key } from '../lib/config'

type SelectSettingProps = {
  parentId: string
  attribute: Key
}

export const SelectSetting = ({
  parentId,
  attribute: key,
}: SelectSettingProps) => {
  const { value } = useId({ parentId, key })
  const changeHandler = useDispatch({ parentId, key })
  const { attributes } = config[key]

  const htmlId = `${parentId}-${key}`
  return (
    <Stack isInline justify="space-between" align="center">
      <FormLabel htmlFor={htmlId}>{key}</FormLabel>
      <Select
        id={htmlId}
        name={`${htmlId}-values`}
        onChange={(event) => changeHandler(event.target.value)}
        value={value as string}
      >
        {(attributes as readonly Key[]).map((attribute) => (
          <option key={attribute} value={attribute}>
            {attribute}
          </option>
        ))}
      </Select>
    </Stack>
  )
}
