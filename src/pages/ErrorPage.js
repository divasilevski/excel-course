import { $ } from '../core/dom'
import { Page } from '../core/Page'

export class ErrorPage extends Page {
  getRoot() {
    return $.create('div', 'error').html(/* html */ `
      <h1>404</h1>
      <h2>Page not found</h2>
    `)
  }
}
