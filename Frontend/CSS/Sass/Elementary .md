# Sass(Syntactically Awesome StyleSheets)
	--世界上最成熟、最稳定、最强大的专业级CSS扩展语言.(Sass中文网上有文档)
	
## 特色功能
	--强化 CSS 的辅助工具,
	--完全兼容 CSS3,
	--在 CSS 基础上增加变量(variables)、嵌套(nesting)、混合(mixins)、导入(inline imports)等功能,
	--通过函数进行颜色值与属性值的运算,
	--提供控制指令 (control directives)等高级功能,
	--自定义输出格式.
	
## 如何使用
	--通过命令行工具使用
	 1、打开cmd;
	 2、通过..或cd（跨盘用D:/F:）即后退或前进操作，找到项目所在位置;
	 3、监视单个 Sass 文件，每次修改并保存时自动编译:
		sass --watch style.scss:style.css --style expanded --sourcemap
	--通过编译器使用：Koala编译器
	 1、打开编译器;
	 2、添加项目;
	 3、点击要编译的文件，执行编译。。OK.
	
## 语法格式
	--文件扩展名: .scss(主要使用这种)与 .sass .
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
	--变量定义在 css 规则块之内,只能此规则块使用,规则块外再定义相同变量不影响.
#### 变量使用
	--通过粒度区分，变量值也可以引用其他变量.
#### 变量名用中划线还是下划线分隔
	--两者都能使用,定义变量与引用变量中,使用不同也不影响编译,默认是同一值.
##### 示例
	$highlight-color: #F90; //在 css 规则块之外,变量声明
	$highlight_border: 1px solid $highlight_color; //变量值也可以引用其他变量
	.demo {
		$width: 100px; //在 css 规则块之内,变量声明
		width: $width;
		color: $highlight-color;
		border: $highlight-border; //中划线与下划线混用
	}
	
	==> 编译后:
	
	.demo {
		width: 100px;
		color: #F90;
		border: 1px solid #F90;
	}

### 嵌套CSS规则
	--一个给定的规则块,既能包含属性,也能包含后代规则块.
#### 父选择器的标识符 &
	--添加伪类时,& 放在伪类前面,然后放在父选择器规则块内,就能正确编译.
	--可以在父选择器之前添加选择器: & 放在类后面,然后放在父选择器规则块内,就能正确编译.
#### 群组选择器的嵌套
	--可分为内嵌多重或外嵌多重.
#### 子组合选择器和同层组合选择器: > 与 + 与 ~
	--可以把它们放在外层选择器后边,或里层选择器前边.
#### 嵌套属性
	--嵌套属性的规则是这样的: 把属性名从中划线-的地方断开,在根属性后边添加一个冒号:,紧跟一个{ }块,把子属性部分写在这个
	 { }块中.
	--对于属性的缩写形式,在属性后添加{},里面指明例外规则.
##### 示例
	.demo1 div { //包含后代规则块
		.demo2 { //既包含属性,也包含后代规则块
			border: { //嵌套属性
			  style: solid;
			  width: 1px;
			  color: #ccc;
			}
			margin: 10px { //嵌套属性-缩写形式
				top: 0px;
			}
			h1 {
				color: #666;
				body.min & { color: green; } //父选择器标识符特殊使用
			}
		}
		.demo3 > { //子组合选择器 >
			~ h2 { color: #111; } //同层组合选择器 ~
			+ p { color: #222; } //同层组合选择器 +
		}
		&:hover { color: red; } //父选择器标识符普通使用
	}

	==> 编译后:
	
	.demo1 div .demo2 {
	  border-style: solid;
	  border-width: 1px;
	  border-color: #ccc;
	  margin: 10px;
	  margin-top: 0px;
	}
	.demo1 div .demo2 h1 {
	  color: #666; 
	}
	body.min .demo1 div .demo2 h1 {
	  color: green; 
	}
	.demo1 div .demo3 ~ h2 {
	  color: #111; 
	}
	.demo1 div .demo3 + p {
	  color: #222; 
	}
	.demo1 div .demo4 > span {
	  color: #333; 
	}
	.demo1 div:hover {
	  color: red; 
	}
	
### 导入 Sass 文件
	--使用sass的@import规则并不需要指明被导入文件的全名,可以省略.sass或.scss文件后缀.
#### 使用SASS部分文件
	--不会在编译时单独编译这个文件输出 css,而只把这个文件用作导入时称为 sass 局部文件, sass 局部文件的文件名以下划线开头,
	 导入时可省略文件名开头的下划线.
#### 默认变量值
	--一般情况下,反复声明一个变量,只有最后一处声明有效且它会覆盖前边的值.
	--变量带有!default,含义是: 如果这个变量被声明赋值了,那就用它声明的值(不管在哪),否则就用这个默认值.
#### 嵌套导入
	--sass 允许 @import 命令写在 css 规则内,被导入的局部文件中定义的所有变量和混合器,只在在这个规则范围内生效.
##### 示例
	--style.scss
	$demo-color: #111 !default; //默认变量值
	.demo {
		color: $demo-color; //取默认变量值
		p {
			$demo-color: #222;
			color: $demo-color; //取重新定义的变量值
		}
		div {@import "default"} //取默认变量值
	}
	--_default.scss //不生成 default.css
	p { color: $demo-color; }
	
	==> 编译后
	
	--style.css
	.demo {
	  color: #111; 
	}
	.demo p {
		color: #222; 
	}
	.demo div p {
		color: #111; 
	}

### 静默注释
	--//开头,注释内容直到行末即静默注释. 这种注释内容不会出现在生成的css文件中.
	--css 标准注释格式/* ... */的注释语法,正确放在属性值后则会被编译生成在 css 中,否则会被抹掉,不生成.
##### 示例
	如上所示,就不再展示.

### 混合器
	--可以通过sass的混合器实现大段样式的重用.
	--混合器使用@mixin标识符定义.
	--样式表中通过@include来使用这个混合器.
#### 何时使用混合器
	--判断一组属性是否应该组合成一个混合器,一条经验法则就是你能否为这个混合器想出一个好的名字,具有语义化含义.
#### 混合器中的CSS规则
	--混合器中不仅可以包含属性,也可以包含css规则,包含选择器和选择器中的属性.
	--混合器中的规则甚至可以使用sass的父选择器标识符&.
#### 给混合器传参
	--可以通过在@include混合器时给混合器传参,来定制混合器生成的精确样式,这种方式跟JavaScript的function很像.
	--sass 允许通过语法"$name: value"的形式指定每个参数的值,以忽略参数顺序.
#### 默认参数值
	--参数默认值使用"$name: default-value"的声明形式,默认值可以是任何有效的css属性值,甚至是其他参数的引用.
##### 示例
	@mixin rounded-corners($radius: 6px) { //包含选择器中的属性,给混合器传参,并传入默认参数值
	  -moz-border-radius: $radius;
	  -webkit-border-radius: $radius;
	  border-radius: $radius;
	}
	@mixin no-bullets { //包含选择器和选择器中的属性
	  list-style: none;
	  li {
	    list-style-image: none;
	    list-style-type: none;
	    margin-left: 0px;
			@include rounded-corners;
	  }
	}
	ul {
		@include no-bullets
	}
	
	==> 编译后:
	
	ul {
	  list-style: none; 
	}
	ul li {
		list-style-image: none;
		list-style-type: none;
		margin-left: 0px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px; 
	}

### 使用选择器继承来精简CSS
	--选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式.
	--这个通过@extend语法实现.
	--不仅会继承另一个选择器自身的所有样式,任何跟另一个选择器有关的组合选择器样式也会被该选择器以组合选择器的形式继承.
#### 何时使用继承
	--当一个元素拥有的类表明它属于另一个类(或者说某个类是另一个类的细化),这时使用继承再合适不过了.
#### 继承的高级用法
	--大多数情况你可能只想对类使用继承.
	--最常用的一种高级用法是继承一个html元素的样式.
#### 继承的工作细节
	--关于@extend有两个要点:
	 (1)跟混合器相比,继承生成的css代码相对更少.因为继承仅仅是重复选择器,而不会重复属性,所以使用继承往往比混合器生成的css
	体积更小.如果你非常关心你站点的速度,请牢记这一点.
	 (2)继承遵从css层叠的规则.当两个不同的css规则应用到同一个html元素上时,并且这两个不同的css规则对同一属性的修饰存在不同
	的值,css层叠规则会决定应用哪个样式.相当直观: 通常权重更高的选择器胜出,如果权重相同，定义在后边的规则胜出.
#### 使用继承的最佳实践
	--避免这种情况出现的最好方法就是不要在 css 规则中使用后代选择器去继承css规则.
##### 示例
	.disabled { //一个类
		font-size: 12px;
		color: #111;
		a {
			font-weight: bold;
		}
		.wrapper & {
			color: #333;
		}
	}
	.formDisabled { //一个类的细化
		@extend .disabled; // 继承一个类
		border: 1px solid #222;
		a {
			text-align: left;
		}
		.wrapper & {
			color: #444;
		}
	}
	
	==> 编译后:
	
	//两者共有
	.disabled, .formDisabled {
	  font-size: 12px;
	  color: #111; 
	}
	.disabled a, .formDisabled a {
	  font-weight: bold; 
	}
	 .wrapper .disabled, .wrapper .formDisabled {
	  color: #333; 
	}
	
	//细化类独有
	.formDisabled {
	  border: 1px solid #222; 
	}
	.formDisabled a {
	    text-align: left; 
	}
	.wrapper .formDisabled { //样式层叠,细化类独有会覆盖掉细化类共有的样式
	  color: #444; 
	}