export const config = {
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
} as const

export type Key = keyof typeof config
