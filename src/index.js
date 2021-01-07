import { Router } from './core/routes/Router'
import { DashboardPage } from './pages/DashboardPage'
import { ErrorPage } from './pages/ErrorPage'
import { ExcelPage } from './pages/ExcelPage'
import './scss/index.scss'

new Router('#app', [
  { page: DashboardPage, path: '' },
  { page: ExcelPage, path: 'excel' },
  { error: ErrorPage },
])
