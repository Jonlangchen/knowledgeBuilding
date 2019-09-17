# 进阶 Git
## 基本概念
### 工作区（Working Directory）
	--就是你在电脑里能看到的目录,比如上文中的 gafish.github.com 文件夹就是一个工作区.
### 本地版本库（Local Repository）
	--工作区有一个隐藏目录 .git,这个不算工作区,而是 Git 的版本库.
### 暂存区（stage）
	--本地版本库里存了很多东西,其中最重要的就是称为 stage(或者叫index)的暂存区,还有 Git 为我们自动创建的第一个分支 master,
	 以及指向 master 的一个指针叫 HEAD.
### 远程版本库（Remote Repository）
	--一般指的是 Git 服务器上所对应的仓库,本文的示例所在的github仓库就是一个远程版本库.
### 分支（Branch）
	--分支是为了将修改记录的整个流程分开存储,让分开的分支不受其它分支的影响,所以在同一个数据库里可以同时进行多个不同的修改.
### 主分支（Master）
	--前面提到过 master 是 Git 为我们自动创建的第一个分支,也叫主分支,其它分支开发完成后都要合并到 master.
### 标签（Tag）
	--标签是用于标记特定的点或提交的历史,通常会用来标记发布版本的名称或版本号(如：publish/0.0.1),虽然标签看起来有点像分支,
	 但打上标签的提交是固定的,不能随意的改动.
### HEAD
	--HEAD 指向的就是当前分支的最新提交.

## 操作文件
### 添加文件到暂存区
	--git add -i
	 通过此命令将打开交互式子命令系统,你将看到如下子命令:
	 ***Commands***
	  1: status 2: update 3: revert  4: add untracked 5: patch 6: diff 7: quit 8: help
	 *status：功能上和 git add -i 相似,没什么用.
	 *update：详见下方 git add -u
	 *revert：把已经添加到暂存区的文件从暂存区剔除,其操作方式和 update 类似
	 *add untracked：可以把新增的文件添加到暂存区,其操作方式和 update 类似
	 *patch：详见下方 git add -p
	 *diff：比较暂存区文件和本地版本库的差异,其操作方式和 update 类似
	 *quit：退出 git add -i 命令系统
	 *help：查看帮助信息
	 
	--git add -p
	 直接进入交互命令中最有用的 patch 模式.这是交互命令中最有用的模式,其操作方式和 update 类似,选择后 Git 会显示这些文件
	 的当前内容与本地版本库中的差异,然后您可以自己决定是否添加这些修改到暂存区,在命令行 Stage deletion [y,n,q,a,d,/,?]? 
	 后输入 y,n,q,a,d,/,? 其中一项选择操作方式,具体功能解释如下:
	  y：接受修改
	  n：忽略修改
	  q：退出当前命令
	  a：添加修改
	  d：放弃修改
	  /：通过正则表达式匹配修改内容
	  ?：查看帮助信息
		
	--git add -u
	 直接进入交互命令中的 update 模式.它会先列出工作区 修改 或 删除 的文件列表,新增 的文件不会被显示,在命令行 Update>> 后
	 输入相应的列表序列号表示选中该项,回车继续选择,如果已选好,直接回车回到命令主界面.
	 
	--git add --ignore-removal .
	 添加工作区 修改 或 新增 的文件列表, 删除 的文件不会被添加.
### 把暂存区的文件提交到本地版本库
	--git commit -m '第一行提交原因'  -m '第二行提交原因'
	 不打开编辑器,直接在命令行中输入多行提交原因.
	
	--git commit -am '提交原因'
	 将工作区 修改 或 删除 的文件提交到本地版本库,新增 的文件不会被提交.
	--git commit --amend -m '提交原因'
	 修改最新一条提交记录的提交原因.
	
	--git commit -C HEAD
	 将当前文件改动提交到 HEAD 或当前分支的历史ID.
### 移动或重命名文件、目录
	--git mv a.md b.md -f
	 将 a.md 重命名为 b.md ,同时添加变动到暂存区,加 -f 参数可以强制重命名,相比用 mv a.md b.md 命令省去了 git add 操作.
### 从工作区和暂存区移除文件
	--git rm b.md
	 从工作区和暂存区移除文件 b.md ,同时添加变动到暂存区,相比用 rm b.md 命令省去了 git add 操作.
	 
	--git rm src/ -r
	 允许从工作区和暂存区移除目录
### 查看工作区和暂存区文件状态
	--git status -s
	 以简短方式查看工作区和暂存区文件状态.
	 
	--git status --ignored 
	 查看工作区和暂存区文件状态,包括被忽略的文件.

## 操作分支
### 查看、创建、删除分支
	--git branch -a
	 查看本地版本库和远程版本库上的分支列表.
	 
	--git branch -r
	 查看远程版本库上的分支列表，加上 -d 参数可以删除远程版本库上的分支.
	 
	--git branch -D
	 分支未提交到本地版本库前强制删除分支.
	 
	--git branch -vv
	 查看带有最后提交id、最近提交原因等信息的本地版本库分支列表.
### 将其它分支合并到当前分支
	--git merge --squash
	 将待合并分支上的 commit 合并成一个新的 commit 放入当前分支,适用于待合并分支的提交记录不需要保留的情况.
	
	--git merge --no-edit
	 在没有冲突的情况下合并,不想手动编辑提交原因,而是用 Git 自动生成的类似 Merge branch 'test'的文字直接提交.
### 切换分支
	--git checkout -b daily/0.0.1
	 创建 daily/0.0.1 分支，同时切换到这个新创建的分支
	
	--git checkout HEAD demo.html
	 从本地版本库的 HEAD(也可以是提交ID、分支名、Tag名) 历史中检出 demo.html 覆盖当前工作区的文件,如果省略 HEAD 则是从
	 暂存区检出.
	 
	--git checkout --orphan new_branch
	 这个命令会创建一个全新的,完全没有历史记录的新分支,但当前源分支上所有的最新文件都还在,真是强迫症患者的福音,但这个新分
	支必须做一次 git commit 操作后才会真正成为一个新分支.
	
	--git checkout -p other_branch
	 这个命令主要用来比较两个分支间的差异内容,并提供交互式的界面来选择进一步的操作,这个命令不仅可以比较两个分支间的差异,
	还可以比较单个文件的差异.
### Git栈
	在 Git 的栈中保存当前修改或删除的工作进度,当你在一个分支里做某项功能开发时,接到通知把昨天已经测试完没问题的代码发布到
	线上,但这时你已经在这个分支里加入了其它未提交的代码,这个时候就可以把这些未提交的代码存到栈里.
	
	--git stash
	 将未提交的文件保存到Git栈中.
	
	--git stash list
	 查看栈中保存的列表.
	 
	--git stash show stash@{0}
	 显示栈中其中一条记录.
	
	--git stash drop stash@{0}
	 移除栈中其中一条记录.
	
	--git stash pop
	 从Git栈中检出最新保存的一条记录,并将它从栈中移除.
	
	--git stash apply stash@{0}
	 从Git栈中检出其中一条记录,但不从栈中移除.
	
	--git stash branch new_banch
	 把当前栈中最近一次记录检出并创建一个新分支
	
	--git stash clear
	 清空栈里的所有记录.
	 
	--git stash create
	 为当前修改或删除的文件创建一个自定义的栈并返回一个ID,此时并未真正存储到栈里.
	
	--git stash store xxxxxx
	 将 create 方法里返回的ID放到 store 后面,此时在栈里真正创建了一个记录,但当前修改或删除的文件并未从工作区移除.
### 操作历史
	--git log -p
	 显示带提交差异对比的历史记录

	--git log demo.html
	 显示 demo.html 文件的历史记录

	--git log --since="2 weeks ago"
	 显示2周前开始到现在的历史记录,其它时间可以类推

	--git log --before="2 weeks ago"
	 显示截止到2周前的历史记录,其它时间可以类推

	--git log -10
	 显示最近10条历史记录

	--git log f5f630a..HEAD
	 显示从提交ID f5f630a 到 HEAD 之间的记录,HEAD 可以为空或其它提交ID

	--git log --pretty=oneline
	 在一行中输出简短的历史记录

	--git log --pretty=format:"%h" 
	 格式化输出历史记录
	 Git 用各种 placeholder 来决定各种显示内容:
	  %H: commit hash
	  %h: 缩短的commit hash
	  %T: tree hash
	  %t: 缩短的 tree hash
	  %P: parent hashes
	  %p: 缩短的 parent hashes
	  %an: 作者名字
	  %aN: mailmap的作者名
	  %ae: 作者邮箱
	  %ad: 日期 (--date= 制定的格式)
	  %ar: 日期, 相对格式(1 day ago)
	  %cn: 提交者名字
	  %ce: 提交者 email
	  %cd: 提交日期 (--date= 制定的格式)
	  %cr: 提交日期, 相对格式(1 day ago)
	  %d: ref名称
	  %s: commit信息标题
	  %b: commit信息内容
	  %n: 换行
### 合并分支的一条或几条提交记录到当前分支末梢
	--git cherry-pick 170a305
	 合并提交ID 170a305 到当前分支末梢
### 将当前的分支重设（reset）到指定的 <commit> 或者 HEAD
	--git reset --mixed <commit>
	 --mixed 是不带参数时的默认参数,它退回到某个版本,保留文件内容,回退提交历史

	--git reset --soft <commit>
	 暂存区和工作区中的内容不作任何改变,仅仅把 HEAD 指向 <commit>

	--git reset --hard <commit>
	 自从 <commit> 以来在工作区中的任何改变都被丢弃,并把 HEAD 指向 <commit>
### 新定义分支的版本库状态
	--git rebase branch_name
	 合并分支,这跟 merge 很像,但还是有本质区别,合并过程中可能需要先解决冲突,然后执行 git rebase --continue
	
	--git rebase -i HEAD~~
	 打开文本编辑器,将看到从 HEAD 到 HEAD~~ 的提交如下
### 撤销某次操作,此次操作之前和之后的 commit 和 history 都会保留,并且把这次撤销作为一次最新的提交
	--git revert HEAD
	 撤销前一次提交操作

	--git revert HEAD --no-edit
	 撤销前一次提交操作,并以默认的 Revert "xxx" 为提交原因

	--git revert -n HEAD
	 需要撤销多次操作的时候加 -n 参数,这样不会每次撤销操作都提交,而是等所有撤销都完成后一起提交
### 查看工作区、暂存区、本地版本库之间的文件差异
	--git diff --stat
	 通过 --stat 参数可以查看变更统计数据
### 查看所有分支的所有操作记录
	--git reflog
	 包括commit和reset的操作、已经被删除的commit记录,跟 git log 的区别在于它不能查看已经删除了的commit记录.
	 
## 远程版本库连接
	--如果在GitHub项目初始化之前,文件已经存在于本地目录中,那可以在本地初始化本地版本库,再将本地版本库跟远程版本库连接起来.
### 在本地目录内部会生成.git文件夹
	--git init
	
	--git remote -v
	 不带参数,列出已经存在的远程分支,加上 -v 列出详细信息,在每一个名字后面列出其远程url
	 
	--git remote add origin https://github.com/gafish/gafish.github.com.git
	 添加一个新的远程仓库,指定一个名字,以便引用后面带的URL
### 将远程版本库的更新取回到本地版本库
	--git fetch origin daily/0.0.1
	 默认情况下,git fetch 取回所有分支的更新.如果只想取回特定分支的更新,可以指定分支名.

## 问题排查
### 查看文件每行代码块的历史信息
	--git blame -L 1,10 demo.html
	 截取 demo.html 文件1-10行历史信息
### 二分查找历史记录,排查BUG
	--git bisect start
	 开始二分查找
	
	--git bisect bad
	 标记当前二分提交ID为有问题的点
	
	--git bisect good
	 标记当前二分提交ID为没问题的点
	
	--git bisect reset
	 查到有问题的提交ID后回到原分支

## 更多操作
### git submodule
	--通过 Git 子模块可以跟踪外部版本库,它允许在某一版本库中再存储另一版本库,并且能够保持2个版本库完全独立.
	
	--git submodule add https://github.com/gafish/demo.git demo
	 将 demo 仓库添加为子模块

	--git submodule update demo
	 更新子模块 demo
### git gc
	--运行Git的垃圾回收功能，清理冗余的历史快照
### git archive
	--将加了tag的某个版本打包提取
	
	--git archive -v --format=zip v0.1 > v0.1.zip
	 --format 表示打包的格式,如 zip,-v 表示对应的tag名,后面跟的是tag名,如 v0.1。