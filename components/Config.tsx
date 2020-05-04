import React, { Fragment } from 'react'
import { useClipboard, Button } from '@chakra-ui/core'
import { useStore } from '../context/StoreContext'
import { walkStore } from '../lib/walkStore'

export const Config = () => {
  const { store } = useStore()
  const config = JSON.stringify(walkStore(store), undefined, 2)
  const { onCopy, hasCopied } = useClipboard(config)

  return (
    <pre className="card">
      <code>{config}</code>
      <span className="bottom-right">
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </span>
      <style jsx>{`
        .bottom-right {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
        }
      `}</style>
    </pre>
  )
}
