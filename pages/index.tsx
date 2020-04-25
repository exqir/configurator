import Head from 'next/head'
import React, { useReducer, Fragment } from 'react'
import {
  ThemeProvider,
  CSSReset,
  Stack,
  Grid,
  Box,
  Heading,
  FormLabel,
  Button,
  ButtonGroup,
  Accordion,
  SimpleGrid,
} from '@chakra-ui/core'
import { DataProvider } from '../lib/DataContext'
import { AddType } from '../components/AddType'
import { config, Key } from '../lib/config'
import { ActionType, DataType, Reducer, reducer } from '../reducers'
import { AttributesList } from '../components/AttributesList'
import { Debug } from '../components/Debug'
import { Config } from '../components/Config'

const Home = () => {
  const saved_config =
    typeof window !== 'undefined' && window.localStorage.getItem('store_backup')
  const [store, dispatch] = useReducer<Reducer>(
    reducer,
    JSON.parse(saved_config) || {
      root: { type: DataType.ROOT, key: 'modules', id: 'root', data: [] },
    },
  )
  return (
    <div className="container">
      <Head>
        <title>Configurator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <CSSReset />
        <DataProvider value={{ store, dispatch }}>
          <main>
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="2rem 1fr"
              gap={4}
            >
              <Box gridArea="1 / 1 / 2 / 3">
                <ButtonGroup>
                  <Button
                    onClick={() =>
                      window.localStorage.setItem(
                        'store_backup',
                        JSON.stringify(store),
                      )
                    }
                  >
                    Save Config
                  </Button>
                  <Button
                    onClick={() =>
                      window.localStorage.removeItem('store_backup')
                    }
                  >
                    Reset config
                  </Button>
                </ButtonGroup>
              </Box>
              <Box gridArea="2 / 1 / 3 / 2">
                <section className="card">
                  <SimpleGrid columns={1} spacing={4}>
                    <Stack>
                      <FormLabel>Add module</FormLabel>
                      <AddType
                        types={config.modules.attributes as readonly Key[]}
                        onAdd={({ type }) =>
                          dispatch({
                            type: ActionType.ADD_DATALINK_EVENT,
                            payload: {
                              parentId: 'root',
                              key: type as Key,
                            },
                          })
                        }
                      />
                    </Stack>
                    <Heading as="h2" size="md">
                      Modules:
                    </Heading>
                    <Accordion>
                      {store.root.data.map((dataId) => (
                        <Fragment key={dataId}>
                          <Heading as="h5" size="sm">
                            {store[dataId].key}
                          </Heading>
                          <AttributesList id={dataId} />
                        </Fragment>
                      ))}
                    </Accordion>
                  </SimpleGrid>
                </section>
              </Box>
              <Box gridArea="2 / 2 / 3 / 3">
                <section>
                  <Config />
                  <Debug />
                </section>
              </Box>
            </Grid>
          </main>
        </DataProvider>
      </ThemeProvider>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          margin: 0;
        }

        code {
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>
    </div>
  )
}

export default Home
