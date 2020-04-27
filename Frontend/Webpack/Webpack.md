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

## 管理输出
  --1.调整项目
	 首先：在 /src 下添加 print.js 并添加一些逻辑,然后在 
	 src/index.js 文件中使用这个函数。
	 
	 其次：更新 dist/index.html 文件，来为 webpack 分离入口做好
	 准备。
	 
	 然后：在webpack.config.js文件下分离入口配置。
	 在 entry 添加 src/print.js 作为新的入口起点（print），然后
	 修改 output，以便根据入口起点名称动态生成 bundle 名称。
	 
	 最后：执行 npm run build。
	 
	--2.设定HtmlWebpackPlugin
	 如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的
	 名称，会发生什么？生成的包将被重命名在一个构建中，但是我们
	 的index.html文件仍然会引用旧的名字。我们用 
	 HtmlWebpackPlugin 来解决这个问题。
	 
	 首先:安装插件，并且调整 webpack.config.js 文件：
	 npm install --save-dev html-webpack-plugin
	 
	 最后：执行 npm run build。
	 
	--3.清理 /dist 文件夹
	 clean-webpack-plugin插件每次构建前清理 /dist 文件夹。
	 
	 首先：安装插件，并且调整 webpack.config.js 文件：
	 npm install --save-dev clear-webpack-plugin
	 
	 最后：执行 npm run build,再检查 /dist 文件夹,应该不会再看
	 到旧的文件，只有构建后生成的文件！
	 
	--4.Manifest
	 通过 manifest,webpack 能够对「你的模块映射到输出 bundle 的
	 过程保持追踪即知道”应该哪些文件生成。可以仔细深入阅读 
	 manifest 的概念页面，以及通过缓存指南来弄清如何与长期缓存相
	 关联。
	 
## 开发

### 使用 source map
 -为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。
 --使用 inline-source-map 选项，只用于开发环境。
  首先，在 webpack.config.js 中添加 devtool: 'inline-source-map';
	然后， 在 print.js 文件中生成一个错误；
	最后：执行 npm run build。
	
### 选择一个开发工具
 -webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
 --1、webpack's Watch Mode
 --2、webpack-dev-server
 --3、webpack-dev-middleware
#### 使用观察模式
 -首先添加一个用于启动 webpack 的观察模式的 npm script 脚本，在 package.json 下的对象
	scripts 中 添加 "watch": "webpack --watch"
 -然后,执行 npm run watch;
 -最后，测试。先移除之前引入的错误，保存文件并检查终端窗口，可以看到 webpack 自动重新编译修改后的模块！
 备注：
  唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。
#### 使用 webpack-dev-server
 -webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。让我们设置以下：
 --首先，安装 npm install --save-dev webpack-dev-server
 --其次, 修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：
  在 webpack.config.js 下的 module 中添加 devServer: {contentBase: './dist'},
	以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
 --然后，添加一个 script 脚本，可以直接运行开发服务器(dev server)：
 在 webpack.config.js 下的 scripts 对象中添加 "start":"webpack-dev-server --open",
 --最后，运行 npm start。
#### 使用 webpack-dev-middleware
 -webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在
 内部使用了它，同时，它也可以作为一个单独的包来使用.接下来是一个 webpack-dev-middleware 配合 express server 的示例。
 --首先，安装 express 和 webpack-dev-middleware：
  npm install --save-dev express webpack-dev-middleware
 --然后，对 webpack 的配置文件做一些调整，以确保中间件(middleware)功能能够正确启用：
  1、在 webpack.config.js 下的 output对象中添加 publicPath: '/';
	 publicPath 也会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问，我们稍后再设置端口号。
	2、设置我们自定义的 express 服务：在文件目录下添加 server.js;
	3、添加一个 npm script，以使我们更方便地运行服务: "server": "node server.js"
 --最后，在终端执行 npm run server。
#### 调整编辑器
 -使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，可能会影响重新编译。
  要在一些常见的编辑器中禁用此功能，请查看以下列表：
 --1、Sublime Text 3 - 在用户首选项(user preferences)中添加 atomic_save: "false"。
 --2、IntelliJ - 在首选项(preferences)中使用搜索，查找到 "safe write" 并且禁用它。
 --3、Vim - 在设置(settings)中增加 :set backupcopy=yes。
 --4、WebStorm - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 Use "safe write"

## 模块热替换
 -模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模
 块，而无需进行完全刷新
### 启用HRM
####  1、使用 webpack 内置的 HMR 插件
 -首先，更新 webpack-dev-server 的配置，删除 print.js 的入口起点。
  1、在webpack.config.js 中添加参数 const webpack = require('webpack');
	2、在模块的入口entry中，删除 app: './src/index.js', 和 print: './src/print.js'，
	 添加 app: './src/index.js'；
	3、在 devServer 中添加 hot: true;
	4、在 plugins 中添加 new webpack.NamedModulesPlugin() 与 new webpack.HotModuleReplacementPlugin()；
-其次，通过在命令行中运行 npm start 来启动并运行 dev server。
-然后，修改 index.js 文件，以便当 print.js 内部发生变更时可以告诉 webpack 接受更新的模块。
 在末尾添加：
  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      printMe();
    })
  }
 -最后，更改 print.js 中 console.log 的输出内容，你将会在浏览器中看到如下的输出。
#### 2、通过 Node.js API 
 -不是在 webpack.config.js 更改，而是添加个 dev-server.js,其他修改一样就能实现。
## 问题
  -为了让它与 HMR 正常工作，我们需要使用 module.hot.accept 更新绑定到新的 printMe 函数上：
## HMR 修改样式表
 -借助于 style-loader 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，
 此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签。
 --首先，使用以下命令安装两个 loader ：
 npm install --save-dev style-loader css-loader
 --其次，在 webpack.config.js 中更新 webpack 的配置，让这两个 loader 生效。
 --再来，在 src下 添加样式表；
 --然后，在 index.js 中引入，在启动npm start.
 --最后，修改样式表。
## 其他代码和框架
 -社区还有许多其他 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互……
 --React Hot Loader：实时调整 react 组件。
 --Vue Loader：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
 --Elm Hot Loader：支持用于 Elm 程序语言的 HMR。
 --Redux HMR：无需 loader 或插件！只需对 main store 文件进行简单的修改。
 --Angular HMR：No loader necessary! A simple change to your main NgModule file is 
 all that's required to have full control over the HMR APIs.没有必要使用 loader！只
 需对主要的 NgModule 文件进行简单的修改，由 HMR API 完全控制。