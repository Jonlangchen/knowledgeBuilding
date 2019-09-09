# CSS(Cascading Style Sheets--层叠样式表)
	--定义如何表现 HTML 和 XML等文件的样式.
	--存储在外部样式表中解决内容与表现分离的问题,极大的提高工作效率.
	--多个样式可层叠为一.
	--文件的扩展名是 .css .

## 层叠次序
	--当同一个 HTML 元素被不止一个样式定义时,所有样式会根据下面色规则层叠于一个新的虚拟样式表中,其中以4优先权最高,以1的优先权最低.
	1、浏览器自带样式,
	2、外部样式表,
	3、内部样式表(位于<head> 标签内部),
	4、内联样式(位于 HTML 元素内部).

## CSS 书写顺序
	--(1)位置属性 ==> position,top, right,z-index,display,float 等;
	--(2)大小 ==> width,height,padding,margin;
	--(3)文字系列 ==> font,line-height,letter-spacing,color,text-align 等;
	--(4)背景 ==> background,border 等;
	--(5)其他 ==> animation, transition 等.

## 分类的命名方法
	--使用单个字母 + "-"为前缀.
	 (1) 布局(grid) ==> .g-;
	 (2) 模块(module) ==> .m-;
	 (3) 元件(unit) ==> .u-;
	 (4) 功能(function) ==> .f-;
	 (5) 皮肤(skin) ==> .s-;
	 (6) 状态 ==> .z-;