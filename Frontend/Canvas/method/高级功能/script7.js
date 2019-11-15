$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalAlpha = 0.5;
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// globalCompositeOperation
		// 1.source-over
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "source-over";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 2.destination-over
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "destination-over";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 3.source-atop
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "source-atop";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 4.destination-atop
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "destination-atop";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 5.source-in
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "source-in";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 6.destination-in
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "destination-in";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 7.source-out
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "source-out";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 8.destination-out
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "destination-out";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 9.lighter
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "lighter";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 10.copy
		// context.fillStyle = "rgb(63, 169, 245)";
		// context.fillRect(50, 50, 100, 100);
		// context.globalCompositeOperation = "copy";
		// context.fillStyle = "rgb(255, 123, 172)";
		// context.fillRect(100, 100, 100, 100);
		
		// 11.xor
		context.fillStyle = "rgb(63, 169, 245)";
		context.fillRect(50, 50, 100, 100);
		context.globalCompositeOperation = "xor";
		context.fillStyle = "rgb(255, 123, 172)";
		context.fillRect(100, 100, 100, 100);
	}
	resizeCanvas();
});