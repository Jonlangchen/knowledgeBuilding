# MongoDB
	--基于分布式文件存储的开源数据库系统.在高负载的情况下,添加更多节点,可以保证服务器性能.
	--MongoDB 旨在为 Web 应用提供可扩展的高性能数据存储解决方案.MongoDB 将数据存储为一个文档,数据结构由键值(key=>value)
	 对组成.MongoDB 文档类似于 JSON 对象.字段值可以包含其他文档、数组、及文档数组.

## 常用命令
	--启动 MongoDB : mongod --dbpath [mongodb path]/data/db
### 数据库相关操作.
	--切换数据库,如果是一个不存在的数据库,那么将会创建一个新的 DB: use [DBName]
	--显示所有的数据库: show dbs
	--显示当前使用的数据库: db/db.getName()
	--删除当前数据库: db.dropDatabase()
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


	