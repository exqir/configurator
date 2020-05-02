import { useStore } from '../context/StoreContext'
import { config, Key } from '../lib/config'

export const useAttribute = ({
  parentId,
  key,
}: {
  parentId: string
  key: Key
}) => {
  const { store } = useStore()
  const { data: links } = store[parentId]
  const id = links.find((dataId) => store[dataId].key === key)
  // @ts-ignore
  const { type, value, name, data = [] } = id ? store[id] : config[key]

  return { id, type, value, name, data }
}
