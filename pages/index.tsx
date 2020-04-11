import Head from 'next/head'
import React, { useReducer, Fragment } from 'react'
import {
  ThemeProvider,
  CSSReset,
  Box,
  Stack,
  Heading,
  FormLabel,
  Switch,
  Select,
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
  RadioGroup,
  Radio,
} from '@chakra-ui/core'
import deepmerge from 'deepmerge'
import { DataProvider, useData } from '../components/DataContext'
import { AddType } from '../components/AddType'
import {
  ADD_DATALINK_EVENT,
  REMOVE_DATALINK_EVENT,
  UPDATE_VALUE_EVENT,
  reducer,
  generateId,
} from '../reducers'

const config = {
  modules: {
    key: 'modules',
    type: 'root',
    attributes: ['cart-horizontal', 'progress-stepper'],
  },
  'cart-horizontal': {
    key: 'cart-horizontal',
    type: 'module',
    attributes: ['hideHeadlines', 'cartColumns'],
  },
  'progress-stepper': {
    key: 'progress-stepper',
    type: 'module',
    attributes: ['activeStep', 'steps'],
  },
  activeStep: {
    key: 'activeStep',
    type: 'number',
    value: 0,
    attributes: [0, 3],
  },
  steps: {
    key: 'steps',
    type: 'select',
    value: 'first',
    attributes: ['first', 'second'],
  },
  hideHeadlines: {
    key: 'hideHeadlines',
    type: 'checkbox',
    value: true,
    attributes: [true, false],
  },
  cartColumns: {
    key: 'cartColumns',
    type: 'grid',
    attributes: ['quantity', 'cart_actions'],
  },
  quantity: {
    key: 'quantity',
    type: 'column',
    attributes: ['width', 'justify', 'qty_selection'],
  },
  cart_actions: {
    key: 'cart_actions',
    type: 'column',
    attributes: ['width', 'justify'],
  },
  width: {
    key: 'width',
    type: 'number',
    value: 1,
    attributes: [1, 12],
  },
  justify: {
    key: 'justify',
    type: 'select',
    value: 'left',
    attributes: ['left', 'right', 'center'],
  },
  qty_selection: {
    key: 'qty_selection',
    type: 'component-selection',
    value: 'quantity_stepper',
    attributes: ['quantity_stepper', 'select'],
  },
  quantity_stepper: {
    key: 'quantity_stepper',
    type: 'component',
    attributes: ['component_type', 'hasBorder'],
  },
  select: {
    key: 'select',
    type: 'component',
    attributes: ['component_type', 'select_variants'],
  },
  component_type: {
    key: 'component_type',
    type: 'select',
    value: 'primary',
    attributes: ['primary', 'secondary', 'success', 'danger'],
  },
  select_variants: {
    key: 'select_variants',
    type: 'select',
    value: 'outlined',
    attributes: ['outlined', 'underlined'],
  },
  quantity_stepper_variants: {
    key: 'quantity_stepper_variants',
    type: 'select',
    value: 'arrows',
    attributes: ['arrows', 'plus_minus'],
  },
  hasBorder: {
    key: 'hasBorder',
    type: 'checkbox',
    value: true,
    attributes: [true, false],
  },
}

function getValue({ type, key, value, data }, store) {
  if (value !== null && value !== undefined) return { [key]: value }
  if (type === 'grid') {
    return data.map((id) => ({ [key]: getValue(store[id], store) }))
  }
  if (type === 'column') {
    return data.map((id) => ({
      ...getValue(store[id], store),
      type: store[id].type,
    }))
  }
  return data
    .map((id) => ({ [key]: getValue(store[id], store) }))
    .reduce((acc, o) => deepmerge(acc, o, undefined), {})
}

const AttributeSettings = ({ id }) => {
  const { store, dispatch } = useData()
  const { type, value, key, attributes, data } = store[id]

  if (type === 'select') {
    return (
      <Select
        id={`${id}-values`}
        name={`${id}-values`}
        onChange={(event) =>
          dispatch({
            type: UPDATE_VALUE_EVENT,
            payload: {
              dataId: id,
              value: event.target.value,
            },
          })
        }
        value={value}
      >
        {attributes.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Select>
    )
  }
  if (type === 'number') {
    return (
      <NumberInput
        value={value}
        min={attributes[0]}
        max={attributes[1]}
        onChange={(newVal) =>
          dispatch({
            type: UPDATE_VALUE_EVENT,
            payload: {
              dataId: id,
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
  if (type === 'checkbox') {
    return (
      <Checkbox
        isChecked={value}
        onChange={() =>
          dispatch({
            type: UPDATE_VALUE_EVENT,
            payload: {
              dataId: id,
              value: !value,
            },
          })
        }
      >
        {key}
      </Checkbox>
    )
  }
  if (type === 'grid') {
    return (
      <SimpleGrid columns={1} spacing={2}>
        <Stack>
          <FormLabel>Add column</FormLabel>
          <AddType
            types={attributes}
            onAdd={({ type: columnType }) =>
              dispatch({
                type: ADD_DATALINK_EVENT,
                payload: {
                  parentId: id,
                  id: generateId(columnType),
                  value: { ...config[columnType], data: [] },
                },
              })
            }
          />
        </Stack>
        {Array.isArray(data) && data.length > 0 && (
          <Heading as="h4" size="xs">
            Columns:
          </Heading>
        )}
        <Accordion allowMultiple>
          {Array.isArray(data) &&
            data.map((valueId) => (
              <AccordionItem key={valueId}>
                <AccordionHeader>
                  <Box flex="1" textAlign="left">
                    <Heading as="h5" size="xs">
                      {store[valueId].key}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel>
                  <AttributesList parentId={valueId} />
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </SimpleGrid>
    )
  }
  if (type === 'component-selection') {
    if (data.length === 0) {
      dispatch({
        type: ADD_DATALINK_EVENT,
        payload: {
          parentId: id,
          id: generateId(value),
          value: { ...config[value], data: [] },
        },
      })
    }

    return (
      <SimpleGrid columns={1} spacing={2}>
        <RadioGroup
          onChange={(e) => {
            dispatch({
              type: UPDATE_VALUE_EVENT,
              payload: { dataId: id, value: e.target.value },
            })
            dispatch({
              type: REMOVE_DATALINK_EVENT,
              payload: { parentId: id, dataId: data[0] },
            })
          }}
          value={value}
        >
          {attributes.map((component) => (
            <Radio value={component} key={component}>
              {component}
            </Radio>
          ))}
        </RadioGroup>
        {Array.isArray(data) &&
          data.map((valueId) => (
            <Fragment key={valueId}>
              <Heading as="h5" size="xs">
                {store[valueId].key}
              </Heading>
              <AttributesList parentId={valueId} />
            </Fragment>
          ))}
      </SimpleGrid>
    )
  }
  if (type === 'component') {
    return (
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionHeader>{key}</AccordionHeader>
          <AccordionPanel>
            <AttributesList parentId={id} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  }
  // return store[id]
}

const AttributesList = ({ parentId }) => {
  const { store, dispatch } = useData()
  const { attributes } = store[parentId]
  return (
    <Stack spacing={4}>
      {attributes.map((attribute) => {
        const htmlId = `${parentId}-${attribute}`
        const id = store[parentId].data.find(
          (dataId) => store[dataId].key === attribute,
        )
        return (
          <Stack spacing={2} key={htmlId}>
            <Stack isInline>
              <Switch
                id={htmlId}
                name={attribute}
                onChange={(e) => {
                  if (
                    (e as React.ChangeEvent<HTMLInputElement>).target.checked
                  ) {
                    dispatch({
                      type: ADD_DATALINK_EVENT,
                      payload: {
                        parentId,
                        id: generateId(attribute),
                        value: {
                          ...config[attribute],
                          data: [],
                        },
                      },
                    })
                  } else {
                    dispatch({
                      type: REMOVE_DATALINK_EVENT,
                      payload: {
                        parentId,
                        dataId: id,
                      },
                    })
                  }
                }}
              />
              <FormLabel htmlFor={htmlId}>{attribute}</FormLabel>
            </Stack>
            {id && <AttributeSettings id={id} />}
            <Divider />
          </Stack>
        )
      })}
    </Stack>
  )
}

const Home = () => {
  const [store, dispatch] = useReducer(reducer, {
    root: { type: 'modules', key: 'modules', id: 'root', data: [] },
  })
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
            <section className="card">
              <SimpleGrid columns={1} spacing={4}>
                <Stack>
                  <FormLabel>Add module</FormLabel>
                  <AddType
                    types={config.modules.attributes}
                    onAdd={({ type }) =>
                      dispatch({
                        type: ADD_DATALINK_EVENT,
                        payload: {
                          parentId: 'root',
                          id: generateId(type),
                          value: { ...config[type], data: [] },
                        },
                      })
                    }
                  />
                </Stack>
                <Heading as="h2" size="md">
                  Modules:
                </Heading>
                <Accordion allowMultiple>
                  {store.root.data.map((dataId) => (
                    <AccordionItem key={dataId}>
                      <AccordionHeader>{store[dataId].key}</AccordionHeader>
                      <AccordionPanel>
                        <AttributesList parentId={dataId} />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </SimpleGrid>
            </section>
            <section>
              <pre className="card">
                <code>
                  {JSON.stringify(
                    getValue(store.root, store).modules,
                    undefined,
                    2,
                  )}
                </code>
                <code>{JSON.stringify(store, undefined, 2)}</code>
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
