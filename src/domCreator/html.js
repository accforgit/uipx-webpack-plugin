export default `
  <div id="__uipx-switch">uipx</div>
  <div id="__uipx-modal">
    <!-- UI图片 --> 
    <div class="__uipx-level __uipx-img-box">
      <div id="__uipx-img-box">
        <img src="" alt="" id="__uipx-img" style="display: none;">
      </div>
    </div>
    <!-- 点击组 -->
    <div class="__uipx-level __uipx-btn-group">
      <button class="__uipx-btn __uipx-btn-img __uipx-btn-default">
        选择UI
        <input type="file" id="__uipx-picfile" name="picFile" />
      </button>
      <button id="__uipx-reset" class="__uipx-btn __uipx-btn-default">位置恢复</button>
    </div>
    <!-- 点选组 -->
    <div class="__uipx-level __uipx-check-group">
      <button id="__uipx-size-check" class="__uipx-btn">使用原始尺寸</button>
      <button id="__uipx-follow-check" class="__uipx-btn">同步滚动</button>
      <button id="__uipx-carp-check" class="__uipx-btn">反相</button>
      <button id="__uipx-sg-check" class="__uipx-btn">标尺</button>
    </div>
    <div class="__uipx-level __uipx-change-opacity">
      调节透明度：
      <button class="__uipx-round-btn __uipx-icon-cut">-</button>
      <input type="number" name="cpi" id="__uipx-cpi">
      <button class="__uipx-round-btn __uipx-icon-add">+</button>
    </div>
    <!-- 微调 -->
    <div class="__uipx-level __uipx-micro-box">
      位置微调：
      <div class="__uipx-micro-content">
        <button class="__uipx-round-btn __uipx-micro-top" title="点击上移1px">↑</button>
        <p class="__uipx-micro-line">
          <button class="__uipx-round-btn __uipx-micro-left" title="点击左移1px">←</button>
          <button class="__uipx-round-btn __uipx-micro-right" title="点击右移1px">→</button>
        </p>
        <button class="__uipx-round-btn __uipx-micro-bottom" title="点击下移1px">↓</button>
      </div>
    </div>
    <!-- 需要完全透明的颜色值 -->
    <div class="__uipx-level __uipx-shear-color">
      <div class="__uipx-shear-title">
        <span>透明色值(rgb)：</span>
        <button id="__uipx-add-color-btn" class="__uipx-btn __uipx-btn-default">Add</button>
      </div>
      <ul id="__uipx-color-list">
      </ul>
    </div>
  </div>
  <div id="__uipx-mask" class="__uipx-mask-overview"></div>
`