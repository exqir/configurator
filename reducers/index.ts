import { generate } from 'shortid'

type ModuleType = 'cart-horizontal' | 'progress-stepper'
type ModuleStoreAction = {
  type: 'ADD_MODULE' | string
  payload: {
    type: ModuleType
    updateData: (...any) => void
  }
}
type ModuleStore = {
  [id: string]: {
    id: string
    type: ModuleType
    data: string
  }
}

export const CREATE_DATASET_EVENT = 'CREATE_DATASET'
export const ADD_DATALINK_EVENT = 'ADD_DATALINK'
export const REMOVE_DATALINK_EVENT = 'REMOVE_DATALINK'
export const UPDATE_VALUE_EVENT = 'UPDATE_VALUE'

export const generateId = (type: string) => `${type}-${generate()}`

export function reducer(prevState, { type, payload }) {
  switch (type) {
    case CREATE_DATASET_EVENT: {
      const id = `${payload.type}-${generate()}`
      return {
        ...prevState,
        [id]: {
          id,
          type: payload.type,
          data: [],
        },
      }
    }
    case ADD_DATALINK_EVENT: {
      const { parentId, id, value } = payload
      const dataSet = prevState[parentId]
      return {
        ...prevState,
        [parentId]: {
          ...dataSet,
          data: [...dataSet.data, id],
        },
        [id]: { ...value, id },
      }
    }
    case REMOVE_DATALINK_EVENT: {
      const { parentId, dataId } = payload
      const { [dataId]: removed, ...newState } = prevState
      const parent = prevState[parentId]
      return {
        ...newState,
        [parentId]: {
          ...parent,
          data: parent.data.filter(link => link !== dataId),
        },
      }
    }
    case UPDATE_VALUE_EVENT: {
      const { dataId, value } = payload
      return {
        ...prevState,
        [dataId]: {
          ...prevState[dataId],
          value,
        },
      }
    }
    default:
      return prevState
  }
}
