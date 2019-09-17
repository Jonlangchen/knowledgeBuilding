# NVM(Node多版本管理)
## 下载
	--下载地址: https://github.com/coreybutler/nvm-windows/releases
	--推荐下载: nvm-setup.zip：windows安装包,.不需要配置直接使用.

## 安装
	--注意点:
	 (1)安装nvm之前先卸载之前的node版本;
	 (2)安装nvm途中,设置node路径地址时,路径不能包含空格;
	 (3)安装成功后,执行命令窗口的时候,使用管理员身份,进行命令输入与执行,才能保证nvm的顺利使用.
	
	--开始安装
	 (1)直接解压安装包,点击 nvm-setup.exe 安装;
	 (2)选择安装文件位置,其余默认安装;
	 (3)安装好修改 nvm 文件夹下的 setting.txt,将下面内容添加至原内容最后;
	  root: F:\myTool\NVM\nvm
	  path: F:\myTool\NVM\nodejs
	  arch: 64
	  node_mirror: https://npm.taobao.org/mirrors/node/
	  npm_mirror: https://npm.taobao.org/mirrors/npm/
	 (4)npm install 版本号安装;
	 (5)在 NVM 文件夹下创建空目录 nodejs 文件夹,然后修改环境变量;
	 (6)配置环境变量(可通过 window+r —> sysdm.cpl —> 高级 —>环境变量)
		NVM_HOME=F:\myTool\NVM\nvm所在目录
	  NVM_SYMLINK=F:\myTool\NVM\nodejs 快捷方式所在的目录
	  PATH += %NVM_HOME%;%NVM_SYMLINK%;
	 (7)配置完成要重启计算机,让配置生效.
		在 CDM 窗口输入 nvm list 会显示: * <version> (Currently using 64-bit executable);表示版本控制安装成功.
	 
## nvm 命令
	--安装版本号(可以是node.js版本或最新稳定版本lates): nvm install <version>
	--设置使用版本号: nvm use xxx
	--所有的node版本号: nvm list \ nvm ls
	--nvm设置默认node版本号: nvm alias default v4.2.4
	--启用node.js版本管理: nvm on
	--禁用node.js版本管理(不卸载任何东西): nvm off
	--卸载指定版本的nodejs: nvm uninstall <version>
	--设置 nvm 存储node.js不同版本的目录 ,如果未设置，将使用当前目录: nvm root [path]
	--显示当前运行的nvm版本: nvm -v
	--设置node镜像,默认为https://nodejs.org/dist/.。可以设置为淘宝的镜像https://npm.taobao.org/mirrors/node/
	 nvm node_mirror [url]
	--设置npm镜像,默认为https://github.com/npm/npm/archive/。可以设置为淘宝的镜像https://npm.taobao.org/mirrors/npm/
	 nvm npm_mirror [url]