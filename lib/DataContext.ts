import { createContext, useContext } from 'react'
import { ModuleStore, Action } from '../reducers'

const DataContext = createContext<{
  store: ModuleStore
  dispatch: (action: Action) => void
}>({
  store: {},
  dispatch: () => {},
})

export const DataProvider = DataContext.Provider
export const useData = () => useContext(DataContext)
