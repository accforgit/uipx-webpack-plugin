export default `
  #__uipx-switch {
    position: fixed;
    left: 0;
    bottom: 0;
    color: #FFF;
    background-color: #ff5555;
    line-height: 1;
    font-size: 14px;
    padding: 10px 22px;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    z-index: 10000;
  }
  #__uipx-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 85%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    transform: translateY(100%);
    transition: transform ease-out 0.3s;
    background-color: #fff;
    z-index: 10002;
  }
  #__uipx-modal.__uipx-modal-show {
    transform: translateY(0);
  }
  #__uipx-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity ease-out 0.3s;
    background-color: #000;
    z-index: 10001;
  }
  #__uipx-mask.__uipx-mask-overview {
    transform: translateY(100%);
  }
  #__uipx-mask.__uipx-mask-show {
    transform: translateY(0);
    opacity: 0.6;
  }
  .__uipx-level {
    margin-bottom: 16px;
  }
  #__uipx-img-box {
    position: relative;
    font-size: 0;
    text-align: center;
  }
  #__uipx-img-box #__uipx-img {
    max-width: 200px;
    max-height: 200px;
  }
  .__uipx-img-del {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    background-color: rgba(0,0,0,.3);
    transition: opacity .3s;
  }
  .__uipx-img-del-txt {
    font-size: 16px;
    color: #fff;
  }
  .__uipx-img-del:hover {
    opacity: 1;
  }
  /* 管理需要完全透明的颜色值 */
  .__uipx-shear-color #__uipx-color-list {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }
  .__uipx-shear-color .__uipx-color-item {
    list-style: none;
  }
  .__uipx-shear-color .__uipx-color-item input {
    width: 50px;
  }
  /* canvas */
  #__uipx-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
  }
  /* 通用按钮 */
  .__uipx-btn {
    line-height: 26px;
    padding: 0 16px;
    outline: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    border: 1px solid rgb(248, 248, 248);
    box-sizing: border-box;
    font-size: 13px;
    background-color: rgb(248, 248, 248);
    border-radius: 26px;
  }
  .__uipx-round-btn {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    text-align: center;
    outline: none;
    color: #fff;
    border: none;
    border-radius: 50%;
    background-color: #ff5555;
  }
  .__uipx-btn-default {
    color: #fff;
    background-color: #ff5555;
  }
  .__uipx-btn-img {
    position: relative;
  }
  #__uipx-picfile {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
  }
  /* 按钮选中的样式 */
  .__uipx-btn-active {
    border-color: #ff5555;;
    color: #ff5555;;
  }
  /* 透明度调节 */
  input[id="__uipx-cpi"]::-webkit-outer-spin-button,
  input[id="__uipx-cpi"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[id="__uipx-cpi"]{
    width: 70px;
    line-height: 24px;
    border-radius: 12px;
    background-color: rgb(248, 248, 248);
    border: none;
    text-align: center;
    outline: none;
    -moz-appearance: textfield;
  }
  /* 透明色值 */
  .__uipx-shear-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px
  }
  .__uipx-color-item {
    margin-bottom: 6px;
  }
  .__uipx-color-item input {
    line-height: 23px;
    outline: none;
    border: 1px solid rgb(248, 248, 248);
  }
  .__uipx-del-color-btn {
    padding: 4px 10px;
    margin-left: 10px;
    border-radius: 12px;
    border: none;
    outline: none;
  }
  /* 微调按钮 */
  .__uipx-micro-box {
    display: flex;
    align-items: center;
  }
  .__uipx-micro-content {
    position: relative;
    width: 150px;
    text-align: center;
  }
  .__uipx-micro-content::before, .__uipx-micro-content::after {
    position: absolute;
    content: '';
    background-color: #ff5555;
  }
  .__uipx-micro-content::before {
    top: 50%;
    left: 30px;
    right: 30px;
    height: 1px;
  }
  .__uipx-micro-content::after {
    top: 30px;
    bottom: 30px;
    left: 50%;
    width: 1px;
  }
  .__uipx-micro-content button:hover {
    cursor: pointer;
  }
  .__uipx-micro-line {
    display: flex;
    justify-content: space-between;
  }
  /* 标尺相关 */
  #__uipx-staff-gauge {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }
  #__uipx-staff-gauge p {
    margin: 0;
  }
  .__uipx-line-a, .__uipx-line-b {
    position: absolute;
    left: 0;
    right: 0;
    cursor: n-resize;
  }
  .__uipx-line-a {
    z-index: 9;
  }
  .__uipx-line-b {
    z-index: 8;
  }
  .__uipx-line-mid {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #61ffff;
  }
  .__uipx-tm-dis {
    position: absolute;
    left: 40px;
    width: 1px;
  }
  .__uipx-dis-half-a, .__uipx-dis-half-b {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    background-color: #61ffff;
  }
  .__uipx-distance-txt {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    font-size: 16px;
    white-space: nowrap;
    color: #ff5555;
  }

  .__uipx-vertical-line-box .__uipx-line-a {
    z-index: 11;
  }
  .__uipx-vertical-line-box .__uipx-line-b {
    z-index: 10;
  }
  .__uipx-vertical-line-box .__uipx-line-mid {
    top: 0;
    bottom: 0;
    height: 100%;
    width: 1px;
  }
  .__uipx-vertical-line-box .__uipx-tm-dis {
    top: 40px;
    height: 1px;
  }
  .__uipx-vertical-line-box .__uipx-dis-half-a, .__uipx-vertical-line-box .__uipx-dis-half-b {
    top: 0;
    left: 0;
    height: 1px;
  }
  .__uipx-vertical-line-box .__uipx-distance-txt {
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }
  /* toast组件 */
  .__uipx-toast {
    position: fixed;
    left: 50%;
    bottom: 80px;
    max-width: 150px;
    margin: 0;
    padding: 6px 12px;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    background-color: rgba(109, 111, 115, 0.88);
    transform: translateX(-50%);
    z-index: 10010;
  }
`