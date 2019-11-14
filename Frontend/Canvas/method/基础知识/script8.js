$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	var text = "Hello, World!";
	context.font = "italic 30px serif" // 修改字号、字体
	context.fillText(text, 40, 40);
	
	// 描边文字
	context.strokeText(text, 140, 200);
});