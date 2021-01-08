import { defaultStyles, defaultTitle } from '../constants'
import { clone } from '../core/utils'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
}

const normilize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export function normilizeInitState(state) {
  return state ? normilize(state) : clone(defaultState)
}
