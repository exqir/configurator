import { Key } from '../lib/config'
import { useStore } from '../context/StoreContext'
import { ActionType } from '../reducers'

export const useUpdateOrAdd = ({
  parentId,
  key,
}: {
  parentId: string
  key: Key
}) => {
  const { store, dispatch } = useStore()

  const getLinkId = () =>
    store[parentId].data.find((linkId) => store[linkId].key === key)

  return (value: string | boolean | number) => {
    const linkId = getLinkId()

    return linkId
      ? dispatch({
          type: ActionType.UPDATE_VALUE_EVENT,
          payload: { id: linkId, value },
        })
      : dispatch({
          type: ActionType.ADD_DATALINK_EVENT,
          payload: { parentId, key, value },
        })
  }
}
