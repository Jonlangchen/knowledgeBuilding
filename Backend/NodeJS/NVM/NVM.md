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
	  node_mirror: https://npm.taobao.org/mirrors/node/
	  npm_mirror: https://npm.taobao.org/mirrors/npm/
	 (4)npm install 版本号安装;
	 
## nvm 命令
	--安装版本号: nvm install xxx
	--设置使用版本号: nvm use xxx
	--所有的node版本号: nvm list
	--nvm设置默认node版本号: nvm alias default v4.2.4