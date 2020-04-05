import React, { useState } from 'react'
import { Stack, Select, IconButton } from '@chakra-ui/core'

export const AddType = ({ types, onAdd }) => {
  const [selectedType, setType] = useState(types[0])
  return (
    <Stack isInline>
      <Select
        value={selectedType}
        onChange={event => setType(event.target.value)}
      >
        {types.map(type => (
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
