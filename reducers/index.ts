import { generate } from 'shortid'

export const ADD_MODULE_EVENT = 'ADD_MODULE'
export const CREATE_MODULE_DATA_EVENT = 'CREATE_MODULE_DATA'
export const ADD_MODULE_DATA_EVENT = 'ADD_MODULE_DATA'
export const REMOVE_MODULE_DATA_EVENT = 'REMOVE_MODULE_DATA'
export const UPDATE_MODULE_DATA_EVENT = 'UPDATE_MODULE_DATA'
export const PUSH_MODULE_DATA_EVENT = 'PUSH_MODULE_DATA'

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

export function moduleReducer(
  prevState: ModuleStore,
  { type, payload }: ModuleStoreAction,
): ModuleStore {
  switch (type) {
    case ADD_MODULE_EVENT: {
      const id = `${payload.type}-${generate()}`
      payload.updateData({
        type: CREATE_MODULE_DATA_EVENT,
        payload: { id: `${id}-data` },
      })
      return { ...prevState, [id]: { ...payload, id, data: `${id}-data` } }
    }
    default:
      return prevState
  }
}

export function dataReducer(prevState, { type, payload }) {
  console.log('dataReducer', prevState, type, payload)
  switch (type) {
    case CREATE_MODULE_DATA_EVENT: {
      const { id: _id, type } = payload
      const id = _id ?? `${type}-${generate()}`
      return { ...prevState, [id]: { id } }
    }
    case ADD_MODULE_DATA_EVENT: {
      const { id, key, value } = payload
      const data = prevState[id]
      return {
        ...prevState,
        [id]: {
          ...data,
          [key]: value,
        },
      }
    }
    case REMOVE_MODULE_DATA_EVENT: {
      const { id, key } = payload
      const { [key]: removed, ...data } = prevState[id]
      return {
        ...prevState,
        [id]: data,
      }
    }
    case UPDATE_MODULE_DATA_EVENT: {
      const { id, key, value } = payload
      const data = prevState[id]
      return {
        ...prevState,
        [id]: {
          ...data,
          [key]: value,
        },
      }
    }
    case PUSH_MODULE_DATA_EVENT: {
      const { id, key, value } = payload
      const data = prevState[id]
      const dataId = `${key}-${generate()}`
      return {
        ...prevState,
        [id]: {
          ...data,
          [key]: [...data[key], dataId],
        },
        [dataId]: value,
      }
    }
    default:
      return prevState
  }
}
