import React, { Fragment } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Stack,
} from '@chakra-ui/core'
import { DataType } from '../reducers'
import { CheckboxSetting } from './CheckboxSetting'
import { AttributesList } from './AttributesList'
import { GridSetting } from './GridSetting'
import { NumberSetting } from './NumberSetting'
import { SelectSetting } from './SelectSetting'
import { ComponentSelectionSetting } from './ComponentSelectionSetting'
import { ComponentLinkSetting } from './ComponentLinkSetting'
import { ComponentSetting } from './ComponentSetting'
import { ColumnSetting } from './ColumnSetting'
import { useId } from '../hooks/useId'

const Settings = {
  [DataType.SELECT]: SelectSetting,
  [DataType.NUMBER]: NumberSetting,
  [DataType.CHECKBOX]: CheckboxSetting,
  [DataType.GRID]: GridSetting,
  [DataType.COLUMN]: ColumnSetting,
  [DataType.COMPONENT_SELECTION]: ComponentSelectionSetting,
  [DataType.COMPONENT_LINK]: ComponentLinkSetting,
  [DataType.COMPONENT]: ComponentSetting,
}

export const AttributeSetting = ({ parentId, attribute: key }) => {
  const { type } = useId({ parentId, key })

  const Setting = Settings[type]

  return <Setting parentId={parentId} attribute={key} />
}
