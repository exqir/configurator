import { ModuleStore } from '../reducers'

export function walkStore(store: ModuleStore, id?: string) {
  let config: { [key: string]: any } = {}
  const current = store[id] || store.root

  const links = current.data.map((id) => walkStore(store, id))

  switch (current.type) {
    case 'grid':
      config[current.key] = links
      break
    case 'module':
    case 'component':
      config[current.key] = links.reduce((c, link) => ({ ...c, ...link }), {})
      break
    case 'column':
      config = links.reduce((c, link) => ({ ...c, ...link }), {
        type: current.key,
        ...config,
      })
      break
    case 'component-selection': {
      const { [current.value as string]: component } = links.reduce(
        (c, link) => ({ ...c, ...link }),
        config,
      )
      config[current.key] = { component: current.value, ...component }
      break
    }
    default: {
      if (current.value != null) {
        config[current.key] = current.value
      }
      config = links.reduce((c, link) => ({ ...c, ...link }), config)
    }
  }

  return config
}
