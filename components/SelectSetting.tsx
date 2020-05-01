import React from 'react'
import { Stack, FormLabel, Select } from '@chakra-ui/core'
import { useUpdateOrAdd } from '../hooks/useUpdateOrAdd'
import { useAttribute } from '../hooks/useAttribute'
import { config, Key } from '../lib/config'
import { SettingProps } from '../types'

export const SelectSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { value } = useAttribute({ parentId, key })
  const changeHandler = useUpdateOrAdd({ parentId, key })
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
