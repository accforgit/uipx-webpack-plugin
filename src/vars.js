export default {
  // 组件的容器 id
  containerId: '__uipx-container',
  // append 到页面上进行对比的 canvas 的 Id
  diffCanvasId: '__uipx-canvas',
  // popup.js 给 cs.js 传递的对比图片 base64 数据体的 name 属性值
  imgBase64Name: 'imgBase64',
  // popup.js 给 cs.js 传递的 指定canvas的尺寸是否使用原UI图的 数据体的 name 属性值
  sizeCheckName: 'sizeCheck',
  // popup.js 给 cs.js 传递的 指定canvas跟随页面滚动的 数据体的 name 属性值
  followCheckName: 'followCheck',
  // popup.js 给 cs.js 传递的 canvas 位置坐标 reset 数据体的 name 属性值
  canvasPResetName: 'canvasPReset',
  // popup.js 给 cs.js 传递的调节 canvas 透明度 数据体的 name 属性值
  opacityChangeName: 'opacityChange',
  // popup.js 给 cs.js 传递的进行 canvas 反相 数据体的 name 属性值
  carpCheckName: 'carpCheck',
  // popup.js 给 cs.js 传递的进行 canvas 标尺 数据体的 name 属性值
  staffGaugeName: 'staffGauge',
  // popup.js 给 cs.js 传递的 canvas进行位置微调 name 属性值
  microActionName: 'microAction',
  // 本地储存颜色的 key
  colorListName: 'colorList'
}