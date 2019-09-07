# Docker
	--Docker 是一个开源的应用容器引擎,可以打包项目的依赖到一个可移植的容器中,Windows10支持.
	--通过 Docker 可以快速配置运行环境.
	--"端口即服务"的思想: 假设我们的 Node 项目依赖于一个本地的数据库环境,端口为3306,可以将数据库服务抽象成一台新的机器,
	 并且开放了3306端口.

## Docker 命令
	--查看活跃的 Docker 镜像:  docker ps
	--查看 container 运行时环境变量: docker inspect <container>
	--查看 container 控制台输出: docker logs <container>
	--停止 container : docker stop <container>
	--导入镜像: docker import - /home/myubuntu-export-1204.tar
	--导出镜像: docker export furious_bell > /home/myubuntu-export-1204.tar
	--打包镜像: docker build -t 文件名 .
	--运行: docker run -d --net="host" a1044f6c9274
	--获取 Redis: docker pull redis:3.2
	--为了使用持久化配置,使用命令:
	 docker run -p 6379:6379 -v $PWD/data:/data -d redis:3.2 redis-server --appendonly yes

## 如何使用 docker
	--需要 DockerFile 的配置文件,
	--打包镜像: docker build -t 文件名 .
	--运行: docker run -d --net="host" a1044f6c9274
	 *--net="host": 表示使用宿主机器的网段
	 