import { ExcelComponent } from './ExcelComponent'

export class ExecelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  initState(initState = {}) {
    this.state = { ...initState }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.$root.html(this.template)
  }
}
