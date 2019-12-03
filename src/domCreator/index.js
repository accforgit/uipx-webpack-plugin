import VARS from '../vars'
import dom from './html'
import css from './css'
import script from './script'

export default () => {
  const container =  document.createElement('div')
  container.id = VARS.containerId
  container.innerHTML = dom + `<style>${css}</style>`
  document.body.appendChild(container)
  // dom 绘制完成后再执行对应的 js
  script()
}