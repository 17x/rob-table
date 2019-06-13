// create table key and obj
let createTableKeyValue = (table) => {
  let inspectTables = {}
  let currKey = 'table-' + tableId++
  let tablePlaceholder = 'table'

  table.classList.forEach(className => {
    tablePlaceholder += '.' + className
  })

  tablePlaceholder += ' {' + table.innerText.substring(0, 10) + '...}'

  let currTableStyle = table.getBoundingClientRect()
  if (currTableStyle.width === 0 || currTableStyle.height === 0) {
    tablePlaceholder = '[H] ' + tablePlaceholder
  }

  inspectTables[currKey] = {table, key: currKey, placeholder: tablePlaceholder}

  return inspectTables
}

// detect all tables on current tab page
let saveAllTables = () => {
  // clear
  tables = {};

  [...document.querySelectorAll('table')].map((table) => {
    let currKey = 'table-' + tableId++
    let tablePlaceholder = 'table'

    table.classList.forEach(className => {
      tablePlaceholder += '.' + className
    })

    tablePlaceholder += ' {' + table.innerText.substring(0, 10) + '...}'

    let currTableStyle = table.getBoundingClientRect()
    if (currTableStyle.width === 0 || currTableStyle.height === 0) {
      tablePlaceholder = '[H] ' + tablePlaceholder
    }

    tables[currKey] = {table, key: currKey, placeholder: tablePlaceholder}
  })
}