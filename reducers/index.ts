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
      const { data, ...parent } = prevState[parentId]
      const { attributes: _, ...initialValue } = config[key]
      const id = generateId(key)
      return {
        ...prevState,
        [parentId]: {
          ...parent,
          data: [...data, id],
        },
        [id]: { ...initialValue, ...(value ? { value } : {}), id, data: [] },
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
    case ActionType.REPLACE_DATALINK_EVENT: {
      const { parentId, key } = payload
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
