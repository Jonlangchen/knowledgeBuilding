# npm 与包管理
## package.json 常用字段
	--Name: 项目的名字.
	--Version: 项目的版本号.
	 1、version: 完全匹配.
	 2、>version: 大于这个版本.
	 3、>=version: 大于或等于这个版本.
	 4、~version: 非常接近这个版本.
	 5、^version: 与当前版本兼容.
	 6、1.2x: 符合 1.2X 的版本,x 代表任意数字.
	 7、* 或者"": 任何版本都可以.
	 8、version1 - version2: 版本在 version1 与 version2 之间(包括 version1 和 version2).
	--scripts: 项目不同阶段的命令.
	--dependencies: 项目依赖的第三方模块, 格式为 name:version.

## npm 命令
	--直接下载 GitHub 上的最新代码: npm install felixge/node-formidable
	--打包依赖(用来解决第三方模块的版本依赖问题): npm shrinkwrap
	--安装 shrinkwrap : npm install -g shrinkwrap
	
## 依赖版本的管理
	--指定依赖包的版本(为了避免包升级引入新的 bug 或者兼容性问题)
	--还有就是将 node_modules 文件夹提交到代码库(体积大)
	--使用 npm shrinkwrap 命令来打包依赖.
	 1、安装 npm install -g shrinkwrap,
	 2、在当前目录下运行 npm shrinkwrap,生成 npm-shrinkwrap.json 文件,(npm-shrinkwrap.json 中可修改 "resolved"中
	的文件路径),
	 3、在项目根目录下运行 shrinkpack,将所有的模块都会以压缩包的形式下载到根目录中名为 node_shrinkpack 的目录下,再用
	npm install 安装依赖,就会直接从 node_shrinkpack 中解压而不是通过 HTTP 下载.