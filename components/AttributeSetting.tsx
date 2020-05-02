import React from 'react'
import { DataType } from '../reducers'
import { CheckboxSetting } from './CheckboxSetting'
import { GridSetting } from './GridSetting'
import { NumberSetting } from './NumberSetting'
import { SelectSetting } from './SelectSetting'
import { ComponentSelectionSetting } from './ComponentSelectionSetting'
import { ComponentLinkSetting } from './ComponentLinkSetting'
import { ComponentSetting } from './ComponentSetting'
import { ColumnSetting } from './ColumnSetting'
import { ColumnSelectionSetting } from './ColumnSelectionSetting'
import { useAttribute } from '../hooks/useAttribute'
import { SettingProps } from '../types'

const Settings = {
  [DataType.SELECT]: SelectSetting,
  [DataType.NUMBER]: NumberSetting,
  [DataType.CHECKBOX]: CheckboxSetting,
  [DataType.GRID]: GridSetting,
  [DataType.COLUMN]: ColumnSetting,
  [DataType.COLUMN_SELECTION]: ColumnSelectionSetting,
  [DataType.COLUMN_TYPE]: ComponentSetting,
  [DataType.COMPONENT_SELECTION]: ComponentSelectionSetting,
  [DataType.COMPONENT_LINK]: ComponentLinkSetting,
  [DataType.COMPONENT]: ComponentSetting,
}

export const AttributeSetting: React.FC<SettingProps> = ({
  parentId,
  attribute: key,
}) => {
  const { type } = useAttribute({ parentId, key })

  const Setting = Settings[type]

  return <Setting parentId={parentId} attribute={key} />
}
