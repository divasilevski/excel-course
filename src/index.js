import './scss/index.scss'

import { Excel } from './components/excel/Excel'
import { Formula } from './components/formula/Formula'
import { Header } from './components/header/Header'
import { Table } from './components/table/Table'
import { Toolbar } from './components/toolbar/Toolbar'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { debounce, storage } from './core/utils'
import { initState } from './redux/initState'

const store = createStore(rootReducer, initState)

const stateListener = debounce((state) => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()

console.log('Excel: ', excel)
