# JavaScript
## this 决策树
	--函数是否用 new 进行调用: 是的话 ==> this 指向新创建的对象; 否的话 ==> 函数是否用 dot() 进行调用?
	--是的话 ==> this 指向 dot 之前的对象; 否的话 ==> this 指向全局对象 window