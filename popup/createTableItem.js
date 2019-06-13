let renderTableKeys = (domContain, tables) => {
  domContain.innerHTML = ''
  let fragment = document.createDocumentFragment()
  let fileTypeList = ['json', 'csv', /*'excel',*/ 'txt']

  Object.keys(tables).map((key) => {
    let li = document.createElement('li')
    console.log(tables[key])
    li.textContent = key
    li.dataset.tableKey = key
    li.innerHTML = `<p data-table-key="${key}">${tables[key].placeholder}</p>`

    fileTypeList.map(fileType => {
      li.innerHTML += `<button type="button" 
                               class="handle-export-button ${fileType}" 
                               data-file-type="${fileType}" 
                               data-table-key="${key}"
                               title="export to ${fileType}">
        <span class="iconfont icon-${fileType}" 
              data-table-key="${key}"
              data-file-type="${fileType}"></span>
      </button>`
    })

    fragment.appendChild(li)
  })

  domContain.appendChild(fragment)
}