$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	// 更新/清除/绘制
	var x = 0;
	
	// 循环
	var playAnimation = true;
	
	var startButton = $("#startAnimation");
	var stopButton = $("#stopAnimation");
	
	startButton.hide();
	startButton.click(function() {
		$(this).hide();
		stopButton.show();
		
		palyAnimation = true;
		animate();
	});
	
	stopButton.click(function() {
		$(this).hide();
		startButton.show();
		
		playAnimation = false;
	});
	
	function animate() {
		x = x + 10;
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.fillRect(x, 250,10,10);
		if (playAnimation) {
			setTimeout(animate, 33);
		}
	};
	animate();
	// 动态调整 Canvas 大小
	// $(window).resize(resizeCanvas);
	
	// function resizeCanvas() {
	// 	canvas.attr("width", $(window).get(0).innerWidth);
	// 	canvas.attr("height", $(window).get(0).innerHeight);
		
	// 	animate();
	// }
	
	// resizeCanvas();
});