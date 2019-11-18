$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		// 三角形
		context.beginPath();
		context.moveTo(100, 50);
		context.lineTo(150,150);
		context.lineTo(50, 150);
		context.closePath();
		context.stroke();
		context.fill();
		
		// 二次贝塞尔曲线
		// context.lineWidth = 5;
		// context.beginPath();
		// context.moveTo(50, 250);
		// context.quadraticCurveTo(250, 100, 450, 250);
		// context.stroke();
		
		// 三次贝塞尔曲线
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(50,250);
		context.bezierCurveTo(150,50,350,450,450,250);
		context.stroke();
	}
	resizeCanvas();
});