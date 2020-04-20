import { generate } from 'shortid'
import { Key, config } from '../lib/config'

export enum ActionType {
  ADD_DATALINK_EVENT,
  ADD_NESTED_DATALINK_EVENT,
  REMOVE_DATALINK_EVENT,
  UPDATE_VALUE_EVENT,
}

export enum DataType {
  ROOT = 'ROOT',
  MODULE = 'MODULE',
  GRID = 'GRID',
  COLUMN = 'COLUMN',
  COMPONENT_SELECTION = 'COMPONENT_SELECTIN',
  COMPONENT = 'COMPONENT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  CHECKBOX = 'CHECKBOX',
}

export type Action = {
  type: ActionType
  payload: {
    parentId?: string
    id?: string
    key?: Key
    key2?: Key
    value?: string | number | boolean
  }
}

export type ModuleStore = {
  [id: string]: {
    id: string
    key: Key
    type: DataType
    value?: string | boolean | number
    data: string[]
  }
}

export type Reducer = (prevState: ModuleStore, action: Action) => ModuleStore

export const generateId = (key: string) => `${key}-${generate()}`

export const reducer: Reducer = (prevState, { type, payload }) => {
  console.log(prevState)
  switch (type) {
    case ActionType.ADD_DATALINK_EVENT: {
      const { parentId, key, value } = payload
      const dataSet = prevState[parentId]
      const { attributes: _, ...initialValue } = config[key]
      const id = generateId(key)
      return {
        ...prevState,
        [parentId]: {
          ...dataSet,
          data: [...dataSet.data, id],
        },
        [id]: { ...initialValue, ...(value ? { value } : {}), id, data: [] },
      }
    }
    case ActionType.ADD_NESTED_DATALINK_EVENT: {
      console.log('Payload', payload)
      const { parentId, key, key2, value } = payload
      const dataSet = prevState[parentId]
      const { attributes: _, ...initialValue } = config[key]
      const { attributes: _2, ...initialValue2 } = config[key2]
      const id = generateId(key)
      const id2 = generateId(key2)
      return {
        ...prevState,
        [parentId]: {
          ...dataSet,
          data: [...dataSet.data, id],
        },
        [id]: { ...initialValue, id, data: [id2] },
        [id2]: {
          ...initialValue2,
          ...(value ? { value } : {}),
          id: id2,
          data: [],
        },
      }
    }
    case ActionType.REMOVE_DATALINK_EVENT: {
      const { parentId, id } = payload
      const { [id]: removed, ...newState } = prevState
      const { data, ...parent } = prevState[parentId]
      return {
        ...newState,
        [parentId]: {
          ...parent,
          data: data.filter((link) => link !== id),
        },
      }
    }
    case ActionType.UPDATE_VALUE_EVENT: {
      const { id, value } = payload
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          value,
        },
      }
    }
    default:
      return prevState
  }
}
