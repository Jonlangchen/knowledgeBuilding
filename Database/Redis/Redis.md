# Redis
 --Redis 是一个开源(BSD 许可)的,内存中的数据结构存储系统,它可以用作数据库、缓存和消息中间件.它支持多种类型的数据结构,
  并通过 Redis 哨兵(Sentinel)和自动分区(Cluster)提供高可用性.
 --Redis 有如下特点:
  1、和 mongodb 相同,属于非关系型数据库.
  2、和大多数将数据存储在磁盘的数据库不同,Redis 属于内存数据库,
  3、常用于缓存和中间件.

## Redis 服务
	--获取 Redis: docker pull redis:3.2
	--为了使用持久化配置,使用命令: 
	 docker run -p 6379:6379 -v $PWD/data:/data -d redis:3.2 redis-server --appendonly yes
	*各项参数的含义:
	 -p 6379:6379: 将容器的 6379 端口映射到主机的 6379 端口.
	 -v $PWD/data:/data: 将主机中当前目录下的 data 挂载到容器的 /data.
	 redis-server --appendonly yes: 在容器执行 redis-server 命令,并打开 Redis 持久化配置.