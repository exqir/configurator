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
  Button,
  ButtonGroup,
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
  Text,
} from '@chakra-ui/core'
import { DataProvider, useData } from '../lib/DataContext'
import { AddType } from '../components/AddType'
import { config, Key } from '../lib/config'
import { walkStore } from '../lib/walkStore'
import { useDispatch } from '../hooks/useDispatch'
import { ActionType, DataType, Reducer, reducer } from '../reducers'
import { AttributesList } from '../components/AttributesList'

// const AttributeSettings = ({ id }) => {
//   const { store, dispatch } = useData()
//   const { type, value, key, data } = store[id]
//   const { attributes } = config[key]

//   if (type === 'select') {
//     return (
//       <Select
//         id={`${id}-values`}
//         name={`${id}-values`}
//         onChange={(event) =>
//           dispatch({
//             type: ActionType.UPDATE_VALUE_EVENT,
//             payload: {
//               id,
//               value: event.target.value,
//             },
//           })
//         }
//         value={value as string}
//       >
//         {(attributes as readonly Key[]).map((v) => (
//           <option key={v} value={v}>
//             {v}
//           </option>
//         ))}
//       </Select>
//     )
//   }
//   if (type === 'number') {
//     return (
//       <NumberInput
//         value={value as number}
//         min={attributes[0] as number}
//         max={attributes[1] as number}
//         onChange={(newVal) =>
//           dispatch({
//             type: ActionType.UPDATE_VALUE_EVENT,
//             payload: {
//               id,
//               value: newVal,
//             },
//           })
//         }
//       >
//         <NumberInputField />
//         <NumberInputStepper>
//           <NumberIncrementStepper />
//           <NumberDecrementStepper />
//         </NumberInputStepper>
//       </NumberInput>
//     )
//   }
//   if (type === 'checkbox') {
//     return (
//       <Checkbox
//         isChecked={value as boolean}
//         onChange={() =>
//           dispatch({
//             type: ActionType.UPDATE_VALUE_EVENT,
//             payload: {
//               id,
//               value: !value,
//             },
//           })
//         }
//       >
//         {key}
//       </Checkbox>
//     )
//   }
//   if (type === 'grid') {
//     return (
//       <SimpleGrid columns={1} spacing={2}>
//         <Stack>
//           <FormLabel>Add column</FormLabel>
//           <AddType
//             types={attributes as readonly Key[]}
//             onAdd={({ type: columnType }) =>
//               dispatch({
//                 type: ActionType.ADD_DATALINK_EVENT,
//                 payload: {
//                   parentId: id,
//                   key: columnType as Key,
//                 },
//               })
//             }
//           />
//         </Stack>
//         {Array.isArray(data) && data.length > 0 && (
//           <Heading as="h4" size="xs">
//             Columns:
//           </Heading>
//         )}
//         <Accordion allowMultiple>
//           {Array.isArray(data) &&
//             data.map((valueId) => (
//               <AccordionItem key={valueId}>
//                 <AccordionHeader>
//                   <Box flex="1" textAlign="left">
//                     <Heading as="h5" size="xs">
//                       {store[valueId].key}
//                     </Heading>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionHeader>
//                 <AccordionPanel>
//                   <AttributesList parentId={valueId} />
//                 </AccordionPanel>
//               </AccordionItem>
//             ))}
//         </Accordion>
//       </SimpleGrid>
//     )
//   }
//   if (type === 'component-selection') {
//     if (data.length === 0) {
//       dispatch({
//         type: ActionType.ADD_DATALINK_EVENT,
//         payload: {
//           parentId: id,
//           key: value as Key,
//         },
//       })
//     }

//     return (
//       <SimpleGrid columns={1} spacing={2}>
//         <RadioGroup
//           onChange={(e) => {
//             dispatch({
//               type: ActionType.UPDATE_VALUE_EVENT,
//               payload: { id, value: e.target.value },
//             })
//             dispatch({
//               type: ActionType.REMOVE_DATALINK_EVENT,
//               payload: { parentId: id, id: data[0] },
//             })
//           }}
//           value={value as string}
//         >
//           {(attributes as readonly Key[]).map((component) => (
//             <Radio value={component} key={component}>
//               {component}
//             </Radio>
//           ))}
//         </RadioGroup>
//         {Array.isArray(data) &&
//           data.map((valueId) => (
//             <Fragment key={valueId}>
//               <Heading as="h5" size="xs">
//                 {store[valueId].key}
//               </Heading>
//               <AttributesList parentId={valueId} />
//             </Fragment>
//           ))}
//       </SimpleGrid>
//     )
//   }
//   if (type === 'component') {
//     return (
//       <Accordion allowMultiple>
//         <AccordionItem>
//           <AccordionHeader>{key}</AccordionHeader>
//           <AccordionPanel>
//             <AttributesList parentId={id} />
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//     )
//   }
//   // return store[id]
// }

// const AttributeSettings = ({ parentId, attribute: key }) => {
//   const { store, dispatch } = useData()
//   const { data: parentData } = store[parentId]

//   const id = parentData.find((dataId) => store[dataId].key === key)
//   const { type, value, data = [] } = id ? store[id] : config[key]
//   const { attributes } = config[key]

//   const changeHandler = useDispatch({ parentId, key })

//   if (type === DataType.SELECT) {
//     return (
//       <Select
//         id={`${id}-values`}
//         name={`${id}-values`}
//         onChange={(event) => changeHandler(event.target.value)}
//         value={value as string}
//       >
//         {(attributes as readonly Key[]).map((v) => (
//           <option key={v} value={v}>
//             {v}
//           </option>
//         ))}
//       </Select>
//     )
//   }
//   if (type === DataType.NUMBER) {
//     return (
//       <NumberInput
//         value={value as number}
//         min={attributes[0] as number}
//         max={attributes[1] as number}
//         onChange={(newVal) => changeHandler(newVal)}
//       >
//         <NumberInputField />
//         <NumberInputStepper>
//           <NumberIncrementStepper />
//           <NumberDecrementStepper />
//         </NumberInputStepper>
//       </NumberInput>
//     )
//   }
//   if (type === DataType.CHECKBOX) {
//     return (
//       <Checkbox
//         isChecked={value as boolean}
//         onChange={() => changeHandler(!value)}
//       >
//         {key}
//       </Checkbox>
//     )
//   }
//   if (type === DataType.GRID) {
//     return (
//       <SimpleGrid columns={1} spacing={2}>
//         <Stack>
//           <FormLabel>Add column</FormLabel>
//           <AddType
//             types={attributes as readonly Key[]}
//             onAdd={({ type: columnType }) =>
//               dispatch({
//                 type: ActionType.ADD_NESTED_DATALINK_EVENT,
//                 payload: {
//                   parentId,
//                   key,
//                   key2: columnType as Key,
//                 },
//               })
//             }
//           />
//         </Stack>
//         {Array.isArray(data) && data.length > 0 && (
//           <Heading as="h4" size="xs">
//             Columns:
//           </Heading>
//         )}
//         <Accordion allowMultiple>
//           {Array.isArray(data) &&
//             data.map((valueId) => (
//               <AccordionItem key={valueId}>
//                 <AccordionHeader>
//                   <Box flex="1" textAlign="left">
//                     <Heading as="h5" size="xs">
//                       {store[valueId].key}
//                     </Heading>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionHeader>
//                 <AccordionPanel>
//                   <AttributesList parentId={valueId} />
//                 </AccordionPanel>
//               </AccordionItem>
//             ))}
//         </Accordion>
//       </SimpleGrid>
//     )
//   }
//   if (type === DataType.COMPONENT_SELECTION) {
//     if (data.length === 0) {
//       dispatch({
//         type: ActionType.ADD_NESTED_DATALINK_EVENT,
//         payload: {
//           parentId,
//           key: key,
//           key2: value as Key,
//         },
//       })
//       return null
//     }

//     return (
//       <SimpleGrid columns={1} spacing={2}>
//         <RadioGroup
//           onChange={(e) => {
//             dispatch({
//               type: ActionType.UPDATE_VALUE_EVENT,
//               payload: { id, value: e.target.value },
//             })
//             dispatch({
//               type: ActionType.REMOVE_DATALINK_EVENT,
//               payload: { parentId: id, id: data[0] },
//             })
//           }}
//           value={value as string}
//         >
//           {(attributes as readonly Key[]).map((component) => (
//             <Radio value={component} key={component}>
//               {component}
//             </Radio>
//           ))}
//         </RadioGroup>
//         {Array.isArray(data) &&
//           data.map((valueId) => (
//             <Fragment key={valueId}>
//               <Heading as="h5" size="xs">
//                 {store[valueId].key}
//               </Heading>
//               <AttributesList parentId={valueId} />
//             </Fragment>
//           ))}
//       </SimpleGrid>
//     )
//   }
//   if (type === DataType.COMPONENT) {
//     return (
//       <Accordion allowMultiple>
//         <AccordionItem>
//           <AccordionHeader>{key}</AccordionHeader>
//           <AccordionPanel>
//             <AttributesList parentId={id} />
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//     )
//   }
//   // return store[id]
// }

// const AttributesList = ({ parentId }) => {
//   const { store, dispatch } = useData()
//   const { key } = store[parentId]
//   const { attributes } = config[key]
//   return (
//     <Stack spacing={4}>
//       {(attributes as readonly Key[]).map((attribute) => {
//         const htmlId = `${parentId}-${attribute}`
//         // const id = store[parentId].data.find(
//         //   (dataId) => store[dataId].key === attribute,
//         // )
//         return (
//           <Stack spacing={2} key={htmlId}>
//             <Stack isInline justify="space-between" align="center">
//               <Text>{attribute}</Text>
//               <AttributeSettings parentId={parentId} attribute={attribute} />
//               {/* <Switch
//                 id={htmlId}
//                 name={attribute}
//                 onChange={(e) => {
//                   if (
//                     (e as React.ChangeEvent<HTMLInputElement>).target.checked
//                   ) {
//                     dispatch({
//                       type: ActionType.ADD_DATALINK_EVENT,
//                       payload: {
//                         parentId,
//                         key: attribute,
//                       },
//                     })
//                   } else {
//                     dispatch({
//                       type: ActionType.REMOVE_DATALINK_EVENT,
//                       payload: {
//                         parentId,
//                         id,
//                       },
//                     })
//                   }
//                 }}
//               />
//               <FormLabel htmlFor={htmlId}>{attribute}</FormLabel> */}
//             </Stack>
//             {/* {id && <AttributeSettings id={id} />} */}
//             <Divider />
//           </Stack>
//         )
//       })}
//     </Stack>
//   )
// }

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
                onClick={() => window.localStorage.removeItem('store_backup')}
              >
                Reset config
              </Button>
            </ButtonGroup>
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
                <Accordion allowMultiple>
                  {store.root.data.map((dataId) => (
                    <AccordionItem key={dataId}>
                      <AccordionHeader>
                        <Box flex="1" textAlign="left">
                          <Heading as="h5" size="xs">
                            {store[dataId].key}
                          </Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionHeader>
                      <AccordionPanel>
                        <AttributesList id={dataId} />
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </SimpleGrid>
            </section>
            <section>
              <pre className="card">
                <code>{JSON.stringify(walkStore(store), undefined, 2)}</code>
              </pre>
              Debug:
              <pre className="card">
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
