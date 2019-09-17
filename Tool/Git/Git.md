# Git Learning
## Download
	--在官方网(https://git-scm.com/download/win)下下载 Git 工具.

## Installation	
	--直接根据步骤默认安装.

## Operation
	--Git的一般操作方法:
	 (1)git add --> 将修改添加至本地缓存.
	 (2)git commit -m 仓库名称 --> 将本地缓存保存到本地仓库中.
	 (3)git push --> 将本地仓库推送至服务器.
	 (4)git pull --> 从远程拉取最新版本到本地  自动合并 merge(将服务器的代码更新到本地仓库中).
	* git fetch --> 从远程获取最新版本到本地  不会自动合并 merge.同(4)相比使用git fetch 更安全!
		
### Explain
	推送(push): 把本地仓库的代码推送至服务器.
	提交(commit): 把做的修改,保存到本地仓库中.

## Git 忽略规则
	--Git 忽略提交 .gitgnore
### Git 忽略规则优先级
	--在 .gitingore 文件中,每一行指定一个忽略规则,Git 检查忽略规则的时候有多个来源,它的优先级如下(由高到低):
	 --从命令行中读取可用的忽略规则,
	 --当前目录定义的规则,
	 --父级目录定义的规则，依次递推,
	 --$GIT_DIR/info/exclude 文件中定义的规则,
	 --core.excludesfile中定义的全局规则.

### Git 忽略规则匹配语法
	--在 .gitignore 文件中,每一行的忽略规则的语法如下:
	 --空格不匹配任意文件，可作为分隔符，可用反斜杠转义,
	 --# 开头的文件标识注释，可以使用反斜杠进行转义,
	 --! 开头的模式标识否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用 ! 也不会再次被包含。可以使用反斜杠
	进行转义,
	 --/ 结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件,
	 --/ 开始的模式匹配项目跟目录,
	 --如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容，如果该模式不在 .gitignore 文件中，则相对
	于项目根目录,
	 --** 匹配多级目录，可在开始，中间，结束,
	 --? 通用匹配单个字符,
	 --[] 通用匹配单个字符列表.
#### 常用匹配示例
	--bin/: 忽略当前路径下的bin文件夹,该文件夹下的所有内容都会被忽略,不忽略 bin 文件;
	--/bin: 忽略根目录下的bin文件;
	--/*.c: 忽略 cat.c，不忽略 build/cat.c;
	--debug/*.obj: 忽略 debug/io.obj，不忽略 debug/common/io.obj 和 tools/debug/io.obj;
	--**/foo: 忽略/foo, a/foo, a/b/foo等;
	--a/**/b: 忽略a/b, a/x/b, a/x/y/b等;
	--!/bin/run.sh: 不忽略 bin 目录下的 run.sh 文件;
	--*.log: 忽略所有 .log 文件;
	--config.php: 忽略当前路径的 config.php 文件;
### .gitignore规则不生效
	--.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的.解决方法
	 就是先把本地缓存删除（改变成未track状态），然后再提交:
	 git rm -r --cached .
	 git add .
	 git commit -m 'update .gitignore'

## Git 操作流程
	--如何使用 Git 拉取代码到提交代码的整个流程.
### 从git服务器拉取代码
	--git clone https://github.com/gafish/gafish.github.com.git
	 代码下载完成后在当前文件夹中会有一个 gafish.github.com 的目录,通过 cd gafish.github.com 命令进入目录.
### 配置开发者用户名和邮箱
	--git config user.name gafish
  --git config user.email gafish@qqqq.com
	 每次代码提交的时候都会生成一条提交记录,其中会包含当前配置的用户名和邮箱.
### 创建、重命名、查看、删除项目分支,通过 Git 做项目开发时,一般都是在开发分支中进行,开发完成后合并分支到主干
	--git branch daily/0.0.0
	 创建一个名为 daily/0.0.0 的日常开发分支,分支名只要不包括特殊字符即可.
	--git branch -m daily/0.0.0 daily/0.0.1
	 如果觉得之前的分支名不合适,可以为新建的分支重命名,重命名分支名为 daily/0.0.1 .
	--git branch
	 通过不带参数的branch命令可以查看当前项目分支列表.
	--git branch -d daily/0.0.1
	 如果分支已经完成使命则可以通过 -d 参数将分支删除.
### 切换分支
	--git checkout daily/0.0.1
	 切换到 daily/0.0.1 分支,后续的操作将在这个分支上进行.
### 查看文件变动状态
	--git status
	 通过 git status 命令可以看到文件当前状态 Changes not staged for commit: (改动文件未提交到暂存区)
### 添加文件变动到暂存区
	--git add README.md
	 通过指定文件名 README.md 可以将该文件添加到暂存区,如果想添加所有文件可用 git add . 命令,这时候可通过 git status 看
	 到文件当前状态 Changes to be committed: (文件已提交到暂存区).
### 提交文件变动到版本库
	--git commit -m '这里写提交原因'
	 通过 -m 参数可直接在命令行里输入提交描述文本.
### 将本地的代码改动推送到服务器
	--git push origin daily/0.0.1
	 origin 指代的是当前的git服务器地址,这行命令的意思是把 daily/0.0.1 分支推送到服务器.
### 将服务器上的最新代码拉取到本地
	--git pull origin daily/0.0.1
	 如果其它项目成员对项目做了改动并推送到服务器,我们需要将最新的改动更新到本地.
	 **如果线上代码做了变动,而你本地的代码也有变动,拉取的代码就有可能会跟你本地的改动冲突,一般情况下 Git 会自动处理这种
	 冲突合并,但如果改动的是同一行,那就需要手动来合并代码,编辑文件,保存最新的改动,再通过 git add . 和 git commit -m 'xxx' 
	 来提交合并.
### 查看版本提交记录
	--git log
	 通过以上命令,我们可以查看整个项目的版本提交记录,它里面包含了提交人、日期、提交原因等信息.
	 **提交记录可能会非常多,按 J 键往下翻,按 K 键往上翻,按 Q 键退出查看.
### 为项目标记里程碑
	--git tag publish/0.0.1
	--git push origin publish/0.0.1
	 当我们完成某个功能需求准备发布上线时,应该将此次完整的项目代码做个标记,并将这个标记好的版本发布到线上,这里我们以 
	 publish/0.0.1 为标记名并发布.
### 设置哪些内容不需要推送到服务器,这是一个配置文件
	--touch .gitignore
	 .gitignore 不是 Git 命令,而在项目中的一个文件,通过设置 .gitignore 的内容告诉 Git 哪些文件应该被忽略不需要推送到服
	 务器,通过以上命令可以创建一个 .gitignore 文件,并在编辑器中打开文件,每一行代表一个要忽略的文件或目录.
	 如:
	 demo.html
	 buildy/
	 以上内容的意思是 Git 将忽略 demo.html 文件 和 build/ 目录,这些内容不会被推送到服务器上.