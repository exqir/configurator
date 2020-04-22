import React from 'react'
import {
  Select,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { useDispatch } from '../hooks/useDispatch'
import { config, Key } from '../lib/config'
import { DataType } from '../reducers'
import { CheckboxSetting } from './CheckboxSetting'
import { AttributesList } from './AttributesList'
import { GridSetting } from './GridSetting'
import { NumberSetting } from './NumberSetting'
import { ComponentSelectionSetting } from './ComponentSelectionSetting'

export const AttributeSetting = ({ parentId, attribute: key }) => {
  const { store } = useData()
  const { data: parentData } = store[parentId]

  const id = parentData.find((dataId) => store[dataId].key === key)
  const { type, value } = id ? store[id] : config[key]
  const { attributes } = config[key]

  const changeHandler = useDispatch({ parentId, key })

  if (type === DataType.SELECT) {
    return (
      <Select
        id={`${id}-values`}
        name={`${id}-values`}
        onChange={(event) => changeHandler(event.target.value)}
        value={value as string}
      >
        {(attributes as readonly Key[]).map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Select>
    )
  }
  if (type === DataType.NUMBER) {
    return <NumberSetting parentId={parentId} attribute={key} />
  }
  if (type === DataType.CHECKBOX) {
    return <CheckboxSetting parentId={parentId} attribute={key} />
  }
  if (type === DataType.GRID) {
    return <GridSetting parentId={parentId} attribute={key} />
  }
  if (type === DataType.COMPONENT_SELECTION) {
    return <ComponentSelectionSetting parentId={parentId} attribute={key} />
  }
  if (type === DataType.COMPONENT) {
    return (
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionHeader>{key}</AccordionHeader>
          <AccordionPanel>
            <AttributesList id={id} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  }
  // return store[id]
}
