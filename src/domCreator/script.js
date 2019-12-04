export default () => {
  //#region 变量初始化
  const sw = document.getElementById('__uipx-switch')
  const modal = document.getElementById('__uipx-modal')
  const mask = document.getElementById('__uipx-mask')
  const maskShowClassName = '__uipx-mask-show'
  const maskOverViewClassName = '__uipx-mask-overview'
  const modalShowClassName = '__uipx-modal-show'
  let currentTransX = 0
  let currentTransY = 0
  let startX = 0
  let startY = 0
  let startTime = 0
  const swBoundarylx = window.innerWidth - sw.offsetWidth
  const swBoundaryty = -(window.innerHeight - sw.offsetHeight)
  let moveX = 0
  let moveY = 0
  // #endregion

  // #region 事件注册
  // sw touch事件
  sw.addEventListener('touchstart', swTouchStart)
  sw.addEventListener('touchmove', swTouchMove)
  sw.addEventListener('touchend', swTouchEnd)
  // 遮罩层事件
  mask.addEventListener('click', switchContainer)
  mask.addEventListener('transitionend', maskOpacityTranEnd)
  // #endregion

  // #region methods
  function swTouchStart (e) {
    e.preventDefault()
    startTime = +new Date()
    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY
  }
  function swTouchMove (e) {
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
  }
  function swTouchEnd (e) {
    e.preventDefault()
    if (+new Date() - startTime < 200) {
      // 认为是点击事件
      switchContainer()
    }
    const mt = sw.style.transform.match(/translate\(([-+]?[\d\.]+)px,\s*([-+]?[\d\.]+)px\)/) || [0, 0, 0]
    currentTransX = +mt[1]
    currentTransY = +mt[2]
  }
  function maskOpacityTranEnd (e) {
    if (e.propertyName === 'opacity' && !mask.classList.contains(maskShowClassName)) {
      // transform 离开页面
      mask.classList.toggle(maskOverViewClassName)
    }
  }
  // 插件面板的显隐切换
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
  // #endregion
}
