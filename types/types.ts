export type UiLayer = 'bootstrap' | 'material-ui'

export type UiComponent = 'button' | 'select' | 'text'

export type UiType = 'primary' | 'secondary' | 'success' | 'danger'

// export type Components = {
//     [component: UiComponent]:
// }

export type ColumnJustify = 'left' | 'right' | 'center'
export type ColumnWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Grid<T> = {
  width: ColumnWidth
  alignment: ColumnJustify
  type: T
  data: {}
}

export type CartHorizontal = {
  hideHealines: boolean
  cartColumns: {}
}
