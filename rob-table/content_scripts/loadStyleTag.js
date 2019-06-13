;(() => {
  let styleNode = document.createElement('style')

  styleNode.innerText = ` 
  #__rob-table__inspector-element__layer {
    background: rgba(66, 124, 255, 0.5);
    position: fixed;
    pointer-events: none;
  }
  #__rob-table__inspector-element__layer::after {
    content: '—— Press CTRL to lock element selection';
    background: #fff;
    position: absolute;
    left: 100%;
    top: 10px;
    font-size: 15px;
    width: 280px;
    display: block;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    display:none;
  }
  #__rob-table__inspector-element__layer.showAfter::after{
    display:block;
  }`

  document.head.appendChild(styleNode)

})()