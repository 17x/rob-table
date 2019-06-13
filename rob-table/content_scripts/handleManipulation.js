// highlight and scroll to element
let handleHover = (key) => {
  Object.keys(tables).map(tableKey => {
    if (tableKey === key) {
      scrollToElement(tables[tableKey].table)
      currHighlightObj = {dom: tables[tableKey].table, showAfter: false}
    }
  })
}

let handleExport = ({code, fileType, tableKey}) => {
  let transformedString, blob
  console.log(code, fileType, tableKey)

  switch (fileType) {
    case 'json':
      transformedString = transformTableHtmlToCsv(tables[tableKey].table)
      blob = new Blob([transformedString], {type: 'text/plain'})
      break
    case 'csv':
      transformedString = transformTableHtmlToCsv(tables[tableKey].table)
      // \ufeff  解决导出中文时乱码
      blob = new Blob(['\ufeff' + transformedString], {type: 'text/csv,charset=UTF-8'})
      break
    case 'excel':
      break
    case 'txt':
      break
    default:
      break
  }

  let url = URL.createObjectURL(blob)
  chrome.runtime.sendMessage({file: url})
}

let inspectEvent = (event) => {
  let doNotHandle = 'body,html,#document'
  let nodeName = event.target.nodeName.toLowerCase()

  if (doNotHandle.indexOf(nodeName) > -1) return

  // press CTRL key to lock
  if (event.ctrlKey) return
  port.postMessage({from: 'inspector', tables: createTableKeyValue(event.target)})
  highlightElement(event.target, true)
}

//  hover event
let enableInspect = () => {
  document.addEventListener('mouseover', inspectEvent)
}

let disableInspect = () => {
  document.removeEventListener('mouseover', inspectEvent)
}