# Ruby
## Installation
	--在第二步选择保存盘以及勾选 Add Ruby executables to your PATH.
	--安装完成后需测试安装有没有成功,运行CMD输入以下命令：ruby -v
	如安装成功会打印:ruby 2.2.2p95 (2018-03-28 revision 63013) [x64-mingw32].

## 更换 gem 源(换国内 gem 稳定)
	--1.删除原gem源: gem sources --remove https://rubygems.org/;
	--2.添加国内淘宝源: gem sources -a https://gems.ruby-china.com(最新 gem);
	--3.打印是否替换成功: gem sources -l;
	--4.更换成功后打印如下:
	 *** CURRENT SOURCES ***
	 https://ruby.taobao.org/

## 安装基于Ruby的软件
	--要安装最新版本的 Sass 和 Compass，需要输入下面的命令:
	 gem install sass
	 gem install compass
	--查看安装成功的命令:
	 sass -v
	 compass -v