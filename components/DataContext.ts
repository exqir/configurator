import { createContext, useContext } from 'react'

const DataContext = createContext<{ store: {}; dispatch: (...args) => void }>({
  store: {},
  dispatch: () => {},
})

export const DataProvider = DataContext.Provider
export const useData = () => useContext(DataContext)
