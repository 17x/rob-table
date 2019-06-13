// create table key and obj
let createTableKeyValue = (tableDomList) => {
  let tempTables = {}

  tableDomList.map((table) => {
    let currKey = 'table-' + tableId++
    let tablePlaceholder = table.nodeName.toLowerCase()
    let currTableRect = table.getBoundingClientRect()

    table.classList.forEach(className => {
      tablePlaceholder += '.' + className
    })

    if (table.innerText) {
      tablePlaceholder += ' {' + table.innerText.substring(0, 10) + '...}'
    }

    if (currTableRect.width === 0 || currTableRect.height === 0) {
      tablePlaceholder = '[H] ' + tablePlaceholder
    }

    tempTables[currKey] = {table, key: currKey, placeholder: tablePlaceholder}
  })

  return tempTables
}

// detect all tables on current tab page
let autoDetectAllTables = () => {
  tables = createTableKeyValue([...document.querySelectorAll('table')])
}