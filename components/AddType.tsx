import React, { useState } from 'react'
import { Stack, Select, IconButton } from '@chakra-ui/core'

interface AddTypeProps<T> {
  types: readonly T[]
  onAdd: ({ type: T }) => void
}

export function AddType<T extends string>({ types, onAdd }: AddTypeProps<T>) {
  const [selectedType, setType] = useState(types[0])
  return (
    <Stack isInline>
      <Select
        value={selectedType}
        onChange={(event) => setType(event.target.value as T)}
      >
        {types.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </Select>
      <IconButton
        icon="add"
        aria-label={`Add ${selectedType} module`}
        onClick={() => onAdd({ type: selectedType })}
      />
    </Stack>
  )
}
