$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	context.fillRect(40, 40, 100, 100);
	
	context.beginPath();
	context.arc(230, 90, 50, 0, Math.PI*2, false);
	context.closePath();
	context.fill();
	
	// 清除全部Canvas
	// context.clearRect(0, 0, 500, 500);
	
	// context.clearRect(0, 0, canvas.width(), canvas.height());
	
	// 清除特定区域
	context.clearRect(40, 40, 100, 100);
});