import React from 'react'
import { useStore } from '../context/StoreContext'
import { walkStore } from '../lib/walkStore'

export const Config = () => {
  const { store } = useStore()

  return (
    <pre className="card">
      <code>{JSON.stringify(walkStore(store), undefined, 2)}</code>
    </pre>
  )
}
