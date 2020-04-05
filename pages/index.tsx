import Head from 'next/head'
import React, { useReducer, Fragment, useState } from 'react'
import {
  ThemeProvider,
  CSSReset,
  Box,
  Stack,
  Heading,
  FormLabel,
  Switch,
  Select,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Divider,
} from '@chakra-ui/core'
import { DataProvider, useData } from '../components/DataContext'
import {
  ADD_MODULE_EVENT,
  CREATE_MODULE_DATA_EVENT,
  ADD_MODULE_DATA_EVENT,
  REMOVE_MODULE_DATA_EVENT,
  UPDATE_MODULE_DATA_EVENT,
  PUSH_MODULE_DATA_EVENT,
  moduleReducer,
  dataReducer,
} from '../reducers'

const modules = {
  'cart-horizontal': {
    hideHeadlines: { type: 'checkbox', default: true, values: [true, false] },
    cartColumns: {
      type: 'grid',
      default: [],
      values: ['quantity', 'cart_actions'],
    },
  },
  'progress-stepper': {
    activeStep: { default: 0 },
    steps: { default: ['details', 'done'] },
  },
}

const column = {
  width: { type: 'number', default: 1, values: [1, 12] },
  justify: {
    type: 'select',
    default: 'left',
    values: ['left', 'right', 'center'],
  },
}

const columns = {
  quantity: {
    ...column,
    quantity_selection_component: {
      type: 'select',
      default: 'quantity_stepper',
      values: ['quantity_stepper', 'select'],
    },
    quantity_selection: {
      type: 'component',
      component: 'quantity_selection_component',
      default: [],
    },
  },
  cart_actions: {
    ...column,
  },
}

const componentType = {
  type: 'select',
  default: 'primary',
  values: ['primary', 'secondary', 'success', 'danger'],
}
const components = {
  quantity_stepper: {
    type: componentType,
  },
  select: {
    type: componentType,
  },
}

const AddType = ({ types, onAdd }) => {
  const [selectedType, setType] = useState(types[0])
  return (
    <Stack isInline>
      <Select
        value={selectedType}
        onChange={event => setType(event.target.value)}
      >
        {types.map(type => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </Select>
      <IconButton
        icon="add"
        aria-label={`Add ${selectedType} module`}
        onClick={() => onAdd({ type: selectedType })}
      />
    </Stack>
  )
}

const AttributeSettings = ({ id, dataId, attribute, type, context }) => {
  console.log('Attribute Settings', { id, dataId, attribute, type, context })
  const { store, dispatch } = useData()
  const { type: attributeType, default: defaultValue, values } = context[type][
    attribute
  ]
  const value = store[dataId][attribute] ?? defaultValue

  if (attributeType === 'select') {
    return (
      <Select
        id={`${id}-values`}
        name={`${id}-values`}
        onChange={event =>
          dispatch({
            type: UPDATE_MODULE_DATA_EVENT,
            payload: {
              id: dataId,
              key: attribute,
              value: event.target.value,
            },
          })
        }
        value={value}
      >
        {values.map(v => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Select>
    )
  }
  if (attributeType === 'number') {
    return (
      <NumberInput
        value={value}
        min={values[0]}
        max={values[1]}
        onChange={newVal =>
          dispatch({
            type: UPDATE_MODULE_DATA_EVENT,
            payload: {
              id: dataId,
              key: attribute,
              value: newVal,
            },
          })
        }
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    )
  }
  if (attributeType === 'checkbox') {
    return (
      <Checkbox
        isChecked={value}
        onChange={() =>
          dispatch({
            type: UPDATE_MODULE_DATA_EVENT,
            payload: {
              id: dataId,
              key: attribute,
              value: !value,
            },
          })
        }
      >
        {attribute}
      </Checkbox>
    )
  }
  if (attributeType === 'grid') {
    return (
      <SimpleGrid columns={1} spacing={2}>
        <Stack>
          <FormLabel>Add column</FormLabel>
          <AddType
            types={values}
            onAdd={({ type }) =>
              dispatch({
                type: PUSH_MODULE_DATA_EVENT,
                payload: {
                  id: dataId,
                  key: attribute,
                  value: { type },
                },
              })
            }
          />
        </Stack>
        {Array.isArray(value) && value.length > 0 && (
          <Heading as="h4" size="xs">
            Columns:
          </Heading>
        )}
        <Accordion allowMultiple>
          {Array.isArray(value) &&
            value.map(valueId => (
              <AccordionItem key={valueId}>
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    <Heading as="h5" size="xs">
                      {store[valueId].type}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel>
                  <DataSettings
                    id={dataId}
                    dataId={valueId}
                    type={store[valueId].type}
                    context={columns}
                  />
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </SimpleGrid>
    )
  }
  if (attributeType === 'component') {
    if (!store[dataId][attribute]) {
      dispatch({
        type: PUSH_MODULE_DATA_EVENT,
        payload: {
          id: id,
          key: attribute,
          value: {
            type:
              store[id][context[type].component ?? components[type].component],
          },
        },
      })
    }
    return (
      <DataSettings
        id={dataId}
        dataId={store[dataId][attribute]}
        type={store[store[dataId][attribute]]}
        context={components}
      />
    )
  }
}

const DataSettings = ({ id, dataId, type, context }) => {
  console.log('DataSettings', { id, dataId, type, context })
  const { store, dispatch } = useData()
  return (
    <Stack spacing={4}>
      {Object.keys(context[type]).map(key => {
        const htmlId = `${id}-${key}`
        return (
          <Stack spacing={2} key={htmlId}>
            <Stack isInline>
              <Switch
                id={htmlId}
                name={key}
                onChange={e => {
                  ;(e as React.ChangeEvent<HTMLInputElement>).target.checked
                    ? dispatch({
                        type: ADD_MODULE_DATA_EVENT,
                        payload: {
                          id: dataId,
                          key,
                          value: context[type][key].default,
                        },
                      })
                    : dispatch({
                        type: REMOVE_MODULE_DATA_EVENT,
                        payload: { id: dataId, key },
                      })
                }}
              />
              <FormLabel htmlFor={htmlId}>{key}</FormLabel>
            </Stack>
            {store?.[dataId]?.[key] !== undefined &&
              context[type][key].values && (
                <AttributeSettings
                  id={id}
                  dataId={dataId}
                  type={type}
                  attribute={key}
                  context={context}
                />
              )}
            <Divider />
          </Stack>
        )
      })}
    </Stack>
  )
}

const Home = () => {
  const [activeModules, dispatch] = useReducer(moduleReducer, {})
  const [dataStore, updateData] = useReducer(dataReducer, {})

  return (
    <div className="container">
      <Head>
        <title>Configurator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <CSSReset />
        <DataProvider value={{ store: dataStore, dispatch: updateData }}>
          <main>
            <section>
              <div className="card">
                <SimpleGrid columns={1} spacing={5}>
                  <Stack>
                    <FormLabel>Add module</FormLabel>
                    <AddType
                      types={Object.keys(modules)}
                      onAdd={({ type }) =>
                        dispatch({
                          type: ADD_MODULE_EVENT,
                          payload: { type, updateData },
                        })
                      }
                    />
                  </Stack>
                  <Heading as="h2" size="md">
                    Modules:
                  </Heading>
                  <Accordion allowMultiple>
                    {Object.values(activeModules).map(({ id, data, type }) => (
                      <AccordionItem key={id}>
                        <AccordionHeader>
                          <Box flex="1" textAlign="left">
                            <Heading as="h3" size="sm">
                              {type}
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionHeader>
                        <AccordionPanel>
                          <DataSettings
                            context={modules}
                            {...{ id, dataId: data, type }}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </SimpleGrid>
              </div>
            </section>
            <section>
              <pre className="card">
                <code>{JSON.stringify(activeModules, undefined, 2)}</code>
                <code>{JSON.stringify(dataStore, undefined, 2)}</code>
              </pre>
            </section>
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

        section {
          width: 50%;
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

        .card {
          margin: 1rem;
          flex-basis: 45%;
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
      `}</style>
    </div>
  )
}

export default Home
