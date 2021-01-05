import { $ } from '../../core/dom'

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const dataType = '[data-type="resizable"]'
    const $parent = $resizer.closest(dataType)
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'

    let value

    $resizer.css({ opacity: 1, [sideProp]: '-5000px' })

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({ right: -delta + 'px' })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({ bottom: -delta + 'px' })
      }
    }

    document.onmouseup = (e) => {
      if (type === 'col') {
        $parent.css({ width: value + 'px' })
        $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) =>
            $(el).css({ width: value + 'px' })
          )
      } else {
        $parent.css({ height: value + 'px' })
      }

      resolve({
        id: $parent.data[type],
        type,
        value,
      })

      $resizer.css({ opacity: 0, bottom: 0, right: 0 })

      document.onmousemove = null
      document.onmouseup = null
    }
  })
}
