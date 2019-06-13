const switchTab = (idx) => {
  let tabHeads = [...document.getElementsByClassName('tab-head-item')]
  let tabBoxes = [...document.getElementsByClassName('tab-box')]

  tabHeads.map((tabHead, index) => {
    if (idx === index) {
      tabHead.classList.add('active')
      tabBoxes[index].style.display = 'block'
    } else {
      tabHead.classList.remove('active')
      tabBoxes[index].style.display = 'none'
    }
  })
}

const handleTabHeadItemClick = (event) => {
  let tabIndex = event.target.dataset.tabIndex
  tabIndex && switchTab(parseInt(tabIndex))
}

const initTabSwitchEvent = () => {
  switchTab(0)
  let tabHeads = document.getElementById('tab-head')
  tabHeads.addEventListener('click', handleTabHeadItemClick)
}