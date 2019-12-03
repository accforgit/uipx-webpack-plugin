// toast 组件
let toastEl = document.createElement('p')
toastEl.className = '__uipx-toast'
let toastTimer = null
export function toast (txt) {
  clearTimeout(toastTimer)
  toastEl.textContent = txt
  document.body.appendChild(toastEl)
  toastTimer = setTimeout(() => {
    document.body.removeChild(toastEl)
  }, 1500)
}
/**
 * 选择器
 * @param {string} selector 选择器名
 */
export function $ (selector) {
  return selector.startsWith('#')
    ? document.getElementById(selector.slice(1))
    : document.querySelectorAll(selector)
}