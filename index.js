const path = require('path')
const fs = require("fs")

class UIPXWebpackPlugin {
  constructor (options) {
    this.options = options || {}
  }
  apply (compiler) {
    if (typeof this.options.enable === 'boolean' && !this.options.enable) return
    // 将插件入口文件加入到 entry 中
    let indexPath = path.resolve(__dirname, './src/index.js')
    compiler.hooks.entryOption.tap({ name: 'UIPXPlugin' }, (locale, entry) => {
      const type = Object.prototype.toString.call(entry).slice(8, -1)
      if (type === 'String') {
        entry = [indexPath, entry]
        console.warn('[uipx-webpack-plugin] 暂不支持 entry 为 string 类型的情况\n')
      } else if (type === 'Array') {
        entry.unshift(indexPath)
      } else if (type === 'Object') {
        for (let key in entry) {
          if (Object.prototype.toString.call(entry[key]) === '[object Array]') {
            entry[key].unshift(indexPath)
          } else if (typeof entry[key] === 'string') {
            entry[key] = [indexPath, entry[key]]
          }
        }
      }
    })
    compiler.hooks.emit.tap('UIPXWebpackPlugin', compilation => {
      try {
        const data = `import initRegisterListener from './registerListener';initRegisterListener(${JSON.stringify(this.options)})`
        if (fs.readFileSync(indexPath).toString() !== data) {
          fs.writeFileSync(indexPath, data)
        }
      } catch (e) {
        console.error('UIPXWebpackPlugin Error', e.toString());
      }
    })
  }
}

module.exports = UIPXWebpackPlugin