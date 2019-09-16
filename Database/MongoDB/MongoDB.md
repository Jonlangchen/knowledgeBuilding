# MongoDB
	--基于分布式文件存储的开源数据库系统.在高负载的情况下,添加更多节点,可以保证服务器性能.
	--MongoDB 旨在为 Web 应用提供可扩展的高性能数据存储解决方案.MongoDB 将数据存储为一个文档,数据结构由键值(key=>value)
	 对组成.MongoDB 文档类似于 JSON 对象.字段值可以包含其他文档、数组、及文档数组.

## 下载
	--到(https://www.mongodb.com/download-center/community)选择下载 msi 版本;
	--直接点击安装,选择高级用户安装方式(第二种),可以指定安装盘,
	--要取消勾选 install MongoDB Compass 安装,不然安装很慢,
	--其余步骤默认.

## 配置
	--在 mongod\data 目录下创建文件用来存放数据库文件>>"F:\mytool\mongo\mongod\data\db"因为启动 mongodb 服务之前必须创
	 建数据库文件的存放文件夹,否则命令不会自动创建,而且不能启动成功.

## 卸载MongoDB服务
	--进入 mongod\bin 目录下: 输入 mongod.exe --remove --serviceName "MongoDB" 即可卸载服务.
	--接着删除data文件夹下所有东西,再清空log.
	
## 安装Authorization校验的MongoDB
	--创建几个文件夹具体如下: 数据库路径（data目录）、日志路径（logs目录）和日志文件(logs/mongo.log文件);
	--创建配置文件mongo.conf,文件内容如下:
		# 数据库路径
		dbpath=F:\myTool\mongo\mongod\data
		# 日志输出文件路径
		logpath=F:\myTool\mongo\mongod\log\mongo.log
		# 错误日志采用追加模式
		logappend=true
		# 启用日志文件，默认启用
		journal=true
		# 这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置false
		quiet=true
		# 端口号 默认为27017
		port=27017
		# 开启用户认证
		auth=true
	--(1)启动MongoDB服务 
	 mongod –-config “F:\myTool\mongo\mongod\mongo.conf” –-install –-serviceName “MongoDB” 
	 启动服务: net start MongoDB
	 *这个是使用自己刚刚在上面配置的配置文件来启动服务的。注意修改成自己的目录位置
	--(2)创建并启动 MongoDB 服务(通过windows服务来管理MongoDB的启动和关闭了,不用每次像(1)那样操作),注册账户服务,多添加 -auth
	 mongod –-config “F:\myTool\mongo\mongod\mongo.conf” –-auth –-install –-serviceName “MongoDB” 
	 快速启动服务:net start MongoDB
### mongodb用户创建以及权限控制
	--在安装完mongodb之后,默认是没有开启权限认证的,但是我们在生产环境权限认证是必不可少的.
	 (1)创建用户
	  --启动 mongo shell
		 先创建个管理员账号(该账号可以对所有数据库进行用户管理);
		 1、输入 mongo
		 2、输入 use admin
		 3、输入 db.createUser({user: "admin",pwd: "password",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]});
		  enter后显示 Successfully added user:{"user": "admin", "roles": [{ role: "userAdminAnyDatabase", db: "admin" }]}.
	
### 以认证的方式连接mongo
	--连接时认证:
	 (1)进入 mongod\bin 目录下: 输入 mongo -port 27017 -u "admin" -p "password" --authenticationDatabase "admin"
	 (2) use admin
	 (3) show users
	--连接好了再认证
	 (1)mongo
	 (2)use admin (选择 admin 账户)
	 (3)db.auth("admin", "password"), 显示1表示认证成功,显示0，表示认证失败.
	 (4)show users.
#### 根据需要创建其他的账号
	--比如我有一个test库,我需要读写权限,然后有个game_report库,我需要只读权限,然后我们就可以如下创建一个账号:
	 1、输入 mongo
	 2、输入 use admin
	 3、输入 db.createUser({user: "my_tester",pwd: "123456",roles: [ { role: "readWrite", db: "test" }, 
	 { role: "read", db: "game_report" }
	 ]});
		enter后显示 Successfully added user:{"user": "admin", "roles": [{ role: "userAdminAnyDatabase", db: "admin" }]}.
		
	**root db.createUser({user: "username",pwd: "jklbnm"});
## 启动 mongodb 服务
	--打开 cmd 命令行，进入 mongod\bin 目录下;
	--输入如下的命令启动mongodb服务：mongod --dbpath F:\mytool\mongo\mongod\data\db;
	 设置账号: mongod --auth --dbpath F:\mytool\mongo\mongod\data\db;
	--按下回车键即在我们创建的数据库存放路径db目录下启动;
	--在浏览器输入http://localhost:27017(27017是mongodb的端口号)查看是否连接成功,出现一句英文.
	
	--net start serviceName  快速启动服务
	--net stop serviceName  快速停止服务

## 权限说明（基于角色的权限控制）
### 内置角色
#### 数据库用户角色
	--read: 只读数据权限
	--readWrite:学些数据权限
#### 数据库管理角色
	--dbAdmin: 在当前db中执行管理操作的权限
	--dbOwner: 在当前db中执行任意操作
	--userADmin: 在当前db中管理user的权限
#### 备份和还原角色
	--backup
	--restore
#### 夸库角色
	--readAnyDatabase: 在所有数据库上都有读取数据的权限
	--readWriteAnyDatabase: 在所有数据库上都有读写数据的权限
	--userAdminAnyDatabase: 在所有数据库上都有管理user的权限
	--dbAdminAnyDatabase: 管理所有数据库的权限
#### 集群管理
	--clusterAdmin: 管理机器的最高权限
	--clusterManager: 管理和监控集群的权限
	--clusterMonitor: 监控集群的权限
	--hostManager: 管理Server
#### 超级权限
	--root: 超级用户
### 自定义角色
	内置角色只能控制User在DB级别上执行的操作,管理员可以创建自定义角色,控制用户在集合级别（Collection-Level）上执行的操作,
	即控制User在当前DB的特定集合上执行特定的操作.

### 用户管理
#### 添加用户
	--通过mongo shell终端操作,用户保存在admin数据库system.user集合中.
	(1)添加普通用户
	 --切换到需要添加用户的db: use xxxx
	 --db.createUser()
	(2)添加超级用户
	 --切换到admin数据库: use admin
	 --db.createUser()
#### 删除用户
	--切换到用户授权的db: use XX
	--执行删除操作: db.dropUser('username')
#### 更新用户
	--切换到用户授权的db: use XX
	--执行更新,字段会覆盖原来的内容
	 db.updateUser("username", {pwd: "new password", customData: {"title": "PHP developer"}})
#### 更新用户密码
	--切换到用户授权的db: use XX
	--db.changeUserPassword("username", "newPassword")
#### 查看用户信息
	--切换到admin数据库: use admin
	--db.getUser("username")
#### 删除用户角色
	--切换到用户授权的db: use XX
	--db.revokeRolesFromUser("username", [{role: "readWrite", db: "accounts"}])
#### 添加用户角色
	--切换到用户授权的db: use XX
	--db.grantRolesToUser("reportsUser", [role: "read", db: "accounts"])
	
## 常用命令
	--启动 MongoDB : mongod --dbpath [mongodb path]/data/db
### 数据库相关操作.
	--切换数据库,如果是一个不存在的数据库,那么将会创建一个新的 DB: use [DBName]
	--显示所有的数据库: show dbs
	--显示当前使用的数据库: db/db.getName()
	--删除当前数据库: db.dropDatabase()
	--显示当前数据库中的集合(类似关系数据库中的表): show collections
	--查看当前数据库的用户信息: show users
	--切换数据库跟mysql一样: use 数据库名称
	--当前db版本: db.version()
	--查看当前db的连接机器地址: db.getMongo()
	--显示数据库操作命令: db.help()
	--对于当前数据库中的foo集合进行数据查找(由于没有条件，会列出所有数据): db.foo.find()
	
### Collection 相关操作(collection 可以理解为相似数据的集合,和关系型数据库中 table 的概念相似.)
	--显示当前数据库中的所有 collection: show collections
	--创建新的 collection: db.createCollection(name)

### 查询
	--显示 collection 中的所有数据: db.[collectionName].find(option)
	 *option: 表示筛选条件,如对于一个名为 login 的  collection.
	--选出所有的 username 一列的数据: db.login.find("username")
	--选出 username 为 Tom 的记录: db.login.find({"username":"Tom"})
	 *find 方法和 SQL 中的 select 语句功能类似.

### curd 操作
	--向 collection 插入新数据: db.[collection].insert(option)
	--向 collection 插入新数据: db.[collection].save(option)
	 *inset 和 save 都用来向指定集合插入数据,它们之间的主要区别在于如果试图插入一条主键相同的记录,那么 save 会更新原有
	记录,insert 则会直接忽略,并打印一条主键已经存在的错误提示.
	--更新 collection 中的数据: db.[collection].update(option)
	--删除 collection 中的数据: db.[collection].remove(option)


	