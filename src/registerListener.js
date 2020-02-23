import VARS from './vars';
import domCreator from './domCreator';
import { $, toast } from './util';
import handler from './handler';

// plugin 传入的 options
let pluginOptions = null;

// 对比的图片链接
let diffImg = null;
// 透明色值列表
let opacityColorList = [];
// 反相
let isColorReverse = false;
// canvas 尺寸，是否使用UI设计稿原图尺寸，默认使用宽度铺满设备宽度，长度等比例缩放的尺寸
let isUseUISize = false;
// 按钮选中的样式class
const btnActiveClassName = '__uipx-btn-active';
// 透明色值的 li.className
const opacityClassName = '__uipx-color-item';
// 删除 透明色值 li.className 的按钮的 className
const delOpacityClassName = '__uipx-del-color-btn';
const pickColorClassName = '__uipx-pick-color-btn';
// 微调按钮
const microTopClassName = '__uipx-micro-top';
const microRightClassName = '__uipx-micro-right';
const microBottomClassName = '__uipx-micro-bottom';
const microLeftClassName = '__uipx-micro-left';

let inputFile = null;
let img = null;
let cpi = null;
let colorList = null;

// #region init
export default function initRegisterListener(options) {
	pluginOptions = options || {};
	diffImg = pluginOptions.diffImg;
	initPanelDom();
	initDomStatus();
	showPic();
	addListener();
}
// #endregion

// 初始化面板DOM
function initPanelDom() {
	// 先初始化 dom
	domCreator();
	inputFile = $('#__uipx-picfile');
	img = $('#__uipx-img');
	cpi = $('#__uipx-cpi');
	colorList = $('#__uipx-color-list');
}
// 注册事件
function addListener() {
	// 注册监听事件
	const listenerList = [
		// 选择上传对比的 UI 图
		{ ele: inputFile, listenerName: 'change', fn: inputFileFn },
		// canvas 整体透明度调节
		{ ele: cpi, listenerName: 'change', fn: cpiFn },
		{
			ele: $('.__uipx-icon-add')[0],
			listenerName: 'click',
			fn() {
				cpiUpdate(1);
			},
		},
		{
			ele: $('.__uipx-icon-cut')[0],
			listenerName: 'click',
			fn() {
				cpiUpdate(-1);
			},
		},
		// canvas 滑动后位置恢复
		{ ele: $('#__uipx-reset'), listenerName: 'click', fn: resetPositionFn },
		// canvas 的尺寸是否使用原图的
		{ ele: $('#__uipx-size-check'), listenerName: 'click', fn: sizeCheckFn },
		// canvas 跟随页面滚动
		{ ele: $('#__uipx-follow-check'), listenerName: 'click', fn: followCheckFn },
		// canvas 反相
		{ ele: $('#__uipx-carp-check'), listenerName: 'click', fn: carpCheckFn },
		// 标尺
		{ ele: $('#__uipx-sg-check'), listenerName: 'click', fn: sgCheckFn },
		{ ele: $('#__uipx-click-through-check'), listenerName: 'click', fn: clickThroughFn },
		// 管理需要完全透明的颜色值
		{ ele: $('#__uipx-add-color-btn'), listenerName: 'click', fn: addOpacityColorFn },
		{ ele: $('#__uipx-color-list'), listenerName: 'click', fn: delOpacityColorFn },
		// canvas 位置微调
		{ ele: $('.__uipx-micro-content')[0], listenerName: 'click', fn: microActionFn },
	];

	const beforeFn = (item, e) => {
		if (item.ele !== inputFile) {
			if (!diffImg) {
				return toast('请选择对比的UI图');
			}
		}
		item.fn.call(item.ele, e);
	};
	// 遍历注册
	listenerList.forEach(item => {
		item.ele.addEventListener(item.listenerName, e => {
			beforeFn(item, e);
		});
	});
}

// #region listener
// 选择上传对比的 UI 图
function inputFileFn() {
	if (inputFile.files.length) {
		const file = inputFile.files[0];
		const reader = new FileReader();
		reader.onload = e => {
			diffImg = e.target.result;
			showPic();
		};
		reader.readAsDataURL(file);
	}
}
// canvas整体透明度调节
function cpiFn() {
	if (cpi.value < 0) {
		cpi.value = 0;
	} else if (cpi.value > 10) {
		cpi.value = 10;
	}
	handler({ name: VARS.opacityChangeName, data: cpi.value / 10 });
}
function cpiUpdate(step) {
	cpi.value = +cpi.value + step;
	cpiFn();
}
// canvas 滑动后位置恢复
function resetPositionFn() {
	handler({ name: VARS.canvasPResetName });
}
// canvas 的尺寸是否使用原图的
function sizeCheckFn() {
	this.classList.toggle(btnActiveClassName);
	isUseUISize = this.classList.contains(btnActiveClassName);
	imgHandle(VARS.sizeCheckName);
}
// canvas 跟随页面滚动
function followCheckFn() {
	this.classList.toggle(btnActiveClassName);
	handler({ name: VARS.followCheckName, data: this.classList.contains(btnActiveClassName) });
}
// canvas 反相
function carpCheckFn() {
	this.classList.toggle(btnActiveClassName);
	isColorReverse = !isColorReverse;
	imgHandle(VARS.carpCheckName);
}
// 标尺
function sgCheckFn() {
	this.classList.toggle(btnActiveClassName);
	handler({ name: VARS.staffGaugeName, data: this.classList.contains(btnActiveClassName) });
}
function clickThroughFn() {
	this.classList.toggle(btnActiveClassName);
	handler({ name: VARS.clickThroughName, data: this.classList.contains(btnActiveClassName) });
}
// 颜色选择
function pickColor(fn) {
	this.classList.toggle(btnActiveClassName);
	handler({ name: VARS.pickColorName, data: this.classList.contains(btnActiveClassName) }, fn);
}
// 管理需要完全透明的颜色值
function addOpacityColorFn() {
	colorList.appendChild(createColorItem());
}
function delOpacityColorFn(e) {
	// 删除一个颜色项
	if (e.target.classList.contains(delOpacityClassName)) {
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		saveInputColorList();
		imgHandle();
	}
}
// canvas 位置微调
function microActionFn(e) {
	const classList = e.target.classList;
	const data = {
		x: 0,
		y: 0,
	};
	if (classList.contains(microTopClassName)) {
		data.y = -1;
	} else if (classList.contains(microRightClassName)) {
		data.x = 1;
	} else if (classList.contains(microBottomClassName)) {
		data.y = 1;
	} else if (classList.contains(microLeftClassName)) {
		data.x = -1;
	}
	if (data.x || data.y) {
		handler({
			name: VARS.microActionName,
			data,
		});
	}
}
// #endregion

function initDomStatus() {
	// 初始化 opacity 透明度
	cpi.value = '10';
	initColorItem();
}

// 初始化透明色值
function initColorItem() {
	if (pluginOptions.opacityColorList) {
		opacityColorList = pluginOptions.opacityColorList;
		pluginOptions.opacityColorList.forEach(item => {
			colorList.appendChild(createColorItem(item));
		});
	}
}

// 改变 inputColorList，input元素 blur 事件触发
function inputColorChange(e) {
	const inputHandlers = [].every.call(e.parentNode.childNodes, item => {
		return item.tagName.toLowerCase() === 'input' ? item.value : true;
	});
	if (inputHandlers) {
		saveInputColorList();
	}
}

// 保存当前输入的需要进行完全透明处理的色值列表
async function saveInputColorList() {
	const newInputColorList = [].map.call($('.' + opacityClassName), item => {
		return [].reduce.call(
			item.querySelectorAll('input'),
			(t, c) => {
				return c.value ? t.concat(+c.value) : t;
			},
			[]
		);
	});
	if (JSON.stringify(newInputColorList) !== JSON.stringify(opacityColorList)) {
		opacityColorList = newInputColorList;
		imgHandle();
	}
}

// 创建 li.colorItem
function createColorItem(rgbArr = null) {
	let colorItem = document.createElement('li');
	colorItem.className = opacityClassName;
	let itemInput = document.createElement('input');
	itemInput.type = 'number';
	let delColorBtn = document.createElement('button');
	delColorBtn.className = `__uipx-btn-default ${delOpacityClassName}`;
	delColorBtn.textContent = 'Delete';
	let pickColorBtn = document.createElement('button');
	pickColorBtn.className = `__uipx-btn ${pickColorClassName}`;
	pickColorBtn.textContent = 'pick';
	['r', 'g', 'b'].forEach((name, index) => {
		itemInput = itemInput.cloneNode(true);
		itemInput.name = name;
		itemInput.placeholder = name;
		if (rgbArr) {
			itemInput.value = rgbArr[index];
		}
		itemInput.addEventListener('blur', function() {
			inputColorChange(this);
		});
		colorItem.appendChild(itemInput);
	});

	pickColorBtn.addEventListener('click', function() {
		pickColor.call(this, color => {
			let [r, g, b, a] = color;
			let inputs = colorItem.querySelectorAll('input');
			inputs[0].value = r;
			inputs[1].value = g;
			inputs[2].value = b;
			inputColorChange(this);
		});
	});
	colorItem.appendChild(delColorBtn);
	colorItem.appendChild(pickColorBtn);
	return colorItem;
}

// 处理对比的 UI图片
async function imgHandle(name = VARS.imgBase64Name) {
	handler({
		name,
		data: {
			base64: diffImg,
			opacityColorList,
			isColorReverse,
			isUseUISize,
		},
	});
}

// 显示当前进行对比的 UI图片
function showPic() {
	if (!diffImg) return;
	img.src = diffImg;
	img.style.display = 'inline-block';
	// 进行图像处理
	imgHandle();
}
