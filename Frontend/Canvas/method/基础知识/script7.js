$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	context.lineWidth = 5;  //加粗线条
	
	context.strokeStyle = "rgb(255, 0, 0)";
	context.beginPath();
	context.moveTo(40, 180);
	context.lineTo(420, 180);
	context.closePath();
	context.stroke();
	
	context.lineWidth = 20; //进一步加粗线条
	
	context.strokeStyle = "rgb(0, 0, 0)";
	context.beginPath();
	context.moveTo(40, 220);
	context.lineTo(420, 220);
	context.closePath();
	context.stroke();
});