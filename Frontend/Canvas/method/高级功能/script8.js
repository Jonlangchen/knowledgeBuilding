$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		context.shadowBlur = 20; // 模糊度
		context.shadowColor = "rgb(0,0,0)"; // 不透明黑色
		context.fillRect(50,50,100,100);
		
		
		context.shadowBlur = 0;
		context.shadowOffsetX = 10;
		context.shadowOffsetY = 10;
		context.shadowColor = "rgba(100,100,100, .5)";
		context.fillRect(200, 50, 100, 100);
		
		context.shadowColor = "rgb(255,0,0)"
		context.shadowBlur = 50;
		context.shadowOffsetX = 10;
		context.shadowOffsetY = 10;
		context.beginPath();
		context.arc(400, 100, 50, 0, Math.PI*2, false);
		context.closePath();
		context.fill();
	}
	resizeCanvas();
});