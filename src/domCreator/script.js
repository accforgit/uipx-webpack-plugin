export default () => {
  const sw = document.getElementById('__uipx-switch')
  const modal = document.getElementById('__uipx-modal')
  const mask = document.getElementById('__uipx-mask')
  let currentTransX = 0
  let currentTransY = 0
  let startX = 0
  let startY = 0
  let startTime = 0
  const swBoundarylx = window.innerWidth - sw.offsetWidth
  const swBoundaryty = -(window.innerHeight - sw.offsetHeight)
  let moveX = 0
  let moveY = 0
  sw.addEventListener('touchstart', e => {
    e.preventDefault()
    startTime = +new Date()
    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY
  })
  sw.addEventListener('touchmove', e => {
    e.preventDefault()
    moveX = e.changedTouches[0].clientX - startX + currentTransX
    moveY = e.changedTouches[0].clientY - startY + currentTransY
    if (moveX < 0) {
      moveX = 0
    } else if (moveX > swBoundarylx) {
      moveX = swBoundarylx
    }
    if (moveY > 0) {
      moveY = 0
    } else if (moveY < swBoundaryty) {
      moveY = swBoundaryty
    }
    sw.style.transform = `translate(${moveX}px, ${moveY}px)`
  })
  sw.addEventListener('touchend', e => {
    e.preventDefault()
    if (+new Date() - startTime < 200) {
      // 认为是点击事件
      switchContainer()
    }
    const mt = sw.style.transform.match(/translate\(([-+]?[\d\.]+)px,\s*([-+]?[\d\.]+)px\)/) || [0, 0, 0]
    currentTransX = +mt[1]
    currentTransY = +mt[2]
  })
  // 遮罩层点击
  mask.addEventListener('click', () => {
    switchContainer()
  })
  const maskShowClassName = '__uipx-mask-show'
  const maskOverViewClassName = '__uipx-mask-overview'
  const modalShowClassName = '__uipx-modal-show'
  mask.addEventListener('transitionend', e => {
    if (e.propertyName === 'opacity' && !mask.classList.contains(maskShowClassName)) {
      // transform 离开页面
      mask.classList.toggle(maskOverViewClassName)
    }
  })
  function switchContainer () {
    modal.classList.toggle(modalShowClassName)
    if (mask.classList.contains(maskShowClassName)) {
      // 隐藏，opacity => 0
      mask.classList.toggle(maskShowClassName)
    } else {
      // 显示,opacity => 0.6
      mask.classList.toggle(maskShowClassName)
      // transform进入页面
      mask.classList.toggle(maskOverViewClassName)
    }
  }
}
