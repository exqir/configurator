import { createContext, useContext } from 'react'
import { ModuleStore, Action } from '../reducers'

const StoreContext = createContext<{
  store: ModuleStore
  dispatch: (action: Action) => void
}>({
  store: {},
  dispatch: () => {},
})

export const StoreProvider = StoreContext.Provider
export const useStore = () => useContext(StoreContext)
