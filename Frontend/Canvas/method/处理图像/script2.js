$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		var imageData = context.createImageData(200, 200);
		var pixels = imageData.data;
		
		var numPixels = imageData.width*imageData.height;
		// 红色像素
		// for (var i = 0; i < numPixels; i++) {
		// 	pixels[i*4] = 255; //红
		// 	pixels[i*4+1] = 0; //绿
		// 	pixels[i*4+2] = 0; //蓝
		// 	pixels[i*4+3] = 255; //透明度
		// };
		
		// 随机像素--杂乱的像素点
		for (var i = 0; i < numPixels; i++) {
			pixels[i*4] = Math.floor(Math.random()*255); //红
			pixels[i*4+1] = Math.floor(Math.random()*255); //绿
			pixels[i*4+2] = Math.floor(Math.random()*255); //蓝
			pixels[i*4+3] = 255; //透明度
		};
		
		context.putImageData(imageData, 0, 0);
	}
	resizeCanvas();
});