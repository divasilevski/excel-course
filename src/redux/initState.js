import { storage } from '../core/utils'

const defaultState = {
  rowState: {},
  colState: {},
}

export const initState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
