import { useData } from '../lib/DataContext'
import { config, Key } from '../lib/config'

export const useId = ({ parentId, key }: { parentId: string; key: Key }) => {
  const { store } = useData()
  const { data: links } = store[parentId]
  const id = links.find((dataId) => store[dataId].key === key)
  // @ts-ignore
  const { type, value, data = [] } = id ? store[id] : config[key]

  return { id, type, value, data }
}
