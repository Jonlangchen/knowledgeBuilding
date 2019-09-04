# Sass(Syntactically Awesome StyleSheets)
	--世界上最成熟、最稳定、最强大的专业级CSS扩展语言.
	--Sass中文网上有文档
	
## 特色功能
	--强化 CSS 的辅助工具,
	--完全兼容 CSS3,
	--在 CSS 基础上增加变量(variables)、嵌套(nesting)、混合(mixins)、
	 导入(inline imports)等功能,
	--通过函数进行颜色值与属性值的运算,
	--提供控制指令 (control directives)等高级功能,
	--自定义输出格式.
	
## 语法格式
	--文件扩展名: .scss(主要使用这种)、.sass.
	--任何一种格式可以直接 导入 (@import) 到另一种格式中使用.
	--通过 sass-convert 命令行工具格式可以相互转换.
		1、Convent Sass to Scss
		--sass-convert style.sass style.scss
		2、Convent Scss to Sass
		--sass-convert style.scss style.sass
		
### 使用变量
	--sass 使用 $ 符号来标识变量.
	--将反复使用的 css 属性值定义成变量,然后通过变量名来引用.
#### 变量声明
	--变量定义在 css 规则块之外,全局使用.
	--变量定义在 css 规则块之内,只能此规则块使用,规则块外再定义相同变量不影响
#### 变量使用
	--通过粒度区分，变量值也可以引用其他变量.
#### 变量名用中划线还是下划线分隔
	--两者都能使用,定义变量与引用变量中,使用不同也不影响编译,默认是同一值.

### 嵌套CSS规则
	--一个给定的规则块,既能包含属性,也能包含后代规则块。
#### 父选择器的标识符 &
	--添加伪类时,& 放在伪类前面,然后放在父选择器规则块内,就能正确编译.
	--可以在父选择器之前添加选择器: & 放在类后面,然后放在父选择器规则块内,就能
	正确编译.