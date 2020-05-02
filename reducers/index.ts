import { generate } from 'shortid'
import { Key, config } from '../lib/config'

export enum ActionType {
  ADD_DATALINK_EVENT,
  REMOVE_DATALINK_EVENT,
  UPDATE_VALUE_EVENT,
  REPLACE_DATALINK_EVENT,
}

export enum DataType {
  ROOT = 'ROOT',
  MODULE = 'MODULE',
  GRID = 'GRID',
  COLUMN = 'COLUMN',
  COLUMN_SELECTION = 'COLUMN_SELECTION',
  COLUMN_TYPE = 'COLUMN_TYPE',
  COMPONENT_SELECTION = 'COMPONENT_SELECTIN',
  COMPONENT_LINK = 'COMPONENT_LINK',
  COMPONENT = 'COMPONENT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  CHECKBOX = 'CHECKBOX',
}

type Value = string | number | boolean

export type Action =
  | {
      type: ActionType.ADD_DATALINK_EVENT
      payload: { parentId: string; key: Key; value?: Value }
    }
  | {
      type: ActionType.REMOVE_DATALINK_EVENT
      payload: { parentId: string; id: string }
    }
  | {
      type: ActionType.UPDATE_VALUE_EVENT
      payload: { id: string; value: Value }
    }
  | {
      type: ActionType.REPLACE_DATALINK_EVENT
      payload: { parentId: string; key: Key }
    }

export type ModuleStore = {
  [id: string]: {
    id: string
    key: Key
    type: DataType
    name?: string
    value?: Value
    data: string[]
  }
}

export type Reducer = (prevState: ModuleStore, action: Action) => ModuleStore

export const generateId = (key: string) => `${key}-${generate()}`

export const reducer: Reducer = (prevState, action) => {
  console.log(prevState)
  switch (action.type) {
    case ActionType.ADD_DATALINK_EVENT: {
      const { parentId, key, value } = action.payload
      const { data, ...parent } = prevState[parentId]
      const { attributes: _, ...initialValue } = config[key]
      const id = generateId(key)
      return {
        ...prevState,
        [parentId]: {
          ...parent,
          data: [...data, id],
        },
        [id]: {
          ...initialValue,
          ...(value !== undefined ? { value } : {}),
          id,
          data: [],
        },
      }
    }
    case ActionType.REMOVE_DATALINK_EVENT: {
      const { parentId, id } = action.payload
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
      const { id, value } = action.payload
      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          value,
        },
      }
    }
    case ActionType.REPLACE_DATALINK_EVENT: {
      const { parentId, key } = action.payload
      const { data, ...parent } = prevState[parentId]
      const { [data[0]]: removed, ...newState } = prevState
      const { attributes: _, ...initialValue } = config[key]
      const id = generateId(key)
      return {
        ...newState,
        [parentId]: {
          ...parent,
          data: [id],
        },
        [id]: { ...initialValue, id, data: [] },
      }
    }
    default:
      return prevState
  }
}
