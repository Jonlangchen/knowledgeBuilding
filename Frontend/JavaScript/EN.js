(function () {
	// 注册命名空间 "EN(EMCA JavaScript Native)" 到 window对象上
	window["EN"] = {};
	
	// 注册 load(加载) 类命名空间到 EN 对象上, 并赋值给 _ENL 对象
	var _ENL = window["EN"]["load"] = {};
	
	// 把 addOnload 函数注册到 load 对象上
	_ENL["addOnload"] = addOnload;
	// 重复加载，不会冲突覆盖
	function addOnload(newFun) {
		var oldFun = window.onload; //存储已经设置的 window.onload
		if (typeof oldFun == "function") { //检查 oldOnload 变量的类型是不是函数
			window.onload = function() {
				if (oldFun) { // 存在值
					oldFun();  // 先调用旧事件
				}
				newFun();	// 再调用新事件
			}
		} else { // 未定义
			window.onload = newFun; // 就在页面完成加载时执行新函数
		}
	}
	
	// 注册 event 类命名空间到 EN 对象上, 并赋值给 _ENE 对象
	var _ENE = window["EN"]["event"] = {};
	
	// 把 getEvent 函数注册到 event 对象上
	_ENE["getEvent"] = getEvent; 
	
	// 获取事件对象
	function getEvent(event) {
		return event ? event : window.event;
	}
	
	// 把 getTarget 函数注册到 event 对象上
	// IE/Opera 支持 window.event
	// Firefox 支持 event
	_ENE["getTarget"] = getTarget; 
	
	// 捕获当前触发事件的元素
	// Firefox 支持 event.target
	// IE 支持 event.srcElement
	function getTarget(event) {
		return event.target || event.srcElement;
	}
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENE["preventDefault"] = preventDefault; 
	
	// 此方法可以阻止事件的默认动作
	function preventDefault(event) {
		if (event && event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false; // 兼容IE浏览器
		}
	}
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENE["stopPropagation"] = stopPropagation; 
	
	// 此方法可以阻止事件冒泡现象
	function stopPropagation(event) {
		if (event && event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true; // 兼容IE浏览器
		}
	}
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENE["addHandler"] = addHandler;
	
	// 添加事件监听函数的方法
	// element: 要绑定事件的对象即HTML节点。
	// type: 事件名称，注意去掉事件前边的“on”。
	// callback: 要绑定的事件监听函数，注意只写函数名，不要带括号。
	function addHandler(element, type, callback){
		if (element.addEventListener){ //对于支持DOM2级事件处理程序addEventListener方法的浏览器
			element.addEventListener(type, callback, false);
		} else if (element.attachEvent){ //对于不支持addEventListener方法但支持attachEvent方法的浏览器
			element.attachEvent("on" + type, callback);
		} else { //对于不支持addEventListener方法也不支持attachEvent方法，但支持on+"事件名"的浏览器
			element["on" + type] = callback;
		}
	}
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENE["removeHandler"] = removeHandler;
	
	// 移除事件监听函数的方法
	// element: 要移除事件的对象即HTML节点。
	// type: 事件名称，注意去掉事件前边的“on”。
	// callback: 要移除的事件监听函数，注意只写函数名，不要带括号。
	function removeHandler(element, type, callback){
		if (element.removeEventListener){
			element.removeEventListener(type, callback, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, callback);
		} else {
			element["on" + type] = null;
		}
	}
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENE["getCode"] = getCode;
	
	// 兼容取得字符编码
	function getCode(event) {
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	}
	
	// 注册 clipboard 类命名空间到 EN 对象上, 并赋值给 _ENC 对象
	var _ENC = window["EN"]["clipboard"] = {};
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENC["getText"] = getText;
	
	// 获取剪切板内容
	function getText(event) {
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	}
	
	// 把 preventDefault 函数注册到 event 对象上
	_ENC["setText"] = setText;
	
	// 设置剪切板内容
	function setText(event, value) {
		if (event.clipboardData) {
			return event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData) {
			return window.clipboardData.setData("text", value);
		}
	}
})();