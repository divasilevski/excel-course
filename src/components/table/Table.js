import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.risize'
import { TableSelection } from './TableSelection'
import {
  isCell,
  matrix,
  shouldResize,
  nextSelector,
} from './table.functions'
import { $ } from '../../core/dom'
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(25, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style)
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      this.selectHandler(event)
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]

    const { key, shiftKey } = event

    if (keys.includes(key) && !shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }

  // Custom Methods
  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    )
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    console.log($cell.getStyles(Object.keys(defaultStyles)))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  selectHandler(event) {
    const $target = $(event.target)
    if (event.shiftKey) {
      const $cells = matrix($target, this.selection.current)

      this.selection.selectGroup(
        $cells.map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        )
      )
    } else {
      this.selectCell($target)
    }
  }
}
