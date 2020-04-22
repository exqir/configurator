import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@chakra-ui/core'
import { DataType } from '../reducers'
import { CheckboxSetting } from './CheckboxSetting'
import { AttributesList } from './AttributesList'
import { GridSetting } from './GridSetting'
import { NumberSetting } from './NumberSetting'
import { SelectSetting } from './SelectSetting'
import { ComponentSelectionSetting } from './ComponentSelectionSetting'
import { useId } from '../hooks/useId'

export const AttributeSetting = ({ parentId, attribute: key }) => {
  const { id, type } = useId({ parentId, key })

  if (type === DataType.SELECT) {
    return <SelectSetting parentId={parentId} attribute={key} />
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
