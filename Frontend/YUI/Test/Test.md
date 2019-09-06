# YUI Test
	--YUI Test是基于浏览器的JavaScript解决方案的测试框架.使用YUI Test,您可以轻松地将单元测试添加到JavaScript解决方案中.
	--YUI 测试功能:
	 1、通过简单的语法快速创建测试用例;
	 2、针对抛出错误的方法的高级故障检测;
	 3、使用测试套件对相关测试用例进行分组;
	 4、Mock对象用于编写没有外部依赖性的测试;
	 5、用于测试事件和Ajax通信的异步测试;
	 6、所有A级浏览器中的DOM事件模拟(通过Event);

## 入门
	--首先要加载 Test 及其依赖项的源文件,在 HTML 页面引入如下代码:
	 <script src = “http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js” > </ script> 
	--然后,为应用程序创建一个新的 YUI 实例.
	 <script>
		YUI().use("test", function() { // test 为指定加载的模块
			//测试代码
		})
	 </script>