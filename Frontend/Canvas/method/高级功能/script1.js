$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		context.fillStyle = "rgb(255, 0, 0)";
		context.save(); // 保存画布状态
		context.fillRect(50, 50, 100, 100);
		
		context.fillStyle = "rgb(0, 0, 255)";
		context.fillRect(200, 50, 100, 100);
		
		context.restore(); //恢复画布状态
		context.fillRect(350, 50, 100, 100);
	}
	resizeCanvas();
});