$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		// context.transform(2, 0, 0, 2, 150, 150);
		// context.fillRect(0, 0, 100, 100);
		
		context.setTransform(1, 0, 0, 1, 0, 0); // 单位矩阵
		var xScale = Math.cos(Math.PI/4);
		var ySkew = -Math.sin(Math.PI/4);
		var xSkew = Math.sin(Math.PI/4);
		var yScale = Math.cos(Math.PI/4);
		var xTrans = 200;
		var yTrans = 200;
		
		context.transform(xScale, ySkew , xSkew , yScale, xTrans, yTrans);
		context.fillRect(-50, -50, 100, 100);
	}
	resizeCanvas();
});