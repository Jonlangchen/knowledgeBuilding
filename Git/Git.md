# Git Learning
## Download
	在官方网(https://git-scm.com/download/win)下下载 Git 工具.

## Installation	
	直接根据步骤默认安装.

## Operation
	Git的一般操作方法:
		(1)git add --> 将修改添加至本地缓存.
		(2)git commit -m 仓库名称 --> 将本地缓存保存到本地仓库中.
		(3)git push --> 将本地仓库推送至服务器.
		(4)git pull --> 从远程拉取最新版本到本地  自动合并 merge(将服务器的代码更新到本地仓库中).
			git fetch --> 从远程获取最新版本到本地  不会自动合并 merge.
			使用git fetch 更安全.
		
### Explain
	推送(push): 把本地仓库的代码推送至服务器.
	提交(commit): 把做的修改,保存到本地仓库中.