$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		context.fillRect(150, 150, 100, 100);
		context.translate(150, 150);
		
		context.fillStyle = "rgb(255, 0, 0)";
		context.fillRect(150, 150, 100, 100);
	}
	resizeCanvas();
});