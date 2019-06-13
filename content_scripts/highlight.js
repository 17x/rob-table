let ctrlKey
let layer

(() => {
  // load layer
  layer = document.createElement('div')
  layer.id = '__rob-table__inspector-element__layer'
  document.documentElement.appendChild(layer)
})()

let hideHighlightLayer = () => {
  layer.style.display = 'none'
}

let scrollToElement = (dom) => {
  dom.scrollIntoView({behavior: 'auto', block: 'start', inline: 'nearest'})
}

// highlight element
let highlightElement = (dom, showAfter = false) => {
  let domRect = dom.getBoundingClientRect()
  // if hidden
  if (domRect.width === 0 || domRect.height === 0) return

  if (showAfter) {
    layer.classList.add('showAfter')
  } else {
    layer.classList.remove('showAfter')
  }

  layer.style.width = domRect.width + 'px'
  layer.style.height = domRect.height + 'px'
  layer.style.left = domRect.x + 'px'
  layer.style.top = domRect.y + 'px'
  layer.style.display = 'block'
}

document.addEventListener('keydown', (event) => {
  ctrlKey = event.ctrlKey
})
document.addEventListener('keyup', (event) => {
  ctrlKey = event.ctrlKey
})