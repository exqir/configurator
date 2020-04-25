import React from 'react'
import { useData } from '../lib/DataContext'
import { walkStore } from '../lib/walkStore'

export const Config = () => {
  const { store } = useData()

  return (
    <pre className="card">
      <code>{JSON.stringify(walkStore(store), undefined, 2)}</code>
    </pre>
  )
}
