import { storage } from '../core/utils'
import { defaultStyles } from '../constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

const normilize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initState = storage('excel-state')
  ? normilize(storage('excel-state'))
  : defaultState
