$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	context.fillRect(40, 40, 100, 100);
	
	context.beginPath();
	context.arc(230, 90, 50, 0, Math.PI*2, false);
	context.closePath();
	context.fill();
	
	context.clearRect(230, 90, 50, 50);
});