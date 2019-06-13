// highlight and scroll to element
let handleHover = (key) => {
  let targetTable = tables[key] || inspectTable[key]
  let targetTableDom = targetTable && targetTable.table
  if (!targetTableDom) return
  let _timer = null

  scrollObserver = new IntersectionObserver((entries) => {
    // let [entry] = entries
    clearTimeout(_timer)

    _timer = setTimeout(() => {
      highlightElement(targetTableDom, false)
      scrollObserver && scrollObserver.disconnect()
    }, 10)

    /*if (entry.isIntersecting) {
    }*/
  })

  scrollObserver.observe(targetTableDom)

  _timer = setTimeout(() => {
    highlightElement(targetTableDom, false)
    scrollObserver && scrollObserver.disconnect()
  }, 10)

  scrollToElement(targetTableDom)
}

let handleExport = ({code, fileType, tableKey}) => {
  let blob, url
  let targetTable = tables[tableKey] || inspectTable[tableKey]
  let targetTableDom = targetTable && targetTable.table
  if (!targetTableDom) return

  /*

    function doit(dom) {
      var wb = XLSX.utils.table_to_book(dom)
       var b64 = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'base64'})
      console.log('b64', b64)

      return b64
    }
  */

  switch (fileType) {
    case 'json':
      blob = new Blob([toJson(targetTableDom)], {type: 'text/plain;charset=utf-8'})
      break

    case 'csv':
      // \ufeff  解决导出中文时乱码
      blob = new Blob(['\ufeff' + toCsv(targetTableDom)], {type: 'text/csv,charset=UTF-8'})
      break

    /*
    no excel now
    case 'excel':
    break
    */

    case 'txt':
      blob = new Blob(['\ufeff' + toTxt(targetTableDom)], {type: 'application/json;charset=utf-8'})
      break

    default:
      break
  }

  url = URL.createObjectURL(blob)

  chrome.runtime.sendMessage({file: url, fileName: tableKey + '.' + fileType})
}

let inspectEvent = (event) => {
  let doNotHandle = 'body,html,#document'
  let nodeName = event.target.nodeName.toLowerCase()

  if (doNotHandle.indexOf(nodeName) > -1) return

  // press CTRL key to lock
  if (event.ctrlKey) return

  inspectTable = createTableKeyValue([event.target])
  port.postMessage({from: 'inspector', tables: inspectTable})
  highlightElement(event.target, true)
}

//  hover event
let enableInspect = () => {
  document.addEventListener('mouseover', inspectEvent)
}

let disableInspect = () => {
  document.removeEventListener('mouseover', inspectEvent)
}