import { generate } from 'shortid'
import { Key, config } from '../lib/config'

export enum ActionType {
  ADD_DATALINK_EVENT,
  REMOVE_DATALINK_EVENT,
  UPDATE_VALUE_EVENT,
}

type DataType =
  | 'root'
  | 'module'
  | 'grid'
  | 'column'
  | 'component-selection'
  | 'component'
  | 'number'
  | 'select'
  | 'checkbox'

export type Action = {
  type: ActionType
  payload: {
    parentId?: string
    id: string
    key?: Key
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

export const generateId = (type: string) => `${type}-${generate()}`

export const reducer: Reducer = (prevState, { type, payload }) => {
  switch (type) {
    case ActionType.ADD_DATALINK_EVENT: {
      const { parentId, id, key } = payload
      const dataSet = prevState[parentId]
      const { attributes: _, ...initialValue } = config[key]
      return {
        ...prevState,
        [parentId]: {
          ...dataSet,
          data: [...dataSet.data, id],
        },
        [id]: { ...initialValue, id, data: [] },
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
