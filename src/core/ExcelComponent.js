import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  toHTML() {
    return '<h1>Component</h1>'
  }
}
