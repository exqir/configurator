import React from 'react'
import { Stack, FormLabel, Checkbox } from '@chakra-ui/core'
import { useUpdateOrAdd } from '../hooks/useUpdateOrAdd'
import { useAttribute } from '../hooks/useAttribute'
import { SettingProps } from '../types'

export const CheckboxSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { value } = useAttribute({ parentId, key })
  const changeHandler = useUpdateOrAdd({ parentId, key })

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
