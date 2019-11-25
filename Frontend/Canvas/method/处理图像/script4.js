$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	// 动态调整 Canvas 大小
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		
		var image = new Image();
		image.src = "example.jpg";
		$(image).load(function() {
			context.drawImage(image, 0,0,1024,683,0,0,500,500);
			
			var imageData = context.getImageData(0,0,canvas.width(), canvas.height());
			var pixels = imageData.data;
			var numPixels = pixels.length;
			
			context.clearRect(0,0,canvas.width(),canvas.height());
			
			// 反转颜色
			// for (var i = 0; i < numPixels; i++) {
			// 	pixels[i*4] = 255 - pixels[i*4]; //红色
			// 	pixels[i*4+1] = 255 - pixels[i*4+1]; //绿色
			// 	pixels[i*4+2] = 255 - pixels[i*4+2]; //蓝色
			// };
			
			// 灰度
			// for (var i = 0; i < numPixels; i++) {
			// 	var average = (pixels[i*4] + pixels[i*4+1] + pixels[i*4+2])/3;
			// 	pixels[i*4] = average; //红色
			// 	pixels[i*4+1] = average; //绿色
			// 	pixels[i*4+2] = average; //蓝色
			// };
			
			
			// 像素化
			var numTitleRows = 20;
			var numTitleCols = 20;
			
			var titleWidth = imageData.width / numTitleCols;
			var titleHeight = imageData.height / numTitleRows;
			 
			for (var r = 0; r < numTitleRows; r++) {
				for (var c = 0; c < numTitleCols; c++) {
					var x = (c*titleWidth) + (titleWidth / 2);
					var y = (r*titleHeight) + (titleHeight / 2);
					
					var pos = (Math.floor(y)*(imageData.width*4)) + (Math.floor(x)*4);
				
				 var red = pixels[pos];
				 var green = pixels[pos+1];
				 var blue = pixels[pos+2];
				 
				 context.fillStyle = "rgb("+ red+", "+green+", "+blue+")";
				 // context.fillRect(x-(titleWidth/2), y-(titleHeight/2), titleWidth, titleHeight);
				
					context.beginPath();
					context.arc(x,y,titleWidth/2,0,Math.PI*2,false);
					context.closePath();
					context.fill();
				}
			}
			
			// context.putImageData(imageData, 0, 0);
		});
	}
	resizeCanvas();
});