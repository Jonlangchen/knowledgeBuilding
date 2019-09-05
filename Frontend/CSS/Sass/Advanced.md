# Sass Advanced
## Sass 常用命令
	--更新 sass ==> gem update sass
	--查看 sass 版本 ==> sass -v
	--查看 sass 帮助 ==> sass -h

## 命令行编译
	--单文件转换命令 ==> sass style.scss style.css
	--单文件监听命令 ==> sass --watch style.scss:style.css
	--如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录 ==> sass --watch app/sass:public/stylesheets

## 命令行编译配置选项
	--编译格式 ==> sass --watch input.scss:output.css --style compact
	--编译添加调试 map ==> sass --watch input.scss:output.css --sourcemap
	--选择编译格式并添加调试 map ==> sass --watch input.scss:output.css --style expanded --sourcemap
	--开启 debug 信息 ==> sass --watch input.scss:output.css --debug-info
	 *--style表示解析后的css是什么排版格式;sass内置有四种编译格式:nested``expanded(正常)``compact(压缩)``compressed.
	 *--sourcemap表示开启sourcemap调试。开启sourcemap调试后，会生成一个后缀名为.css.map文件.