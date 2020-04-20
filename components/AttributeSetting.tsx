import React, { Fragment } from 'react'
import {
  Box,
  Stack,
  Heading,
  FormLabel,
  Switch,
  Select,
  Button,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Divider,
  RadioGroup,
  Radio,
  Text,
} from '@chakra-ui/core'
import { useData } from '../lib/DataContext'
import { useDispatch } from '../hooks/useDispatch'
import { config, Key } from '../lib/config'
import { DataType, ActionType } from '../reducers'
import { CheckboxSetting } from './CheckboxSetting'
import { AddType } from './AddType'
import { AttributesList } from './AttributesList'
import { GridSetting } from './GridSetting'
import { NumberSetting } from './NumberSetting'

export const AttributeSetting = ({ parentId, attribute: key }) => {
  const { store, dispatch } = useData()
  const { data: parentData } = store[parentId]

  const id = parentData.find((dataId) => store[dataId].key === key)
  const { type, value, data = [] } = id ? store[id] : config[key]
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
    if (data.length === 0) {
      dispatch({
        type: ActionType.ADD_NESTED_DATALINK_EVENT,
        payload: {
          parentId,
          key: key,
          key2: value as Key,
        },
      })
      return null
    }

    return (
      <SimpleGrid columns={1} spacing={2}>
        <RadioGroup
          onChange={(e) => {
            dispatch({
              type: ActionType.UPDATE_VALUE_EVENT,
              payload: { id, value: e.target.value },
            })
            dispatch({
              type: ActionType.REMOVE_DATALINK_EVENT,
              payload: { parentId: id, id: data[0] },
            })
          }}
          value={value as string}
        >
          {(attributes as readonly Key[]).map((component) => (
            <Radio value={component} key={component}>
              {component}
            </Radio>
          ))}
        </RadioGroup>
        {Array.isArray(data) &&
          data.map((valueId) => (
            <Fragment key={valueId}>
              <Heading as="h5" size="xs">
                {store[valueId].key}
              </Heading>
              <AttributesList id={valueId} />
            </Fragment>
          ))}
      </SimpleGrid>
    )
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
