import React from 'react'
import {
  Stack,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core'
import { useUpdateOrAdd } from '../hooks/useUpdateOrAdd'
import { useAttribute } from '../hooks/useAttribute'
import { config } from '../lib/config'
import { SettingProps } from '../types'
import { Label } from './Label'

export const NumberSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { value } = useAttribute({ parentId, key })
  const changeHandler = useUpdateOrAdd({ parentId, key })
  const { attributes } = config[key]

  const htmlId = `${parentId}-${key}`
  return (
    <Stack isInline justify="space-between" align="center">
      <Label>
        <FormLabel htmlFor={htmlId}>{key}</FormLabel>
      </Label>
      <NumberInput
        maxWidth="50%"
        id={htmlId}
        value={value as number}
        min={attributes[0] as number}
        max={attributes[1] as number}
        onChange={changeHandler}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  )
}
