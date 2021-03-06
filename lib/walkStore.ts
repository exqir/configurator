import { DataType, ModuleStore } from '../reducers'

export function walkStore(store: ModuleStore, id?: string) {
  let config: { [key: string]: any } = {}
  const current = store[id] || store.root
  const property = current.name ?? current.key

  const links = current.data.map((id) => walkStore(store, id))

  switch (current.type) {
    case DataType.GRID:
      config[property] = links
      break
    case DataType.MODULE:
    case DataType.COMPONENT:
      config[property] = links.reduce((c, link) => ({ ...c, ...link }), {})
      break
    case DataType.COLUMN:
      config = links.reduce((c, link) => ({ ...c, ...link }), {
        ...config,
      })
      break
    case DataType.COMPONENT_SELECTION: {
      const { [current.value as string]: component } = links.reduce(
        (c, link) => ({ ...c, ...link }),
        config,
      )
      config[current.key] = { component: current.value, ...component }
      break
    }
    case DataType.COMPONENT_LINK: {
      const componentId = current.data[0]
      if (componentId) {
        const { key } = store[componentId]
        config[property] = links.reduce(
          (c, { [key]: comp }) => ({ ...c, ...comp }),
          {},
        )
      } else {
        config[property] = {}
      }
      break
    }
    default: {
      if (current.value != null) {
        config[property] = current.value
      }
      config = links.reduce((c, link) => ({ ...c, ...link }), config)
    }
  }

  return config
}
