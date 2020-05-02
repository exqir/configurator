import React from 'react'
import { Stack, FormLabel, Select } from '@chakra-ui/core'
import { useUpdateOrAdd } from '../hooks/useUpdateOrAdd'
import { useAttribute } from '../hooks/useAttribute'
import { config, Key } from '../lib/config'
import { SettingProps } from '../types'
import { Label } from './Label'

export const SelectSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { value, name } = useAttribute({ parentId, key })
  const changeHandler = useUpdateOrAdd({ parentId, key })
  const { attributes } = config[key]

  const htmlId = `${parentId}-${key}`
  return (
    <Stack isInline justify="space-between" align="center">
      <Label>
        <FormLabel htmlFor={htmlId}>{name ?? key}</FormLabel>
      </Label>
      <Select
        maxWidth="50%"
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
