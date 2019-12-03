/**
 * 选择器
 * @param {string} selector 选择器名
 */
export function $ (selector) {
  return selector.startsWith('#')
    ? document.getElementById(selector.slice(1))
    : document.querySelectorAll(selector)
}