let transformDomToCommonFormat = (dom) => {
  let result = {
    head: [],
    body: []
  }

  // handle <table>
  if (dom.nodeName.toLowerCase() === 'table') {
    let rows = dom.rows;

    [...rows].map((row, index) => {
      if (index === 0) {
        result.head = [...row['children']].map(th => th['innerText'])
      } else {
        result.body.push(
          [...row['children']].map(td => td['innerText'])
        )
      }
    })

    /*body.map(arr => {
      let tempObj = {}

      head.map((key, index) => {
        tempObj[key] = arr[index]
      })

      result.push(tempObj)
    })*/
  } else {
    // if (!result) return
  }

  return result
}

let generateExcelFile = (str) => {
  let fileXML = `
  <html xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head><xml>
    <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
       <x:Name>Test Sheet</x:Name>
       <x:WorksheetOptions>
          <x:Panes></x:Panes></x:WorksheetOptions>
    </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>
    </xml></head>
    <body>${str}</body>
  </html>
  `
  return 'data:application/vnd.ms-excel' + ', ' + encodeURIComponent(fileXML)
}
// standard data {head,body}
// head:[String string1,String string2]
// body:[trArray]
// trArray:[String string1,String string2]

let toCsv = dom => {
  let data = transformDomToCommonFormat(dom)
  let csvString = ''

  if (data.head) {
    csvString += data.head.join(',') + '\n'
  }

  if (data.body) {
    data.body.map(arr => {
      csvString += arr.join(',') + '\n'
    })
  }

  return csvString
}

let toJson = (dom) => {
  let data = transformDomToCommonFormat(dom)
  let jsonList = []

  data.body.map(row => {
    let obj = {}

    row.map((value, index) => {
      let key = data.head[index]
      obj[key] = value
    })

    jsonList.push(obj)
  })

  // console.log(jsonList)
  return JSON.stringify(jsonList)
}

let toExcel = (dom) => {
  return generateExcelFile(dom.outerHTML)
}

let toTxt = (dom) => {
  let data = transformDomToCommonFormat(dom)
  let txtString = ''

  if (data.head) {
    txtString += data.head.join(' ') + '\n'
  }

  if (data.body) {
    data.body.map(arr => {
      txtString += arr.join(' ') + '\n'
    })
  }

  return txtString
}