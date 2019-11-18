$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		// var gradient = context.createLinearGradient(0, 0, 0, canvas.height());
		// gradient.addColorStop(0, "rgb(0,0,0)");
		// gradient.addColorStop(1, "rgb(255,255,255)");
		
		// var gradient = context.createRadialGradient(300,300,10,100,100,50);
		// gradient.addColorStop(0, "rgb(0,0,0)");
		// gradient.addColorStop(1, "rgb(150,150,150)");
		
		var gradient = context.createRadialGradient(canvas.width()/2, canvas.height()/2,
									100, canvas.width()/2, canvas.height()/2, 250);
		gradient.addColorStop(0, "rgb(0,0,0)");
		gradient.addColorStop(1, "rgb(150,150,150)");
		
		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width(), canvas.height());
	}
	resizeCanvas();
});