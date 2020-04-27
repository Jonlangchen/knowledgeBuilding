# jQuery源码解读

## extends()方法
	--传入一个参数时,把该参数对象合并入jQuery实例,如$.extends({a:2}),会把该对象并入jQuery.
	--传入两个参数时,则会合并两个参数,并返回,如$.extends({a:2},{b:3})会返回一个对象{a:2,b:3}.
	function extends() {
		var target = arguments[0];
		var i = 1; // i的作用在于指定要被拷贝的对象是第几个
		if (arguments.length > 1 ) {
			
		} else {
			target = this; // 这里的 this 是代表 jq 类,如果只有一个参数,就把 target 指向 jq 类.
			i = 0; // 如果只有一个参数,那么 i 指向第一个参数.
		}
		var options = arguments[i]; // 通过 i 拿出要被拷贝的对象
		for (var item in options) { // for in 循环进行拷贝
			target[item] = options[item]; // 不用管几个参数,只管把 options 拷贝到 target 里,这样就不用写两段拷贝操作
		}
	}
### 这里其实是一个享元模式,即把私有的方法,数据做为一个可变的享元.
	--对于jq而言,target是复制目标时私有的,而复制操作的操作是公共的,把可变的target独立出来.而留下一个公共的拷贝操作,这样有
	效的减少了重复代码,而且如果要加入深拷贝,就不用去改两部分了.

## jq的$(function(){})与window.onload的区别
 -jq的$(function(){})也就是$(document).ready(function(){})的简写.
 -两点不同： 
 --1.$(function(){})不会被覆盖，而window.onload会被覆盖，$(function(){})不会被覆盖的原因是将其放入到
 了一个队列中，在对应时机一次出队。 
 --2. $(function(){})在window.onload执行前执行的，$(function(){})类似于原生js中的DOMContentLoaded事
 件，在DOM加载完毕后，页面全部内容（如图片等）完全加载完毕前被执行。而window.onload会在页面资源全部加
 载完毕后才会执行。
### DOM文档加载步骤： 
 -1.解析HTML结构, 
 -2.加载外部的脚本和样式文件,
 -3.解析并执行脚本代码, 
 -4.执行$(function(){})内对应代码, 
 -5.加载图片等二进制资源, 
 -6.页面加载完毕，执行window.onload.