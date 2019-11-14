$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	context.beginPath(); //开始路径
	context.moveTo(40, 40); //设置路径原点
	context.lineTo(340, 40); //设置路径终点
	context.closePath(); //结束路径
	context.stroke(); //绘出路径轮廓
});