let tableId = 0
let tables
let inspectTable
let port
let scrollObserver
console.log('[Content script] loaded ...')

chrome.runtime.onMessage.addListener((message, callback) => {
  console.log('[Content script] get msg from popup ...')
  console.log('port :', port)

  if (message.manipulation === 'popup-open') {
    console.log('[Content script] get msg from popup page - popup page opened ...')

    autoDetectAllTables()

    // establish connect
    port = chrome.runtime.connect({name: 'rob-table'})

    port.postMessage({tables: tables, from: 'auto-detect'})

    // handlers
    port.onMessage.addListener(msg => {
      switch (msg.code) {
        case 'handle-hover':
          handleHover(msg.tableKey)
          break
        case 'handle-export':
          handleExport(msg)
          break
        case 'handle-enable-inspect':
          enableInspect(msg)
          break
        case 'handle-disable-inspect':
          disableInspect()
          break
        case 'handle-auto-detect-table':
          // console.log('refresh')
          // console.log(tables)
          autoDetectAllTables()
          port.postMessage({tables: tables, from: 'auto-detect'})
          break
        default:
          break
      }
    })

    // destroy
    port.onDisconnect.addListener(() => {
      console.log('[Content script] - Port - onDisconnect')
      disableInspect()
      hideHighlightLayer()
      ctrlKey = false
    })
  }
})