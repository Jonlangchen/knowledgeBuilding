# NodeJS
	--Node.js 是一个在服务器端可以解析和执行 JavaScript 代码的运行环境,也可以说是一个运行时平台.
	--特点:
	 (1)它是一个 JavaScript 运行环境,
	 (2)依赖于 Chrome V8 引擎进行代码解析,
	 (3)事件驱动,
	 (4)非阻塞 I/O,
	 (5)轻量、可伸缩,
	 (6)单进程、单线程.
## 模块化思想
	--模块化是一种设计思想,利用模块化可以把一个非常复杂的系统结构细化到具体的功能点,每个功能点看作一个模块,然后通过某种
	 规则把这些小的模块组合到一起,构成模块化系统.
### 模块化特点
	--从程序开发角度,模块化是一种开发模式,也有两个特点:
	 (1)开发效率高: 方便代码重用,对于别人开发好的模块功能可以直接拿过来使用,不需要重复开发类似的功能; 
	 (2)维护成本低: 软件开发周期中,由于需求经常发生变化,最长的阶段并不是开发阶段,而是维护阶段,使用模块化开发的方式更容
	易维护.
### 模块化开发
	--模块化解决开发过程中的问题:
	 (1)命名冲突
	  --全局函数编程方式.无法保证全局变量不与其他模块的变量冲突,另外全局函数形式的模块成员之间看不出练习.
	  --对象命名空间.理论上减少了命名冲突的问题,但命名冲突还是存在,这种方式是内部成员的状态可随意被外部改写,不安全.
	  --子命名空间.导致命名空间越来越长,代码可读性插.
	  --函数的作用域(闭包).通过匿名自执行函数,进行私有变量隔离.维护扩展不方便.
	  --闭包传参.利于维护和扩展.
	 (2)文件依赖
	  在模块化开发中,会使用 JavaScript 代码来加载所需要的文件,并不需要将所有的文件引入到 HTML 文件中.

## JavaScript 在客户端和服务器端的区别
	--在客户端, JavaScript 需要依赖浏览器提供的 JavaScript 引擎解析执行.常见的应用场景如用户交互、动画特效、表单验证、
	 发送 Ajax 等.(处理页面的交互)
	--在服务器端, JavaScript 不依赖浏览器,而是由特定的运行环境提供的 JavaScript 引擎解析执行,如 Node.js.如操作数据库、
	 操作文件等,接收请求和做出响应的操作.(处理数据的交互)

## 安装 Node.js
	--设置安装路径，其余默认就行.
	--测试是否安装成功:
	 (1)按 Win + R 组合键,打开运行对话框,输入 cmd,单击"确定"或按 Enter 键,打开 CMD 命令台界面.
	 (2)在 CMD 命令台,输入"node -v",输出版本号表示安装成功.

## 通过 node 命令解析和执行一个 .js 脚本文件的步骤如下
	--(1)根据 node 命令指令的文件名称,读取 .js 脚本文件,
	--(2)解析和执行 JavaScript,
	--(3)将执行后的结果输出到终端中.

## REPL 运行环境
	--方便测试 JavaScript 代码的可交互运行环境.
	--在 CMD 命令台,输入"node"进入 REPL 环境.
### 常用命令
	--终止当前命令 Ctrl + C
	--终止 Node REPL Ctrl + C + C
	--终止 Node REPL Ctrl + D
	--查看命令历史记录和修改以前命令 Up/Down
	--当前指令的列表 Tab
	--显示所有命令的列表 .help
	--退出多行表达式 .break
	--从多行表达退出 .clear
	--当前 Node REPL 会话保存到文件中 .save filename
	--加载文件的内容在当前 Node REPL 会话 .load filename

## 模块系统
	--要在一个文件模块中获取其他文件模块的内容,首先需要使用 require() 函数加载这个模块,在被加载的模块中使用 export 
	 或者 module.exports 对象向外开放变量、函数等.require() 函数的作用是加载文件并获取该文件中的 module.exports
	 对象接口.
	*模块公开的接口 exports
	*用于从外部获取一个模块的接口,即获取模块的 exports 对象 require()
	
## 全局可用变量、函数和对象
	--_dirname: 表示当前文件所在的目录.
	--_filename: 表示当前正在执行的脚本的文件名.

## require() 的模块加载规则
	--在使用 Node.js 开发过程中,需要加载的模块主要分为两大类: 文件模块和核心模块.
### 文件模块
	--使用 require() 函数加载文件模块时,需要使用两种模块标识:
	 (1)以"/"开头的模块标识,指向当前文件所属盘符的跟路径.
	 (2)以"./"或"../"开头的相对路径模块标识.
	--加载文件模块的语法如下: require('路径.扩展名')扩展名可省略,Node.js 会尝试为文件名添加'.js'、'.json'、'.node'
	 进行查找.

### 核心模块
	--核心模块可以看作是 Node.js 的心脏,它由一些精简而高效的库组成,为 Node.js 提供了基本的 API.主要内容包括:
	 (1)全局对象,
	 (2)常用工具,
	 (3)事件机制,
	 (4)文件系统访问,
	 (5)HTTP 服务器与客户端.
	--核心模块标识是唯一的,并且不以"./"或"../"或"/"开头,使用 require() 加载核心模块的语法如下: require('模块标识').
	
## 模块缓存
	--在模块加载过程中,对于多次使用同一模块标识加载模块的情况, Node.js 只会加载一次,这是由于第一次加载某个模块时,
	 Node.js 会缓存该模块,再次加载时将从缓存中获取.所有魂村模块保存在 require.cache 中,可以手动删除模块缓存.
	--在实际开发中有些时候不希望加载的模块缓存,可以进行删除缓存操作:
	 delete require.cache[module.filename];

## 回调函数
	--在回调函数的设计中有 3 个约定,具体如下:
	 (1)函数名通常为callback,在封装异步执行代码时,优先把 callback 作为函数的最后一个参数出现,语法如下所示:
	  function 函数名 (arg1, arg2, callback) {}
	 (2)把代码中出现的错误作为 callback 回调函数的第一个参数进行传递,语法如下:
	  callback(err,  result);
	 (3)把真正返回的结果数据,传递给 callback 回调函数的第二个参数,语法如下:
	  callback(err,  result);