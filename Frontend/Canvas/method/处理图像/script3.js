$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		var imageData = context.createImageData(500, 500);
		var pixels = imageData.data;
		
		// 马赛克块的个数(修改个数会出现不同效果);
		var numTitleRows = 4;
		var numTitleCols = 4;
		
		// 每个块的尺寸
		var titleWidth = imageData.width / numTitleCols;
		var titleHeight = imageData.height / numTitleRows;
		
		// 修改像素的颜色值
		for (var r = 0; r < numTitleRows; r++) {
			for (var c = 0; c < numTitleCols; c++) {
				// 为每个块设置像素的颜色值
				var red = Math.floor(Math.random()*255); //红
				var green = Math.floor(Math.random()*255); //绿
				var blue = Math.floor(Math.random()*255); //蓝
				for (var tr = 0; tr < titleHeight; tr++) {
					for (var tc = 0; tc < titleWidth; tc++) {
						var trueX = (c*titleWidth)+tc;
						var trueY = (r*titleHeight)+tr;
						
						var pos = (trueY*(imageData.width*4)) + (trueX*4);
						pixels[pos] = red;
						pixels[pos+1] = green;
						pixels[pos+2] = blue;
						pixels[pos+3] = 255;
					};
				};
			};
		};
		
		
		
		context.putImageData(imageData, 0, 0);
	}
	resizeCanvas();
});