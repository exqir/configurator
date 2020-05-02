import { DataType } from '../reducers'

export const config = {
  modules: {
    key: 'modules',
    type: DataType.ROOT,
    attributes: ['cart-horizontal', 'progress-stepper', 'components'],
  },
  components: {
    key: 'components',
    type: DataType.MODULE,
    attributes: ['select', 'quantity_stepper', 'text'],
  },
  'cart-horizontal': {
    key: 'cart-horizontal',
    type: DataType.MODULE,
    attributes: ['module_headline', 'hideHeadlines', 'cartColumns'],
  },
  'progress-stepper': {
    key: 'progress-stepper',
    type: DataType.MODULE,
    attributes: ['activeStep', 'steps'],
  },
  activeStep: {
    key: 'activeStep',
    type: DataType.NUMBER,
    value: 0,
    attributes: [0, 3],
  },
  steps: {
    key: 'steps',
    type: DataType.SELECT,
    value: 'first',
    attributes: ['first', 'second'],
  },
  hideHeadlines: {
    key: 'hideHeadlines',
    type: DataType.CHECKBOX,
    value: false,
    attributes: [true, false],
  },
  cartColumns: {
    key: 'cartColumns',
    type: DataType.GRID,
    attributes: ['column'],
  },
  column: {
    key: 'column',
    type: DataType.COLUMN,
    attributes: ['width', 'justify', 'column_type'],
  },
  column_type: {
    key: 'column_type',
    type: DataType.COLUMN_SELECTION,
    value: 'quantity',
    attributes: ['quantity', 'cart_actions'],
  },
  quantity: {
    key: 'quantity',
    type: DataType.COLUMN_TYPE,
    attributes: ['qty_selection'],
  },
  cart_actions: {
    key: 'cart_actions',
    type: DataType.COLUMN_TYPE,
    attributes: [],
  },
  width: {
    key: 'width',
    type: DataType.NUMBER,
    value: 1,
    attributes: [1, 12],
  },
  justify: {
    key: 'justify',
    type: DataType.SELECT,
    value: 'left',
    attributes: ['left', 'right', 'center'],
  },
  qty_selection: {
    key: 'qty_selection',
    type: DataType.COMPONENT_SELECTION,
    value: 'quantity_stepper',
    attributes: ['quantity_stepper', 'select'],
  },
  quantity_stepper: {
    key: 'quantity_stepper',
    type: DataType.COMPONENT,
    attributes: ['component_type', 'hasBorder'],
  },
  select: {
    key: 'select',
    type: DataType.COMPONENT,
    attributes: ['component_type', 'select_variants'],
  },
  component_type: {
    key: 'component_type',
    type: DataType.SELECT,
    value: 'primary',
    attributes: ['primary', 'secondary', 'success', 'danger'],
  },
  select_variants: {
    key: 'select_variants',
    type: DataType.SELECT,
    value: 'outlined',
    attributes: ['outlined', 'underlined'],
  },
  quantity_stepper_variants: {
    key: 'quantity_stepper_variants',
    type: DataType.SELECT,
    value: 'arrows',
    attributes: ['arrows', 'plus_minus'],
  },
  hasBorder: {
    key: 'hasBorder',
    type: DataType.CHECKBOX,
    value: true,
    attributes: [true, false],
  },
  module_headline: {
    key: 'module_headline',
    type: DataType.COMPONENT_LINK,
    attributes: ['text'],
  },
  text: {
    key: 'text',
    type: DataType.COMPONENT,
    attributes: ['component_type'],
  },
} as const

export type Key = keyof typeof config
