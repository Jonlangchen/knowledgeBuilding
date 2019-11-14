$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	context.beginPath(); //开始路径
	context.arc(230, 90, 50, 0, Math.PI*2, false); //绘制一个圆
	context.closePath(); //结束路径
	context.fill(); //填充路径
});