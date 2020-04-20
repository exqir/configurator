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
import { useDispatch } from '../hooks/useDispatch'
import { useId } from '../hooks/useId'
import { Key, config } from '../lib/config'

type NumberSettingProps = {
  parentId: string
  attribute: Key
}

export const NumberSetting = ({
  parentId,
  attribute: key,
}: NumberSettingProps) => {
  const { value } = useId({ parentId, key })
  const changeHandler = useDispatch({ parentId, key })
  const { attributes } = config[key]

  const htmlId = `${parentId}-${key}`
  return (
    <Stack isInline justify="space-between" align="center">
      <FormLabel htmlFor={htmlId}>{key}</FormLabel>
      <NumberInput
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
