// on popup page loaded
const loaded = () => {
  console.log('[Popup page] loaded ...')
  initTabSwitchEvent()
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log('[Popup page] got tab ...')

    let tab = tabs[0]
    let detectedTableList = document.getElementById('detected-table-list')
    let inspectedTableList = document.getElementById('inspected-table-list')
    let inspectButton = document.getElementById('enable-inspector')
    let autoDetectButton = document.getElementById('auto-detect-table')
    let tabBoxWrap = document.getElementById('tab-boxes')
    let currSelectedTableKey
    let inspectEnabled = false

    // Waiting connection establish
    chrome.runtime.onConnect.addListener(port => {
      console.log('[Popup page] connected got port ...')

      // waiting for table lists collection
      port.onMessage.addListener((msg) => {
        // console.log(msg)
        // rendering to popup
        switch (msg.from) {
          case 'auto-detect':
            renderTableKeys(detectedTableList, msg.tables)
            break
          case 'inspector':
            renderTableKeys(inspectedTableList, msg.tables)
            break
        }
      })

      // Highlight table while hover
      tabBoxWrap.addEventListener('mouseover', (event) => {
        let currTableKey = event.target.dataset.tableKey
        if (!currTableKey) return
        currSelectedTableKey = currTableKey
        port.postMessage({code: 'handle-hover', tableKey: currSelectedTableKey})
      })

      // export
      tabBoxWrap.addEventListener('click', (event) => {
        let ele = event.target
        let fileType = ele.dataset.fileType
        let currTableKey = ele.dataset.tableKey

        if (!fileType || !currTableKey) return

        currSelectedTableKey = currTableKey

        port.postMessage({
          code: 'handle-export',
          fileType: fileType,
          tableKey: currSelectedTableKey
        })

        event.preventDefault()
        event.stopPropagation()
      })

      // enable or disable inspect
      inspectButton && inspectButton.addEventListener('click', () => {
        inspectEnabled = !inspectEnabled
        inspectButton.classList.toggle('active')
        switchTab(inspectEnabled ? 1 : 0)
        port.postMessage({
          code: inspectEnabled ? 'handle-enable-inspect' : 'handle-disable-inspect'
        })
      })

      // re-detect
      autoDetectButton.addEventListener('click', () => {
        switchTab(0)
        port.postMessage({
          code: 'handle-auto-detect-table'
        })
      })

      // disconnect port while popup page closed
      window.addEventListener('unload', () => {
        port.disconnect()
      })
    })

    console.log('[Popup page] send hand-shake msg to content_scripts ...')

    // Send a request
    chrome.tabs.sendMessage(tab.id, {manipulation: 'popup-open', id: tab.id})
  })
}

window.addEventListener('DOMContentLoaded', loaded)