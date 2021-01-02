const CODES = {
  A: 65,
  Z: 90,
}

function toCell(_, index) {
  return /* html */ `
    <div class="cell" data-col="${index}" contenteditable></div>
  `
}

function toColumn(col, index) {
  return /* html */ `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
  const resize = index
    ? /* html */ `<div class="row-resize" data-resize="row"></div>`
    : ''

  return /* html */ `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}