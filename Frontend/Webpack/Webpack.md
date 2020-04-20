# Webpack
 --概念
  本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器
 (module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系
 图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块
 打包成一个或多个 bundle。
 
 --安装文件方式
  *npm install --save 安装一个安装包要打包到生产环境
	**npm install --save-dev 安装一个用于开发环境的安装包（例如，
	linter, 测试库等）

## 基本构建过程 (start)
 --1.创建文件夹，并进入文件夹中；
  mkdir 文件名 && cd 文件名
	
 --2.初始化 npm;
  npm init -y
	
 --3.在本地安装 webpack,接着安装 webpack-cli;
  npm install webpack webpack-cli --save-dev
 
 --4.创建以下目录结构、文件和内容：
  project
	文件名
	|-package.json
 +|-index.html
 +|-/src
 +  |-index.js
 
  package.json
 {
	+ "private": true, // 打开私有设置，以便确保我们安装包是私有的(private)
	- "main": 'index.js' // 移除 main 入口
 }
 
 备注：
  使用上述方式去管理 JavaScript 项目会有一些问题：
   *无法立即体现，脚本的执行依赖于外部扩展库(external library)。
   **如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
   ***如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。
	
	--5.开始使用 webpack 来管理这些脚本。创建一个 bundle 文件
	 首先，调整目录结构。将“源”代码(/src)从我们的“分发”代码(/dist)中
	 分离出来。
	 |“源”代码是用于书写和编辑的代码。
	 |“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录。
	 project
	 文件名
	 	|-package.json
	 -|-index.html
	 +|-/dist
	 +  |-index.html
	 
	 其次：在本地安装打包 lodash 依赖；
	  npm install --save-dev lodash
	 
	 然后：更改 src/index.js && dist/index.html 中的代码；
	 
	 最后，执行 npx webpack，会将我们的脚本作为入口起点，然后 输出 
	 为 main.js
	
	备注：webpack 不会更改代码中除 import 和 export 语句以外的部
	分。如果你在使用其它 ES2015 特性，请确保你在 webpack 的 
	loader 系统中使用了一个像是 Babel 或 Bublé 的转译器。

  --6.使用配置文件
	 首先，创建一个取代以上使用 CLI 选项方式的配置文件。
	 project
	 文件名
	 	|-package.json
	 +|-webpack.config.js
	 
	 最后，通过新配置文件再次执行构建。
	 npx webpack --config webpack.config.js
	
	备注：
	 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。
	
	--7. NPM 脚本(NPM Scripts)
	 首先，用 CLI 这种方式来运行本地的 webpack 不是特别方便，我们可以设
	 置一个快捷方式。在 package.json 添加一个 npm 脚本
	 (npm script).
	 "build": "webpack"
	 
	 最后：npm run build.
	备注：
	 通过向 npm run build 命令和你的参数之间添加两个中横线，可以
	 将自定义参数传递给 webpack，例如：npm run build -- --colors。

## 管理资源（asset Management）
 --webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 
 loader 引入任何其他类型的文件。也就是说，以上列出的那些 
 JavaScript 的优点（例如显式依赖），同样可以用来构建网站或 
 web 应用程序中的所有非 JavaScript 内容.CSS的设置过程。
 
 --1.加载 CSS
  首先：为了从 JavaScript 模块中 import 一个 CSS 文件，你需要
	在 module 配置中 安装并添加 style-loader 和 css-loader：
	npm install --save-dev style-loader css-loader
  
	其次：在webpack.config.js 中添加 module。
	webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给
	指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被
	提供给 style-loader 和 css-loader。
	
	然后：通过在项目中添加一个新的 style.css 文件，并将其导入到我
	们的 index.js 中。
	
	最后：运行构建命令：npm run build
	
	--2.加载图片
	 首先：使用 file-loader，我们可以轻松地将这些内容混合到 CSS 
	 中：npm install --save-dev file-loader
	 
	 其次：在webpack.config.js 中的 module 下添加 规则。
	 css-loader 处理CSS 中的 url('./my-image.png')；
	 html-loader 处理 <img src="./my-image.png" />.
	 
	 然后：在、src下添加图片，导入到 src/index.js 与 src/style.css
	 
	 最后：重新构建npm run build，并再次打开 index.html 文件.
	 
	--3.加载字体
	 首先，在webpack.config.js 中的 module 下添加 规则。
	 
	 然后：在项目/src中添加一些字体文件，过一个 @font-face 声明引
	 入到src/style.css
	 
	 最后：重新构建npm run build，并再次打开 index.html 文件.
	
	--4.加载数据。
	 可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。
	 要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。
	 
	 首先，在webpack.config.js 中的 module 下添加 规则。
	 npm install --save-dev csv-loader xml-loader
	 
	 其次：给项目添加一些数据文件
	 
	 然后：import 这四种类型的数据(JSON, CSV, TSV, XML)中的任何
	 一种到 src/index.js，所导入的 Data 变量将包含可直接使用的已
	 解析 JSON。
	 
	 最后：重新构建npm run build，并再次打开 index.html 文件.