$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	context.fillStyle = "rgb(255, 0, 0)";
	context.fillRect(40, 40, 100, 100);
	context.fillRect(180, 40, 100, 100);
	
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(320, 40, 100, 100);
	
	
	
	context.strokeStyle = "rgb(255, 0, 0)";
	context.strokeRect(40, 240, 100, 100);
	context.strokeRect(180, 240, 100, 100);
	
	context.strokeStyle = "rgb(0, 0, 0)";
	context.strokeRect(320, 240, 100, 100);
	
	
	
	context.strokeStyle = "rgb(255, 0, 0)";
	context.beginPath();
	context.moveTo(40, 380);
	context.lineTo(420, 380);
	context.closePath();
	context.stroke();
	
	context.strokeStyle = "rgb(0, 0, 0)";
	context.beginPath();
	context.moveTo(40, 420);
	context.lineTo(420, 420);
	context.closePath();
	context.stroke();
});