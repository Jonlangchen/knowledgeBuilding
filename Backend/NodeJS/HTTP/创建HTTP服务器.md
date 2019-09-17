# 创建 HTTP 服务器
	--超文本传输协议(HTTP,HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议.所有的WWW文件都必须遵守这个
	 标准.设计 HTTP 最初的目的是为了提供一种发布和接收 HTML 页面的方法.其属于七层网路协议的"应用层".
	--七层网路协议:
	 物理层-->数据链路层-->网络层(ip)-->传输层(TCP/UDP)-->会话层-->表示层-->应用层(TELNET,HTTP,FTP,NFS,SMTP)
## 创建服务
	--方式一: 回调方式
	 var server = http.createServer((request, response) => {
		 // 接受客户端请求时触发    ...
		});
	 server.listen(10000, 'localhost', 511, () => {
		 // 开始监听   ...
	 });
	
	--方式二: 事件监听方式
	 var server = http.createServer();
	 // 接受客户端请求时触发
	 server.on('request', (request, rsponse) => {
	     ...
	 });
	 server.listen(10000, 'localhost', 511);
	 // 开始监听
	 server.on('listening', () => {
	     ...
	 });
	**server.listen(port, [host], [backlog], [callback])中的backlog参数为整数,指定位于等待队列中客户端连接的最大数量,
	一旦超过这个长度,HTTP服务器将开始拒绝来自新客户端的连接,默认值为511.
	**在HTTP请求服务器时,会发送两次请求.一次是用户发出请求,另一次是浏览器为页面在收藏夹中的显示图标(默认为favicon.ico)而
	自动发出的请求.
## 关闭服务器
	server.close();
	// 服务器关闭时会触发close事件
	server.on('close', () => {...});
## 超时
	**注意：默认超时时间为2分钟
	server.setTimeout(60 * 1000, () => {
	console.log('超时了');
	});
	// 或者通过事件形式
	server.setTimeout(60 * 1000);
	server.on('timeout', () => {...});
## 错误
	server.on('error', (e) => {
	if(e.code === 'EADDRINUSE') {
	// 端口被占用
	    }
	});