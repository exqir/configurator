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

  const linkId = store[parentId].data.find(
    (linkId) => store[linkId].key === key,
  )

  return (value: string | boolean | number) =>
    linkId
      ? dispatch({
          type: ActionType.UPDATE_VALUE_EVENT,
          payload: { id: linkId, value },
        })
      : dispatch({
          type: ActionType.ADD_DATALINK_EVENT,
          payload: { parentId, key, value },
        })
}
