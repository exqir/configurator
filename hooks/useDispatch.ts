import { Key } from '../lib/config'
import { useData } from '../lib/DataContext'
import { ActionType } from '../reducers'

export const useDispatch = ({
  parentId,
  key,
}: {
  parentId: string
  key: Key
}) => {
  const { store, dispatch } = useData()

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
