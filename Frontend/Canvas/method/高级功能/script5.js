$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		// context.rotate(Math.PI/4);
		// context.fillRect(150, 150, 100, 100);
		
		
		context.translate(200, 200); // 平移到正方形中心
		context.rotate(Math.PI/4); // 旋转45度角
		context.fillRect(-50, -50, 100, 100); // 以旋转点为中心绘制一个正方形
	}
	resizeCanvas();
});