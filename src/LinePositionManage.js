const viewportH = window.innerHeight
const viewportW = window.innerWidth

// 标尺元素，及其子元素的选择器
const staffGaugeId = '__uipx-staff-gauge'
const hlbClassName = '__uipx-horizontal-line-box'
const vlbClassName = '__uipx-vertical-line-box'
const lineAClassName = '__uipx-line-a'
const lineBClassName = '__uipx-line-b'
const lineMidClassName = '__uipx-line-mid'
const tmDisClassName = '__uipx-tm-dis'
const disHalfAClassName = '__uipx-dis-half-a'
const distanceTxtClassName = '__uipx-distance-txt'
const disHalfBClassName = '__uipx-dis-half-b'

// 标尺类
export default class LinePositionManage {
  /**
   * 滑动标尺
   * @param {boolean} isHorizontal 方向，true: 水平线; false: 垂直线
   */
  constructor (isHorizontal = true) {
    this.lineBox = null
    this.lineA = this.activeLine = null
    this.lineB = null
    this.isHorizontal = isHorizontal
    this.startPosition = 0
    this.tmDisPosition = 0
    this.line1Position = 0
    this.line2Position = 0
    this.tmDis = {
      activeType: 0,
      node: null,
      children: {
        disHalfA: null,
        distanceTxt: null,
        disHalfB: null
      }
    }
    this.sgContainer = this.getContainer()
    // 属性取值
    this.bwlineName = this.isHorizontal ? 'clientY' : 'clientX'
    this.measureTransName = this.isHorizontal ? 'X' : 'Y'
    this.measureLineName = 'client' + this.measureTransName
  }
  init () {
    this.initDOM()
    this.initPosition()
    this.initListener()
  }
  initDOM () {
    // 标尺
    this.lineBox = getNode(this.isHorizontal ? hlbClassName : vlbClassName)
    this.lineA = this.activeLine = getNode(lineAClassName)
    if (!this.isHorizontal) {
      this.lineA.style.height = viewportH + 'px'
    }
    const lineMid = getNode(lineMidClassName, 'p')
    this.lineA.appendChild(lineMid)
    this.lineBox.appendChild(this.lineA)
    this.lineB = this.lineA.cloneNode(true)
    this.lineB.className = lineBClassName
    this.lineBox.appendChild(this.lineB)
    // 测量线
    this.tmDis.node = getNode(tmDisClassName, 'p')
    ;[disHalfAClassName, distanceTxtClassName, disHalfBClassName].forEach(item => {
      this.tmDis.children[item.replace('__uipx-', '').replace(/-\w/g, mt => mt.slice(1).toUpperCase())] = this.tmDis.node.appendChild(getNode(item, 'span'))
    })
    // 设置初始位置
    const size = 29
    const lineProp = this.isHorizontal ? 'height' : 'width'
    const midProp = this.isHorizontal ? 'top' : 'left'
    this.lineB.style[lineProp] = this.lineA.style[lineProp] = size + 'px'
    this.tmDis.node.style[midProp] = lineMid.style[midProp] = this.lineB.children[0].style[midProp] = (size - 1) / 2 + 'px'
    this.lineA.appendChild(this.tmDis.node)
    this.sgContainer.appendChild(this.lineBox)
  }
  initPosition () {
    const initialStep = Math.round(this.isHorizontal ? viewportH / 3 : viewportW / 3)
    this.line1Position = initialStep
    this.line2Position = initialStep * 2
    this.moveTo(initialStep)
    this.activeLine = this.lineB
    this.moveTo(initialStep * 2)
  }
  initListener () {
    this.sgContainer.addEventListener('touchstart', this.sgContainerStart.bind(this), { passive: false })
    this.sgContainer.addEventListener('touchmove', this.sgContainerMove.bind(this), { passive: false })
    this.sgContainer.addEventListener('touchend', this.sgContainerEnd.bind(this), { passive: false })
  }
  getContainer () {
    // 所有的标尺实例都放在 #staff-gauge 这个容器元素下
    this.sgContainer = document.getElementById(staffGaugeId)
    if (!this.sgContainer) {
      this.sgContainer = document.createElement('div')
      this.sgContainer.id = staffGaugeId
      document.body.appendChild(this.sgContainer)
    }
    return this.sgContainer
  }
  resetTranslateY () {
    const re = new RegExp(/translate[XY]\(([-+]?[\d\.]+)px\)/)
    this.line1Position = +this.lineA.style.transform.match(re)[1]
    this.line2Position = +this.lineB.style.transform.match(re)[1]
    this.tmDisPosition = +((this.tmDis.node.style.transform.match(re) || [0, 0])[1])
  }
  changeVisible (type) {
    this.sgContainer.style.display = type ? '' : 'none'
  }
  moveTo(v) {
    v = Math.round(v)
    let distance = this.activeLine === this.lineA ? (this.line2Position - v) : (v - this.line1Position)
    if (distance < 0) {
      if (this.tmDis.activeType === 0) {
        this.tmDis.activeType = 1
        this.lineB.appendChild(this.lineA.removeChild(this.tmDis.node))
      }
    } else if (distance > 0) {
      if (this.tmDis.activeType === 1) {
        this.tmDis.activeType = 0
        this.lineA.appendChild(this.lineB.removeChild(this.tmDis.node))
      }
    }
    distance = Math.abs(distance)
    const attr = this.isHorizontal ? 'height' : 'width'
    const spaceV = this.isHorizontal ? 15 : 30
    this.activeLine.style.transform = `translate${this.isHorizontal ? 'Y' : 'X'}(${v}px)`
    this.tmDis.node.style[attr] = distance + 'px'
    this.tmDis.children.disHalfA.style[attr] = this.tmDis.children.disHalfB.style[attr] = distance / 2 - spaceV + 'px'
    this.tmDis.children.disHalfB.style[this.isHorizontal ? 'top' : 'left'] = distance / 2 + spaceV + 'px'
    this.tmDis.children.distanceTxt.textContent = distance + 'px'
  }
  sgContainerStart (e) {
    e.preventDefault()
    if (e.target === this.lineA || e.target.parentNode === this.lineA) {
      this.activeLine = this.lineA
      this.startPosition = e.changedTouches[0][this.bwlineName]
    } else if (e.target === this.lineB || e.target.parentNode === this.lineB) {
      this.activeLine = this.lineB
      this.startPosition = e.changedTouches[0][this.bwlineName]
    } else if (e.target === this.tmDis.node || e.target.parentNode === this.tmDis.node) {
      this.activeLine = this.tmDis.node
      this.startPosition = e.changedTouches[0][this.measureLineName]
    } else {
      this.activeLine = null
      this.startPosition = 0
    }
    if (this.activeLine) {
      this.touchStartCB && this.touchStartCB()
    }
  }
  sgContainerMove (e) {
    e.preventDefault()
    if (!this.activeLine) return
    // 标识距离线
    if (this.activeLine === this.tmDis.node) {
      this.tmDis.node.style.transform = `translate${this.measureTransName}(${e.changedTouches[0][this.measureLineName] - this.startPosition + this.tmDisPosition}px)`
    } else {
      this.moveTo(e.changedTouches[0][this.bwlineName] - this.startPosition + this[this.activeLine === this.lineA ? 'line1Position' : 'line2Position'])
    }
  }
  sgContainerEnd (e) {
    e.preventDefault()
    if (this.activeLine) {
      this.touchEndCB && this.touchEndCB()
      this.resetTranslateY()
    }
  }
}

function getNode (className, tag) {
  const el = document.createElement(tag || 'div')
  el.className = className
  return el
}