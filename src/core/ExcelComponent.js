import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }
  // Возвращает шаблон компонента
  toHTML() {
    return '<h1>Component</h1>'
  }

  init() {
    this.initDOMListeners()
  }
}
