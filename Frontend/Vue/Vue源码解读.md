# Vue 源码解读
## 在 npm run dev 之后, Vue 都做了哪些工作?
	// 定义 Vue 构造函数
	function Vue (options) {
		if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
			warn('Vue is a constructor and should be called with the `new` keyword')
		}
		this._init(options)
	}
	// 将 Vue 作为参数传递五个方法初始化方法
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	renderMixin(Vue);
	// 导出
	export default Vue
	
	--Vue类里面其实就是调用了一个_init方法,这一段代码调用了五个方法,并传入了Vue类.
### initMixin
	--它的作用是给vue的原型链里加入Vue类里调用的_init方法
### stateMixin
	--就是往Vue的原型里注入了$data,$props属性,以及$set、$delete 以及 $watch方法.
### eventsMixin
	--就是往vue原型链里注入了事件的监听与触发,即我们常用的$emit、$on.
### lifecycleMixin
	--就是注入了一些生命周期函数.
### renderMixin
	--就和后面的具体编译有关.
